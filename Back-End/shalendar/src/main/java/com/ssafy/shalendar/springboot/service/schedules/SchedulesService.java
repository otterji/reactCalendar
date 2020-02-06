package com.ssafy.shalendar.springboot.service.schedules;

import com.ssafy.shalendar.springboot.domain.schedules.SchedulesRepository;
import com.ssafy.shalendar.springboot.web.dto.schedules.SchedulesSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class SchedulesService {
    private final SchedulesRepository schedulesRepository;

    @Transactional
    public Long save(SchedulesSaveRequestDto requestDto){
        return schedulesRepository.save(requestDto.toEntity()).getSchNo();
    }


}
