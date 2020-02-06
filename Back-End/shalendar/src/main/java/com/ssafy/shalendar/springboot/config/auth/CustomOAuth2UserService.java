package com.ssafy.shalendar.springboot.config.auth;
import com.ssafy.shalendar.springboot.config.auth.dto.OAuthAttributes;
import com.ssafy.shalendar.springboot.config.auth.dto.SessionUser;
import com.ssafy.shalendar.springboot.domain.member.Member;
import com.ssafy.shalendar.springboot.domain.member.MemberRepositroy;
import com.ssafy.shalendar.springboot.domain.user.User;
import com.ssafy.shalendar.springboot.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpSession;
import java.util.Collections;
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepositroy memberRepository;
    private final HttpSession httpSession;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);
        // 현재 로그인 진행 중인 서비스를 구분하는 코드(구글, 네이버 등)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        // Oauth2 로그인 진행 시 키가 되는 필드값, Primary Key와 같은 의미
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();
        // Oauth2User의 attribute를 담을 클래스
        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        Member member = saveOrUpdate(attributes);
        // 세션에 사용자 정보를 저장하기 위한 Dto
        httpSession.setAttribute("user", new SessionUser(member));
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRoleKey())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
    }
    private Member saveOrUpdate(OAuthAttributes attributes) {
        Member member = memberRepository.findByEmail(attributes.getEmail()).map(entity -> entity.updateGoogle(attributes.getName(), attributes.getPicture()))
                .orElse(attributes.toEntity());
        return memberRepository.save(member);
    }
}