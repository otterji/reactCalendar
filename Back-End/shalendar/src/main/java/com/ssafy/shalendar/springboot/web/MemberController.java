package com.ssafy.shalendar.springboot.web;

import com.ssafy.shalendar.springboot.domain.member.Member;
import com.ssafy.shalendar.springboot.domain.member.Role;
import com.ssafy.shalendar.springboot.help.BoolResult;
import com.ssafy.shalendar.springboot.help.StringResult;
import com.ssafy.shalendar.springboot.service.member.MemberService;
import com.ssafy.shalendar.springboot.web.dto.member.MemberLoginRequestDto;
import com.ssafy.shalendar.springboot.web.dto.member.MemberResponseDto;
import com.ssafy.shalendar.springboot.web.dto.member.MemberSaveRequestDto;
import com.ssafy.shalendar.springboot.web.dto.member.MemberUpdateRequestDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/member")
@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin({"*"})
public class MemberController {
    //어느 컨트롤러에서나 @LoginUser 를 선언하면 세션 정보를 가져올 수 있다

    private final MemberService mService;

    @PostMapping("/uploadImage")
    public ResponseEntity<Object> uploadImage(@RequestBody MultipartFile file){
        List<HashMap> fileArrayList = new ArrayList<HashMap>();
        HashMap fileHashMap;

        String filePath = "C:/test"; //파일 저장 경로, 설정파일로 따로 관리한다.

        File dir = new File(filePath); //파일 저장 경로 확인, 없으면 만든다.
        if (!dir.exists()) {
            dir.mkdirs();
        }

        fileHashMap = new HashMap();
        String originalFilename = file.getOriginalFilename(); //파일명
        String fileFullPath = filePath + "/" + originalFilename; //파일 전체 경로
        try {
            //파일 저장
            file.transferTo(new File(fileFullPath)); //파일저장

            fileHashMap.put("originalFilename", originalFilename);
            fileHashMap.put("fileFullPath", fileFullPath);

            fileArrayList.add(fileHashMap);

        } catch (Exception e) {
            System.out.println("postTempFile_ERROR======>" + fileFullPath);
            e.printStackTrace();
        }
        StringResult nr = new StringResult("uploadImage", originalFilename, "SUCCESS");
        return new ResponseEntity<Object>(nr, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> addMember(@RequestBody MemberSaveRequestDto member) {
        System.out.println(member);
        try {
            MemberResponseDto searchedMember = mService.searchMember(member.getId());
            StringResult nr = null;
            if (searchedMember == null) {
                member.setRole(Role.USER);
                boolean result = mService.signup(member);
                if (result) {
                    nr = new StringResult("addMember", member.getId(), "SUCCESS");
                } else {
                    nr = new StringResult("addMember", "-1", "FAIL");
                }
            } else {
                nr = new StringResult("addMember", "Duplicate ID", "FAIL");
            }
            return new ResponseEntity<Object>(nr, HttpStatus.OK);
        } catch(RuntimeException e) {
            log.error("addMember", e);
            throw e;
        }
    }

    @GetMapping("/findMemberById/{id}")
    public ResponseEntity<Object> findMemberById(@PathVariable String id) {
        log.trace("findMemberById");
        try {
            MemberResponseDto member = mService.searchMember(id);
            System.out.println(member.getId() + " " + member.getBirth());
            return new ResponseEntity<Object>(member, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.error("findMemberById", e);
            throw e;
        }
    }

    @GetMapping("findAllMembers")
    public ResponseEntity<Object> findAllMembers() {
        log.trace("findAllMembers");
        try {
            List<Member> members = mService.searchAll();
            for (int i = 0; i < members.size(); i++) {
                System.out.println(members.get(i).getId() + " " + members.get(i).getBirth());
            }
            return new ResponseEntity<Object>(members, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.error("findAllMembers", e);
            throw e;    // spring, tomcat이 받음
        }
    }

    @PutMapping("/updateMember")
    @ApiOperation(value = "회원정보를 수정한다.", response = BoolResult.class)
    public ResponseEntity<Object> updateMember(@RequestBody MemberUpdateRequestDto member) {
        log.trace("updateBoard");
        try {
            boolean result = mService.update(member.getId(), member);
            BoolResult br = null;
            if (result) {
                br = new BoolResult(true, "updateMember", "SUCCESS");
            } else {
                br = new BoolResult(false, "updateMember", "FAIL");
            }
            return new ResponseEntity<Object>(br, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.error("updateMember", e);
            throw e;
        }
    }

    @DeleteMapping("/deleteMember/{id}")
    @ApiOperation(value = "회원정보를 삭제한다.", response = BoolResult.class)
    public ResponseEntity<Object> deleteMember(@PathVariable String id) {
        log.trace("deleteMember");
        try {
            boolean result = mService.delete(id);
            BoolResult br = null;
            if (result) {
                br = new BoolResult(true, "deleteMember", "SUCCESS");
            } else {
                br = new BoolResult(false, "deleteMember", "FAIL");
            }
            return new ResponseEntity<Object>(br, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.error("deleteMember", e);
            throw e;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody MemberLoginRequestDto member) {    //HTTP요청의 내용을 객체에 매핑하기 위해 @RequestBody 를 설정.
        System.out.println(member.getId() + " " + member.getPw());
        StringResult nr = null;
        try {
            String memberId = member.getId();
            MemberResponseDto findmem = mService.login(memberId);//UserID로 user가 존재하는지 확인.

            if (findmem != null) {
                if (findmem.getPw().equals(member.getPw())) {
                    nr = new StringResult("login", member.getId(), "SUCCESS");
                } else {
                    nr = new StringResult("login", "-1", "FAIL");
                }
            } else {
                throw new RuntimeException("아이디가 없습니다.");
            }

            return new ResponseEntity<Object>(nr, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.error("로그인 실패", e);
            return new ResponseEntity<Object>("아이디가 없습니다.", HttpStatus.OK);
//            throw e;
        }
    }
}
