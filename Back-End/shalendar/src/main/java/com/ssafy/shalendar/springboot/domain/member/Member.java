package com.ssafy.shalendar.springboot.domain.member;

import com.ssafy.shalendar.springboot.web.dto.member.MemberUpdateRequestDto;
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
public class Member {
    @Column(nullable = false, columnDefinition = "varchar(45)")
    private String id;
    @Id  //해당 테이블의 PK 필드
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //PK의 생성 규칙
    private Long mem_no;
    @Column(nullable = false, columnDefinition = "varchar(200)")
    private String pw;
    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String name;
    private String birth;
    @Column(nullable = false, columnDefinition = "varchar(20)")
    private String nickname;

    private String img;
    @Column(nullable = false, columnDefinition = "datetime default now()")
    @CreatedDate
    private LocalDateTime rdate;
    @Column(columnDefinition = "datetime default now()")
    @LastModifiedDate
    private LocalDateTime wdate;
    @Column(columnDefinition = "varchar(200)")
    private String sns;
    @Column(columnDefinition = "varchar(200)")
    private String msg;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Builder
    public Member(Long mem_no, String id, String pw, String name, String birth, String nickname,
                  String img, LocalDateTime rdate, LocalDateTime wdate, String sns, String msg, Role role) {
        this.mem_no = mem_no;
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.birth = birth;
        this.nickname = nickname;
        this.img = img;
        this.rdate = rdate;
        this.wdate = wdate;
        this.sns = sns;
        this.msg = msg;
        this.role = role;
    }
    public void update(MemberUpdateRequestDto member) {
        this.pw = member.getPw();
        this.name = member.getName();
        this.birth = member.getBirth();
        this.nickname = member.getNickname();
        this.img = member.getImg();
        this.sns = member.getSns();
        this.msg = member.getMsg();
    }
    public Member updateGoogle(String name, String picture) {
        this.name = name;
        this.img = picture;
        return this;
    }
    public String getRoleKey() {
        return this.role.getKey();
    }
}