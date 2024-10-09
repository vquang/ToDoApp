package com.example.backend.service.task;

import com.example.backend.commons.request.task.TaskRequest;
import com.example.backend.commons.response.MessageResponse;
import com.example.backend.commons.response.PageResponse;
import com.example.backend.commons.response.task.TaskResponse;

public interface TaskService {
    MessageResponse create(TaskRequest request);

    MessageResponse update(Long id, TaskRequest request);

    MessageResponse delete(Long id);

    PageResponse<TaskResponse> getList(int page, int limit, String search, Long topicId);

    MessageResponse done(Long id);
}
