package com.example.backend.service.topic;

import com.example.backend.commons.request.topic.TopicRequest;
import com.example.backend.commons.response.MessageResponse;
import com.example.backend.commons.response.PageResponse;
import com.example.backend.commons.response.topic.TopicResponse;

import java.time.LocalDate;

public interface TopicService {
    MessageResponse create(TopicRequest request);

    MessageResponse update(Long id, TopicRequest request);

    MessageResponse delete(Long id);

    TopicResponse getById(Long id);

    PageResponse<TopicResponse> getList(int page, int limit, String search, LocalDate date);
}
