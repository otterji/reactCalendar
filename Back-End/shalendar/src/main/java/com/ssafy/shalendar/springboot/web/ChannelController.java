package com.ssafy.shalendar.springboot.web;

import com.ssafy.shalendar.springboot.domain.channel.Channel;
import com.ssafy.shalendar.springboot.domain.channel.Role;
import com.ssafy.shalendar.springboot.help.BoolResult;
import com.ssafy.shalendar.springboot.help.StringResult;
import com.ssafy.shalendar.springboot.service.channel.ChannelService;
import com.ssafy.shalendar.springboot.web.dto.channel.ChannelLoginRequestDto;
import com.ssafy.shalendar.springboot.web.dto.channel.ChannelResponseDto;
import com.ssafy.shalendar.springboot.web.dto.channel.ChannelSaveRequestDto;
import com.ssafy.shalendar.springboot.web.dto.channel.ChannelUpdateRequestDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/channel")
@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin({"*"})
public class ChannelController {

    private final ChannelService cService;

    @PostMapping("/signup")
    public ResponseEntity<Object> addChannel(@RequestBody ChannelSaveRequestDto channel) {
        System.out.println(channel);
        try {
            ChannelResponseDto searchedChaennel = cService.searchChannel(channel.getId());
            StringResult nr = null;
            if (searchedChaennel == null) {
                channel.setRole(Role.USER);
                boolean result = cService.signup(channel);
                if (result) {
                    nr = new StringResult("addChannel", channel.getId(), "SUCCESS");
                } else {
                    nr = new StringResult("addChannel", "-1", "FAIL");
                }
            } else {
                nr = new StringResult("addChannel", "Duplicate ID", "FAIL");
            }
            return new ResponseEntity<Object>(nr, HttpStatus.OK);
        } catch(RuntimeException e) {
            log.error("addChannel", e);
            throw e;
        }
    }

    @GetMapping("/findChannelById/{id}")
    public ResponseEntity<Object> findChannelById(@PathVariable String id) {
        log.trace("findChannelById");
        try {
            ChannelResponseDto channel = cService.searchChannel(id);
            System.out.println(channel.getId() + " " + channel.getNickname());
            return new ResponseEntity<Object>(channel, HttpStatus.OK);
        } catch(RuntimeException e) {
            log.error("findChannelById", e);
            throw e;
        }
    }

    @GetMapping("findAllChannels")
    public ResponseEntity<Object> findAllChannels() {
        log.trace("findAllChannels");
        try {
            List<Channel> channels = cService.searchAll();
            for (int i = 0; i < channels.size(); i++){
                System.out.println(channels.get(i).getId() + " " + channels.get(i).getNickname());
            }
            return new ResponseEntity<Object>(channels, HttpStatus.OK);
        } catch(RuntimeException e) {
            log.error("findAllChannels", e);
            throw e;	// spring, tomcat이 받음
        }
    }

    @PutMapping("/updateChannels")
    @ApiOperation(value="채널정보를 수정한다.", response= BoolResult.class)
    public ResponseEntity<Object> updateChannel(@RequestBody ChannelUpdateRequestDto channel){
        try {
            boolean result = cService.update(channel.getId(), channel);
            BoolResult br = null;
            if (result) {
                br = new BoolResult(true, "updateChannel", "SUCCESS");
            } else {
                br = new BoolResult(false, "updateChannel", "FAIL");
            }
            return new ResponseEntity<Object>(br, HttpStatus.OK);
        } catch(RuntimeException e) {
            log.error("updateChannel", e);
            throw e;
        }
    }

    @DeleteMapping("/deleteChannel/{id}")
    @ApiOperation(value="채널정보를 삭제한다.", response=BoolResult.class)
    public ResponseEntity<Object> deleteChannel(@PathVariable String id){
        log.trace("deleteChannel");
        try {
            boolean result = cService.delete(id);
            BoolResult br = null;
            if (result) {
                br = new BoolResult(true, "deleteChannel", "SUCCESS");
            } else {
                br = new BoolResult(false, "deleteChannel", "FAIL");
            }
            return new ResponseEntity<Object>(br, HttpStatus.OK);
        } catch(RuntimeException e) {
            log.error("deleteChannel", e);
            throw e;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody ChannelLoginRequestDto channel) {    //HTTP요청의 내용을 객체에 매핑하기 위해 @RequestBody 를 설정.
        System.out.println(channel.getId() + " " + channel.getPw());
        StringResult nr = null;
        try {
            String channelId = channel.getId();
            ChannelResponseDto searchedchannel = cService.login(channelId);//UserID로 user가 존재하는지 확인.

            if (searchedchannel != null) {
                if (searchedchannel.getPw().equals(channel.getPw())) {
                    nr = new StringResult("login", channel.getId(), "SUCCESS");
                } else {
                    nr = new StringResult("login", "-1", "FAIL");
                }
            } else {
                throw new RuntimeException("아이디가 없습니다.");
            }

            return new ResponseEntity<Object>(nr, HttpStatus.OK);
        } catch (RuntimeException e){
            log.error("로그인 실패", e);
            return new ResponseEntity<Object>("아이디가 없습니다.", HttpStatus.OK);
        }
    }
}
