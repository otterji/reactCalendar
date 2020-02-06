package com.ssafy.shalendar.springboot.web;

import com.ssafy.shalendar.springboot.service.schedules.SchedulesService;
import com.ssafy.shalendar.springboot.web.dto.schedules.SchedulesSaveRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController

@RequiredArgsConstructor
@Slf4j
@CrossOrigin({"*"})
public class SchedulesController {
    private SchedulesService schedulesService;

    @PostMapping("/api/v1/schedules")
    public Long save(@RequestBody SchedulesSaveRequestDto requestDto){
        return schedulesService.save(requestDto);
    }


}
