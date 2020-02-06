package com.ssafy.shalendar.springboot.service.filter;

import com.ssafy.shalendar.springboot.domain.filter.Filter;
import com.ssafy.shalendar.springboot.domain.filter.FilterRepository;
import com.ssafy.shalendar.springboot.web.dto.filter.FilterResponseDto;
import com.ssafy.shalendar.springboot.web.dto.filter.FilterSaveRequestDto;
import com.ssafy.shalendar.springboot.web.dto.filter.FilterUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class FilterService {
    private final FilterRepository filterRepository;

    @Transactional
    public Long save(FilterSaveRequestDto requestDto){
        return filterRepository.save(requestDto.toEntity()).getFilterNo();
    }

    @Transactional
    public Long update(Long filterNo, FilterUpdateRequestDto requestDto){
        Filter filter = filterRepository.findById(filterNo).orElseThrow(
                ()->new IllegalArgumentException("해당 필터가 존재하지 않습니다. filterNo="+filterNo));

        filter.update(requestDto.getFilterName(), requestDto.getFilterContents(), requestDto.getFilterColor());
        return filterNo;
    }

    @Transactional
    public void delete (Long filterNo) {
        Filter filter = filterRepository.findById(filterNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 필터가 존재하지 않습니다. filterNo="+filterNo));
        filterRepository.delete(filter);
    }

    public FilterResponseDto findByfilterNo (Long filterNo){
        Filter entity = filterRepository.findById(filterNo).orElseThrow(
                ()-> new IllegalArgumentException("해당 필터가 존재하지 않습니다. filterNo="+filterNo));
        return new FilterResponseDto(entity);
    }
}
