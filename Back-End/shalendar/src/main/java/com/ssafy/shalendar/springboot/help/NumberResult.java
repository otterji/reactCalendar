package com.ssafy.shalendar.springboot.help;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NumberResult {
    // 이름
    private String name;
    // 전달할 숫자값
    private int count;
    // 상태
    private String state;
}
