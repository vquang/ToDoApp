package com.example.backend.commons.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PageResponse<T> {
    private Long total;
    private Integer totalPages;
    private Integer page;
    private Integer limit;
    private Boolean preLoadAble;
    private Boolean loadMoreAble;
    private List<T> items;
}
