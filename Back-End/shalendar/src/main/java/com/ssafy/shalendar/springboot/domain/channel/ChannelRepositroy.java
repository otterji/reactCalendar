package com.ssafy.shalendar.springboot.domain.channel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChannelRepositroy extends JpaRepository<Channel, Long> {
    Channel findChannelById(String id);
    @Modifying  // update, delete Query 시 @Modifying 어노테이션 추가
    @Query(value = "UPDATE Channel m SET m.pw = :#{#channel.pw}, m.nickname = :#{#channel.nickname}, m.img = :#{#channel.img}, m.sns = :#{#channel.sns}, m.msg = :#{#channel.msg} WHERE m.id = :#{#channel.id}", nativeQuery = false)
    Boolean update(@Param("channel") Channel channel);
}