package com.ssafy.shalendar.springboot.web.dto.channel;

import com.ssafy.shalendar.springboot.domain.channel.Channel;
import com.ssafy.shalendar.springboot.domain.channel.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ChannelResponseDto {
    private Long ch_no;
    private String id;
    private String pw;
    private String name;
    private String nickname;
    private String img;
    private LocalDateTime rdate;
    private LocalDateTime wdate;
    private String sns;
    private String msg;
    private Role role;

    public ChannelResponseDto(Channel entity) {
        this.ch_no = entity.getCh_no();
        this.id = entity.getId();
        this.pw = entity.getPw();
        this.name = entity.getName();
        this.nickname = entity.getNickname();
        this.img = entity.getImg();
        this.rdate = entity.getRdate();
        this.wdate = entity.getWdate();
        this.sns = entity.getSns();
        this.msg = entity.getMsg();
        this.role = entity.getRole();
    }

    public Channel toEntity() {
        return Channel.builder().ch_no(ch_no).id(id).pw(pw).name(name).nickname(nickname).img(img).rdate(rdate).wdate(wdate).sns(sns).msg(msg).role(role).build();
    }

    @Override
    public String toString() {
        return "ChannelResponseDto{" +
                "ch_no=" + ch_no +
                ", id='" + id + '\'' +
                ", pw='" + pw + '\'' +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", img='" + img + '\'' +
                ", rdate='" + rdate + '\'' +
                ", wdate='" + wdate + '\'' +
                ", sns='" + sns + '\'' +
                ", msg='" + msg + '\'' +
                '}';
    }
}
