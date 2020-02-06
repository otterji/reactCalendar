package com.ssafy.shalendar.springboot.web.dto.schedules;

import com.ssafy.shalendar.springboot.domain.filter.Filter;
import com.ssafy.shalendar.springboot.domain.schedules.Schedules;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SchedulesSaveRequestDto {

    private String title;
    private String contents;
    private String sdate;
    private String edate;
    private String place;
    private Filter filter;

    //필터가 추가되지 않은 빌더
    @Builder
    public SchedulesSaveRequestDto(String title, String contents, String sdate, String edate, String place){
        this.title=title;
        this.contents=contents;
        this.sdate=sdate;
        this.edate=edate;
        this.place=place;
    }
    //필터가 추가된 빌더
    @Builder
    public SchedulesSaveRequestDto(String title, String contents, String sdate, String edate, String place, Filter filter){
        this.title=title;
        this.contents=contents;
        this.sdate=sdate;
        this.edate=edate;
        this.place=place;
        this.filter=filter;
    }
    public Schedules toEntity(){
        return Schedules.builder().title(title).contents(contents).sdate(sdate).edate(edate).place(place).build();
    }


}
