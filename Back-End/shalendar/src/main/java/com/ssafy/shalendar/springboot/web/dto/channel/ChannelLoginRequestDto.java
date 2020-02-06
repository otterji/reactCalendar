package com.ssafy.shalendar.springboot.web.dto.channel;


import com.ssafy.shalendar.springboot.domain.channel.Channel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChannelLoginRequestDto {
    private String id;
    private String pw;

    public ChannelLoginRequestDto(Channel entity) {
        this.id = entity.getId();
        this.pw = entity.getPw();
    }

    @Override
    public String toString() {
        return "MemberLoginRequestDto{" +
                "id='" + id + '\'' +
                ", pw='" + pw + '\'' +
                '}';
    }
}
