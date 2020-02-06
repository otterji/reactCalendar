package com.ssafy.shalendar.springboot.config.auth.dto;
import com.ssafy.shalendar.springboot.domain.member.Member;
import lombok.Getter;
import java.io.Serializable;
@Getter
public class SessionUser implements Serializable {
    private String name;
    private String email;
    private String picture;
    public SessionUser(Member member) {
        this.name = member.getName();
        this.email = member.getId();
        this.picture = member.getImg();
    }
}