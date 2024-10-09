package com.example.backend.util;

import com.example.backend.commons.response.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public class PageUtil {
    public static Pageable toPageable(int page, int limit) {
        return PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
    }

    public static <T, E> PageResponse<T> toResponse(Page<E> pages, int page, int limit, List<T> items) {
        return PageResponse.<T>builder()
                .total(pages.getTotalElements())
                .totalPages(pages.getTotalPages())
                .page(page)
                .limit(limit)
                .preLoadAble(page != 1)
                .loadMoreAble(pages.getTotalPages() > page)
                .items(items)
                .build();
    }
}
