package com.ssafy.shalendar.springboot.web.dto.schedules;

import com.ssafy.shalendar.springboot.domain.filter.Filter;
import com.ssafy.shalendar.springboot.domain.schedules.Schedules;
import lombok.Getter;

@Getter
public class SchedulesResponseDto {
    private String title;
    private String contents;
    private String sdate;
    private String edate;
    private String place;
    private Filter filter;

    public SchedulesResponseDto(Schedules entity){
        this.title=entity.getTitle();
        this.contents=entity.getContents();
        this.sdate=entity.getSdate();
        this.edate=entity.getEdate();
        this.place=entity.getPlace();
        this.filter=entity.getFilter();
    }
}
