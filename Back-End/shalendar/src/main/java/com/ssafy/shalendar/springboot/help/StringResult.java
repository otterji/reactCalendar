package com.ssafy.shalendar.springboot.help;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StringResult {
    // 이름
    private String name;
    // 전달할 문자열값
    private String id;
    // 상태
    private String state;
}
