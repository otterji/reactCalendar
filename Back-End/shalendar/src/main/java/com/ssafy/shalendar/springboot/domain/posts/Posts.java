package com.ssafy.shalendar.springboot.domain.posts;

import com.ssafy.shalendar.springboot.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

// Entity 클래스에서는 절대 Setter 메소드를 만들지 않는다.
// 해당 필드의 값 변경이 필요하면 명확히 그 목적과 의도를 나타낼 수 있는 메소드를 추가해야한다.
// 생성자 대신에 @Builder 를 통해 제공되는 빌더클래스가 대신
@Getter
@NoArgsConstructor
@Entity  //Jpa, 테이블과 링크될 클래스임을 나타넴 기본으로 카멜을 언더스코어 네이밍으로 매칭
public class Posts extends BaseTimeEntity {
    @Id  //해당 테이블의 PK 필드
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //PK의 생성 규칙
    private Long id;

    //테이블의 칼럼을 나타넴 성언안해도 해당 클래스의 필드는 모두 칼럼이됨
    //사용하는 이유는 기본값 외에 추가로 변경이 필요한 옵션이 있을때
    // length, nullable, unique 설정가능
    @Column(length = 500, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;

    @Builder //해당 클래스의 빌더 패턴 클래스 생성자 상단에 선언시 생성자에 포함된 필드만 빌더에 포함
    public Posts(String title, String content, String author){
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }

}
