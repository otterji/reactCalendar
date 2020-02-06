package com.ssafy.shalendar.springboot.web;


import com.ssafy.shalendar.springboot.service.filter.FilterService;
import com.ssafy.shalendar.springboot.web.dto.filter.FilterResponseDto;
import com.ssafy.shalendar.springboot.web.dto.filter.FilterSaveRequestDto;
import com.ssafy.shalendar.springboot.web.dto.filter.FilterUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin({"*"})
public class FilterController {
    private final FilterService filterService;

    @PostMapping("/api/v1/filter")
    public Long save(@RequestBody FilterSaveRequestDto requestDto){
        return filterService.save(requestDto);
    }

    @PutMapping("/api/v1/filter/{filterNo}")
    public Long update(@PathVariable Long filterNo, @RequestBody FilterUpdateRequestDto requestDto){
        return filterService.update(filterNo, requestDto);
    }

    @GetMapping("/api/v1/filter/{filterNo}")
    public FilterResponseDto findByfilterNo(@PathVariable Long filterNo){
        return filterService.findByfilterNo(filterNo);
    }
    @DeleteMapping("/api/v1/filter/{filterNo}")
    public Long delete(@PathVariable Long filterNo) {
        filterService.delete(filterNo);
        return filterNo;
    }
}
