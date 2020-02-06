package com.ssafy.shalendar.springboot.domain.member;
import com.ssafy.shalendar.springboot.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
public interface MemberRepositroy extends JpaRepository<Member, Long> {
    Member findMemberById(@Param("id") String id);
    @Modifying  // update, delete Query 시 @Modifying 어노테이션 추가
    @Query(value = "UPDATE Member m SET m.pw = :#{#member.pw}, m.birth = :#{#member.birth}, m.nickname = :#{#member.nickname}, m.img = :#{#member.img}, m.sns = :#{#member.sns}, m.msg = :#{#member.msg} WHERE m.id = :#{#member.id}", nativeQuery = false)
    Boolean update(@Param("member") Member member);
    @Query(value = "SELECT m FROM Member m WHERE m.id =:id", nativeQuery = false)
    Optional<Member> findByEmail(String id);
}