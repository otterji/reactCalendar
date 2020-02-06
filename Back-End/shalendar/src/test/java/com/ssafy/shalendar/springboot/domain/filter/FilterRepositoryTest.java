package com.ssafy.shalendar.springboot.domain.filter;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FilterRepositoryTest {
    @Autowired
    FilterRepository filterRepository;

    @After
    public void cleanup(){
        filterRepository.deleteAll();
    }

    @Test
    public void 필터저장_불러오기(){
        String filterName = "1번필터";
        String filterContents = "1번 필터입니다.";
        String filterColor= "#18392E";

        filterRepository.save(Filter.builder().filterName(filterName).filterContents(filterContents).filterColor(filterColor).build());

        //when
        List<Filter> filterList = filterRepository.findAll();

        //then
        Filter filter = filterList.get(0);
        assertThat(filter.getFilterName()).isEqualTo(filterName);
        assertThat(filter.getFilterContents()).isEqualTo(filterContents);
        assertThat(filter.getFilterColor()).isEqualTo(filterColor);
    }


}
