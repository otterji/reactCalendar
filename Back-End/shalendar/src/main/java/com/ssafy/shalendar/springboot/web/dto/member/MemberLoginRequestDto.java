package com.ssafy.shalendar.springboot.web.dto.member;


import com.ssafy.shalendar.springboot.domain.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberLoginRequestDto {
    private String id;
    private String pw;

    public MemberLoginRequestDto(Member entity) {
        this.id = entity.getId();
        this.pw = entity.getPw();
    }

    @Override
    public String toString() {
        return "MemberLoginRequestDto{" +
                "id='" + id + '\'' +
                ", pw='" + pw + '\'' +
                '}';
    }
}
