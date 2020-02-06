package com.ssafy.shalendar.springboot.domain.schedules;

import com.ssafy.shalendar.springboot.domain.filter.Filter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchedulesRepository extends JpaRepository<Schedules,Long> {
}
