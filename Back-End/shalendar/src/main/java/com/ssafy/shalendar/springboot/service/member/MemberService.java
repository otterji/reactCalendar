package com.ssafy.shalendar.springboot.service.member;

import com.ssafy.shalendar.springboot.domain.member.Member;
import com.ssafy.shalendar.springboot.domain.member.MemberRepositroy;

import com.ssafy.shalendar.springboot.web.dto.member.MemberResponseDto;
import com.ssafy.shalendar.springboot.web.dto.member.MemberSaveRequestDto;
import com.ssafy.shalendar.springboot.web.dto.member.MemberUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberService {

    private static Logger logger = LoggerFactory.getLogger(MemberService.class);

    private final MemberRepositroy memberRepository;

    @Transactional
    public Boolean signup(MemberSaveRequestDto requestDto) {
        try {
            memberRepository.save(requestDto.toEntity()).getMem_no();
            return true;
        } catch (RuntimeException e){
            e.printStackTrace();
            return false;
        }
    }

    public MemberResponseDto searchMember(String id){
        Member result = null;
        try {
            result = memberRepository.findMemberById(id);
        } catch (RuntimeException e){
            logger.error("추가 실패", e);
        }
        if (result == null){
            return null;
        } else {
            return new MemberResponseDto(result);
        }
    }

    public List<Member> searchAll() {
        List<Member> result = memberRepository.findAll();
        return result;
    }

    @Transactional
    public Boolean update(String id, MemberUpdateRequestDto requestDto) {
        MemberResponseDto member = null;
        try {
            member = new MemberResponseDto(memberRepository.findMemberById(id));
            Member memberEntity = memberRepository.findById(member.getMem_no()).orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + id));;
            if (member == null){
                throw new RuntimeException("해당 아이디가 없습니다.");
            }
            memberEntity.update(requestDto);
            return true;
        } catch (RuntimeException e){
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public Boolean delete (String id) {
        MemberResponseDto member = null;
        try {
            member = new MemberResponseDto(memberRepository.findMemberById(id));
            if (member == null){
                throw new RuntimeException("해당 아이디가 없습니다.");
            }
            memberRepository.delete(member.toEntity());
            return true;
        } catch (RuntimeException e){
            e.printStackTrace();
            return false;
        }
    }

    @Transactional(readOnly = true)
    public MemberResponseDto login(String id) {
        Member member = memberRepository.findMemberById(id);
        System.out.println("여기냐"+ member);
        return new MemberResponseDto(member);
    }

//    @Transactional(readOnly = true)
//    public PostsResponseDto findById(Long id) {
//        Posts entity = postsRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + id));
//        return new PostsResponseDto(entity);
//    }
//
//    @Transactional(readOnly = true)
//    public List<PostsListResponseDto> findAllDesc() {
//        return postsRepository.findAllDesc().stream()
//                .map(PostsListResponseDto::new)  //.map(posts -> new PostsListResponseDto(posts)) 와 같은 람다식
//                .collect(Collectors.toList());
//    }
}
