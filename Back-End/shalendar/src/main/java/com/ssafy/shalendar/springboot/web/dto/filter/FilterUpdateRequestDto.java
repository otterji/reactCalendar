package com.ssafy.shalendar.springboot.web.dto.filter;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FilterUpdateRequestDto {
    private String filterName;
    private String filterContents;
    private String filterColor;

    @Builder
    public FilterUpdateRequestDto(String filterName,String filterContents,String filterColor){
        this.filterName=filterName;
        this.filterContents=filterContents;
        this.filterColor=filterColor;
    }
}
