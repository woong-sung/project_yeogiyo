package codestates.main007.member;

import codestates.main007.board.Board;
import codestates.main007.comments.Comment;
import codestates.main007.dto.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    private final MemberMapper memberMapper;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public void postMember(@RequestBody MemberDto.Signup signupDto) {
        Member member = memberMapper.signupDtoToMember(signupDto);

        memberService.save(member);
    }

    @GetMapping("/verification")
    @ResponseStatus(HttpStatus.OK)
    public void checkPassword(@RequestHeader(name = "Authorization") String accessToken,
                              @RequestHeader(name = "Password") String password) {
        memberService.verifyPassword(accessToken, password);
    }

    @PostMapping("/find-password")
    @ResponseStatus(HttpStatus.OK)
    public void findPassword(@RequestBody MemberDto.Email email) {
        memberService.sendPassword(email.getEmail());
    }

    @GetMapping("/my-page")
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto getMyPage(@RequestHeader(name = "Authorization") String accessToken) {
        List<Board> boards = memberService.findMyPage(accessToken);
        List<MemberDto.MyPage> myPages = memberMapper.boardsToMyPages(boards);

        return new MultiResponseDto<>(myPages);
    }

    @GetMapping("/my-page/{station-id}")
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto getMyPageByStation(@RequestHeader(name = "Authorization") String accessToken,
                                   @PathVariable("station-id") long stationId) {
        List<Board> boards = memberService.findMyPageByStation(accessToken, stationId);
        List<MemberDto.MyPage> myPages = memberMapper.boardsToMyPages(boards);

        return new MultiResponseDto<>(myPages);
    }

    @GetMapping("/my-page/comments")
    @ResponseStatus(HttpStatus.OK)
    public MultiResponseDto getMyComments(@RequestHeader(name = "Authorization") String accessToken) {
        List<Comment> comments = memberService.findMyComments(accessToken);
        List<MemberDto.MyComment> myComments = memberMapper.commentsToMyComments(comments);

        return new MultiResponseDto<>(myComments);
    }

    @GetMapping("/my-page/map")
    @ResponseStatus(HttpStatus.OK)
    public void getMyMap(@RequestHeader(name = "Authorization") String accessToken) {
        // todo: 병합 후 보드 서비스에서 가져오기
    }

    @GetMapping("/info")
    @ResponseStatus(HttpStatus.OK)
    public void getMyInfo(@RequestHeader(name = "Authorization") String accessToken) {
        // todo: 병합 후 보드 서비스에서 가져오기
    }

    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public void patchMyInfo(@RequestHeader(name = "Authorization") String accessToken,
                            @RequestBody MemberDto.Patch patchDto) {
        memberService.update(accessToken, patchDto);
    }

}
