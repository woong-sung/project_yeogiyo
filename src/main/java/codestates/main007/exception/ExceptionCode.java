package codestates.main007.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_RESIGNED(422, "Member resigned"),
    BOARD_NOT_FOUND(404, "Board not found"),
    MEMBER_UNAUTHORIZED(403, "Member unauthorized"),
    COMMENT_NOT_FOUND(404,"Comment not found"),
    PLANNER_EXISTS(409,"Planner exists"),
    BOARDPLANNER_EXISTS(409,"Boardplanner exists"),
    EXPIRED_TOKEN(401,"Expired Token"),
    PLANNER_SATURATED(409, "Planner is full")
    ;
    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
    }
}
