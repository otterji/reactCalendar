package com.ssafy.shalendar.springboot.web.dto.filter;

import com.ssafy.shalendar.springboot.domain.filter.Filter;
import lombok.Getter;

@Getter
public class FilterResponseDto {
    private Long filterNo;
    private String filterName;
    private String filterContents;
    private String filterColor;

    public FilterResponseDto(Filter entity){
        this.filterNo=entity.getFilterNo();
        this.filterName=entity.getFilterName();
        this.filterContents=entity.getFilterContents();
        this.filterColor=entity.getFilterColor();
    }
}
