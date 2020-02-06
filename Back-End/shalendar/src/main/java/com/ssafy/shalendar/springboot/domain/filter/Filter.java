package com.ssafy.shalendar.springboot.domain.filter;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Filter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long filterNo;

    @Column(length =30, nullable=false)
    private String filterName;
    @Column(length =200)
    private String filterContents;
    @Column(length =7, nullable=false)
    private String filterColor;

    @Builder
    public Filter(String filterName, String filterContents,String filterColor){
        this.filterName=filterName;
        this.filterContents=filterContents;
        this.filterColor=filterColor;
    }

    public void update(String filterName, String filterContents,String filterColor) {
        this.filterName=filterName;
        this.filterContents=filterContents;
        this.filterColor=filterColor;
    }
}
