package codestates.main007.board;

import codestates.main007.boardImage.BoardImage;
import codestates.main007.boardImage.BoardImageRepository;
import codestates.main007.boardImage.ImageHandler;
import codestates.main007.boardMember.BoardMember;
import codestates.main007.boardMember.BoardMemberService;
import codestates.main007.member.Member;
import codestates.main007.member.MemberService;
import codestates.main007.service.DistanceMeasuringService;
import codestates.main007.station.Station;
import codestates.main007.tag.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardImageRepository boardImageRepository;
    private final MemberService memberService;
    private final DistanceMeasuringService distanceService;
    private final BoardMemberService boardMemberService;

    private final TagService tagService;
    private final ImageHandler imageHandler;

    public void save(String accessToken, BoardDto.Input boardDto, List<MultipartFile> images, List<Long> tagIds) throws IOException {
        Station station = new Station(boardDto.getStationId().intValue());
        double startLat = station.getLatitude();
        double startLong = station.getLongitude();
        double endLat = boardDto.getLatitude();
        double endLong = boardDto.getLongitude();

        Board board = Board.builder()
                .title(boardDto.getTitle())
                .review(boardDto.getReview())
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .categoryId(boardDto.getCategoryId())
                .stationId(boardDto.getStationId())
                .latitude(boardDto.getLatitude())
                .longitude(boardDto.getLongitude())
                .star(boardDto.getStar())
                .upScore(0)
                .downScore(0)
                .viewCount(0)
                .address(boardDto.getAddress())
                .writer(memberService.findByAccessToken(accessToken))
                .timeFromStation(distanceService.getTime(startLat, startLong, endLat, endLong))
                .build();

        // 태그 저장
        board.setTags(tagService.save(tagIds, board));

        // image 핸들러에서 boardId 를 사용하기위해 한 번 저장
        boardRepository.save(board);

        List<BoardImage> list = imageHandler.parseImageInfo(board, images);
        if (!list.isEmpty()) {
            board.setThumbnail();
        }

        // 섬네일을 게시글에 저장한 후 다시 저장
        boardRepository.save(board);

        List<BoardImage> boardImages = new ArrayList<>();
        for (BoardImage tempImage : list) {
            boardImages.add(boardImageRepository.save(tempImage));
        }
        board.setImages(boardImages);

    }

    public void update(String accessToken, long boardId, BoardDto.Input patch) {
        Board updatedBoard = find(boardId);

        updatedBoard.patchBoard(patch.getTitle(),
                patch.getReview(),
                patch.getStar(),
                patch.getLatitude(),
                patch.getLongitude(),
                patch.getStationId(),
                patch.getCategoryId(),
                patch.getAddress());

        if (patch.getLatitude() != null || patch.getLongitude() != null) {
            Station station = new Station((int) updatedBoard.getStationId());
            double startLat = station.getLatitude();
            double startLong = station.getLongitude();
            double endLat = updatedBoard.getLatitude();
            double endLong = updatedBoard.getLongitude();

            updatedBoard.updateTimeFromStation(distanceService.getTime(startLat, startLong, endLat, endLong));
        }

        boardRepository.save(updatedBoard);
    }

    public void delete(String accessToken, long boardId) {
        Member writer = find(boardId).getWriter();
        Member member = memberService.findByAccessToken(accessToken);

        boardRepository.deleteById(boardId);
    }

    public Board find(long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new NullPointerException("해당 게시글이 존재하지 않습니다."));
    }

    public Page<Board> findBoardPage(long stationId, long categoryId, int page, int size, Sort sort) {
        return boardRepository.findByStationIdAndCategoryId(stationId, categoryId,
                PageRequest.of(page, size, sort));
    }

    public Page<Board> findBoardPageByTag(long stationId, long categoryId, int page, int size, Sort sort, long tagId) {
        return boardRepository.findByStationIdAndCategoryIdAndTags(stationId, categoryId, tagService.find(tagId),
                PageRequest.of(page, size, sort));
    }

    public boolean checkDibs(String accessToken, long boardId) {
        Member member = memberService.findByAccessToken(accessToken);

        return boardMemberService.checkDibs(member, find(boardId));
    }

    public List<BoardDto.boardsResponse> listCheckDibs(String accessToken, List<BoardDto.boardsResponse> responses) {
        Member member = memberService.findByAccessToken(accessToken);

        List<BoardDto.boardsResponse> result = new ArrayList<>();
        for (BoardDto.boardsResponse dto : responses) {
            Board board = find(dto.getBoardId());
            dto.setDibs(boardMemberService.checkDibs(member, board));
            result.add(dto);
        }

        return result;
    }

    public Integer checkScoreStatus(Member member, Board board) {
        BoardMember boardMember = boardMemberService.getBoardMember(member, board);
        return boardMember.getScoreStatus();
    }

    public boolean dibs(String accessToken, long boardId) {
        Member member = memberService.findByAccessToken(accessToken);
        Board board = find(boardId);

        return boardMemberService.changeDibs(member, board);
    }

    public Integer upVote(String accessToken, long boardId) {
        Board board = find(boardId);
        Member member = memberService.findByAccessToken(accessToken);

        return boardMemberService.upVote(member, board);
    }

    public Integer downVote(String accessToken, long boardId) {
        Board board = find(boardId);
        Member member = memberService.findByAccessToken(accessToken);

        return boardMemberService.downVote(member, board);
    }

    public List<String> findImageUrls(Board board) {
        List<String> imageUrls = new ArrayList<>();
        List<BoardImage> boardImages = boardImageRepository.findAllByBoard(board);
        for (BoardImage boardImage : boardImages) {
            // todo: 나중에 s3로 바꾸기
            imageUrls.add(boardImage.getStored_file_path());
        }

        return imageUrls;
    }
}
