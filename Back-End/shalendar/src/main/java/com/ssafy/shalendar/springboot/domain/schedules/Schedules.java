package com.ssafy.shalendar.springboot.domain.schedules;

import com.ssafy.shalendar.springboot.domain.filter.Filter;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Schedules {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schNo;

    @Column(length =30, nullable=false)
    private String title;
    @Column(length =200)
    private String contents;
    @Column(nullable=false)
    private String sdate;
    @Column(nullable=false)
    private String edate;
    @Column(length =50)
    private String place;

    @ManyToOne
    @JoinColumn
    private Filter filter;

    @Builder
    public Schedules(String title, String contents, String sdate, String edate, String place, Long filterNo){
        this.title=title;
        this.contents=contents;
        this.sdate=sdate;
        this.edate=edate;
        this.place=place;
    }


    public void update(String title, String contents, String sdate, String edate, String place, Long filterNo){
        this.title=title;
        this.contents=contents;
        this.sdate=sdate;
        this.edate=edate;
        this.place=place;
    }
}
