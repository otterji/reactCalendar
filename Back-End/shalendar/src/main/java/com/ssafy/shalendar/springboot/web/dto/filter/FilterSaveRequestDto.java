package com.ssafy.shalendar.springboot.web.dto.filter;

import com.ssafy.shalendar.springboot.domain.filter.Filter;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FilterSaveRequestDto {
    private String filterName;
    private String filterContents;
    private String filterColor;

    @Builder
    public FilterSaveRequestDto(String filterName,String filterContents,String filterColor){
        this.filterName=filterName;
        this.filterContents=filterContents;
        this.filterColor=filterColor;
    }

    public Filter toEntity(){
        return Filter.builder().filterName(filterName).filterContents(filterContents).filterColor(filterColor).build();
    }
}
