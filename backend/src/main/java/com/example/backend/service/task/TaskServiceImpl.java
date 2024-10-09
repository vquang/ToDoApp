package com.example.backend.service.task;

import com.example.backend.commons.entity.task.Task;
import com.example.backend.commons.mapper.task.TaskMapper;
import com.example.backend.commons.request.task.TaskRequest;
import com.example.backend.commons.response.MessageResponse;
import com.example.backend.commons.response.PageResponse;
import com.example.backend.commons.response.task.TaskResponse;
import com.example.backend.config.exception.ApiException;
import com.example.backend.repository.task.TaskRepository;
import com.example.backend.repository.topic.TopicRepository;
import com.example.backend.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TopicRepository topicRepository;
    private final TaskMapper taskMapper;

    @Override
    public MessageResponse create(TaskRequest request) {
        topicRepository.findById(request.getTopicId())
                .orElseThrow(() -> new ApiException(404, "resource not found"));
        taskRepository.save(taskMapper
                .toEntity(request)
                .setIsDone(false)
                .setCreatedAt(LocalDate.now()));
        return new MessageResponse("successfully");
    }

    @Override
    public MessageResponse update(Long id, TaskRequest request) {
        topicRepository.findById(request.getTopicId())
                .orElseThrow(() -> new ApiException(404, "resource not found"));
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ApiException(404, "resource not found"))
                .setUpdatedAt(LocalDate.now());
        taskMapper.updateEntity(request, task);
        taskRepository.save(task);
        return new MessageResponse("successfully");
    }

    @Override
    public MessageResponse delete(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ApiException(404, "resource not found"))
                .setIsDeleted(true)
                .setDeletedAt(LocalDate.now());
        taskRepository.save(task);
        return new MessageResponse("successfully");
    }

    @Override
    public PageResponse<TaskResponse> getList(int page, int limit, String search, Long topicId) {
        topicRepository.findById(topicId)
                .orElseThrow(() -> new ApiException(404, "resource not found"));
        Page<Task> pages = taskRepository.searchAll(search, topicId, PageUtil.toPageable(page, limit));
        return PageUtil.toResponse(pages, page, limit, pages.map(taskMapper::toResponse).toList());
    }

    @Override
    public MessageResponse done(Long id) {
        taskRepository
                .findActiveTaskById(id)
                .map(t -> taskRepository.save(t.setIsDone(!t.getIsDone())))
                .orElseThrow(() -> new ApiException(404, "resource not found"));
        return new MessageResponse("successfully");
    }
}
