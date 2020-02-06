package com.ssafy.shalendar.springboot.service.channel;

import com.ssafy.shalendar.springboot.domain.channel.Channel;
import com.ssafy.shalendar.springboot.domain.channel.ChannelRepositroy;

import com.ssafy.shalendar.springboot.web.dto.channel.ChannelResponseDto;
import com.ssafy.shalendar.springboot.web.dto.channel.ChannelSaveRequestDto;
import com.ssafy.shalendar.springboot.web.dto.channel.ChannelUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChannelService {

    private static Logger logger = LoggerFactory.getLogger(ChannelService.class);

    private final ChannelRepositroy channelRepository;

    @Transactional
    public Boolean signup(ChannelSaveRequestDto requestDto) {
        try {
            channelRepository.save(requestDto.toEntity()).getCh_no();
            return true;
        } catch (RuntimeException e){
            logger.error("추가 실패");
            e.printStackTrace();
            return false;
        }
    }

    public ChannelResponseDto searchChannel(String id){
        Channel result = null;
        try {
            result = channelRepository.findChannelById(id);
        } catch (RuntimeException e){
            logger.error("검색 실패", e);
        }
        if (result == null){
            return null;
        } else {
            return new ChannelResponseDto(result);
        }
    }

    public List<Channel> searchAll() {
        List<Channel> result = channelRepository.findAll();
        return result;
    }

    @Transactional
    public Boolean update(String id, ChannelUpdateRequestDto requestDto) {
        ChannelResponseDto channel = null;
        try {
            channel = new ChannelResponseDto(channelRepository.findChannelById(id));
            Channel channelEntity = channelRepository.findById(channel.getCh_no()).orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + id));;
            if (channel == null){
                throw new RuntimeException("해당 아이디가 없습니다.");
            }
            channelEntity.update(requestDto);
            return true;
        } catch (RuntimeException e){
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public Boolean delete (String id) {
        ChannelResponseDto channel = null;
        try {
            channel = new ChannelResponseDto(channelRepository.findChannelById(id));
            if (channel == null){
                throw new RuntimeException("해당 아이디가 없습니다.");
            }
            channelRepository.delete(channel.toEntity());
            return true;
        } catch (RuntimeException e){
            e.printStackTrace();
            return false;
        }
    }

    @Transactional(readOnly = true)
    public ChannelResponseDto login(String id) {
        Channel channel = channelRepository.findChannelById(id);
        System.out.println("여기냐"+ channel);
        return new ChannelResponseDto(channel);
    }
}
