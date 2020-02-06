package com.ssafy.shalendar.springboot.domain.channel;

import com.ssafy.shalendar.springboot.domain.channel.Role;
import com.ssafy.shalendar.springboot.web.dto.channel.ChannelUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Entity
public class Channel {
    @Column(nullable = false, columnDefinition = "varchar(45)")
    private String id;
    @Id  //해당 테이블의 PK 필드
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //PK의 생성 규칙
    private Long ch_no;
    @Column(nullable = false, columnDefinition = "varchar(200)")
    private String pw;
    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String name;
    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String nickname;
    private String img;
    @Column(nullable = false, columnDefinition = "datetime default now()")
    @CreatedDate
    private LocalDateTime rdate;
    @Column(columnDefinition = "datetime")
    @LastModifiedDate
    private LocalDateTime wdate;
    @Column(columnDefinition = "varchar(200)")
    private String sns;
    @Column(columnDefinition = "varchar(200)")
    private String msg;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Builder
    public Channel(Long ch_no, String id, String pw, String name, String nickname,
                   String img, LocalDateTime rdate, LocalDateTime wdate, String sns, String msg, Role role) {
        this.ch_no = ch_no;
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.nickname = nickname;
        this.img = img;
        this.rdate = rdate;
        this.wdate = wdate;
        this.sns = sns;
        this.msg = msg;
        this.role = role;
    }
    public void update(ChannelUpdateRequestDto channel) {
        this.pw = channel.getPw();
        this.name = channel.getName();
        this.nickname = channel.getNickname();
        this.img = channel.getImg();
        this.sns = channel.getSns();
        this.msg = channel.getMsg();
    }
    public Channel updateGoogle(String name, String picture) {
        this.name = name;
        this.img = picture;
        return this;
    }
    public String getRoleKey() {
        return this.role.getKey();
    }
}