package com.poc.InventoryManagement.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poc.InventoryManagement.dto.BaseTimeStamp;
import com.poc.InventoryManagement.dto.ResponseWithMessage;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestControllerAdvice
@AllArgsConstructor
public class ErrorHandler extends ResponseEntityExceptionHandler implements AuthenticationEntryPoint, AccessDeniedHandler {

    private final ObjectMapper json;

    @ExceptionHandler(InvalidInputException.class)
    public ErrorMessage  handleInvalidRequest(InvalidInputException ex) {
       return new ErrorMessage(ex.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ResponseWithMessage<BaseTimeStamp>>  handleLinkExpiredException(BadRequestException ex) {
        return new ResponseEntity<>( new ResponseWithMessage<>(ex.getMessage(), new BaseTimeStamp()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ResponseWithMessage<BaseTimeStamp>>  handleNotFoundExceptionException(BadRequestException ex) {
        return new ResponseEntity<>( new ResponseWithMessage<>(ex.getMessage(), new BaseTimeStamp()),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ResponseWithMessage<BaseTimeStamp>>  handleUnAuthorizedExceptionException(BadRequestException ex) {
        return new ResponseEntity<>( new ResponseWithMessage<>(ex.getMessage(), new BaseTimeStamp()),HttpStatus.UNAUTHORIZED);
    }
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        var status = HttpStatus.UNAUTHORIZED;
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getOutputStream()
                .println(json.writeValueAsString(ErrorDto.getInstance(status, authException)));
    }

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        var status = HttpStatus.FORBIDDEN;
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getOutputStream()
                .println(json.writeValueAsString(ErrorDto.getInstance(status, accessDeniedException)));
    }
    private record ErrorDto(String message, HttpStatus status, int value, String name) {
        private static ErrorDto getInstance(HttpStatus status, Throwable throwable) {
            return new ErrorDto(throwable.getMessage(), status, status.value(), throwable.getClass().getName());
        }
    }
}
