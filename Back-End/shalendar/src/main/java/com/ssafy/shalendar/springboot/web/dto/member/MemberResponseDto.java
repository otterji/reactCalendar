package com.ssafy.shalendar.springboot.web.dto.member;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.shalendar.springboot.domain.member.Member;
import com.ssafy.shalendar.springboot.domain.posts.Posts;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MemberResponseDto {
    private Long mem_no;
    private String id;
    private String pw;
    private String birth;
    private String nickname;
    private String img;
    private LocalDateTime rdate;
    private LocalDateTime wdate;
    private String sns;
    private String msg;

    public MemberResponseDto(Member entity) {
        this.mem_no = entity.getMem_no();
        this.id = entity.getId();
        this.pw = entity.getPw();
        this.birth = entity.getBirth();
        this.nickname = entity.getNickname();
        this.img = entity.getImg();
        this.rdate = entity.getRdate();
        this.wdate = entity.getWdate();
        this.sns = entity.getSns();
        this.msg = entity.getMsg();
    }

    public Member toEntity() {
        return Member.builder().mem_no(mem_no).id(id).pw(pw).birth(birth).nickname(nickname).img(img).rdate(rdate).wdate(wdate).sns(sns).msg(msg).build();
    }

    @Override
    public String toString() {
        return "MemberResponseDto{" +
                "mem_no=" + mem_no +
                ", id='" + id + '\'' +
                ", pw='" + pw + '\'' +
                ", birth='" + birth + '\'' +
                ", nickname='" + nickname + '\'' +
                ", img='" + img + '\'' +
                ", rdate='" + rdate + '\'' +
                ", wdate='" + wdate + '\'' +
                ", sns='" + sns + '\'' +
                ", msg='" + msg + '\'' +
                '}';
    }
}
