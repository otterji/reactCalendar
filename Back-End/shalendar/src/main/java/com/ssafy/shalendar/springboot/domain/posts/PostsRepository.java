package com.ssafy.shalendar.springboot.domain.posts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

// 다음을 상속하면 기본적인 CRUD 메소드가 자동을 생성된다.
// entity 클래스와 기본 Entity Repository는 함께 위치 해야한다.(주의)
// JpaReopsitory<Entity, 기본키타입>
public interface PostsRepository extends JpaRepository<Posts, Long> {

    //SpringDataJpa 에서 제공하지 않는 메소드는 아래처럼 쿼리로 작성 해도 됨
    @Query("SELECT p FROM Posts p ORDER BY  p.id DESC")
    List<Posts> findAllDesc();
}
