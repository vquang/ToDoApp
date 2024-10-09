package com.example.backend.service.topic;

import com.example.backend.commons.entity.topic.Topic;
import com.example.backend.commons.entity.user.User;
import com.example.backend.commons.mapper.topic.TopicMapper;
import com.example.backend.commons.request.topic.TopicRequest;
import com.example.backend.commons.response.MessageResponse;
import com.example.backend.commons.response.PageResponse;
import com.example.backend.commons.response.topic.TopicResponse;
import com.example.backend.config.exception.ApiException;
import com.example.backend.repository.task.TaskRepository;
import com.example.backend.repository.topic.TopicRepository;
import com.example.backend.util.AuthUtil;
import com.example.backend.util.PageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {
    private final TopicRepository topicRepository;
    private final TaskRepository taskRepository;
    private final TopicMapper topicMapper;

    @Override
    public MessageResponse create(TopicRequest request) {
        topicRepository.save(topicMapper
                .toEntity(request)
                .setCreatedAt(LocalDate.now())
                .setUser(User
                        .builder()
                        .userId(AuthUtil.loggedId())
                        .build()));
        return new MessageResponse("successfully");
    }

    @Override
    public MessageResponse update(Long id, TopicRequest request) {
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new ApiException(404, "resource not found"))
                .setUpdatedAt(LocalDate.now());
        topicMapper.updateTopic(request, topic);
        topicRepository.save(topic);
        return new MessageResponse("successfully");
    }

    @Override
    public MessageResponse delete(Long id) {
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new ApiException(404, "resource not found"))
                .setIsDeleted(true)
                .setDeletedAt(LocalDate.now());
        topicRepository.save(topic);
        taskRepository.deleteByTopic(id, LocalDate.now());
        return new MessageResponse("successfully");
    }

    @Override
    public TopicResponse getById(Long id) {
        return topicMapper.toResponse(topicRepository
                .findActiveTopicById(id, AuthUtil.loggedId())
                .orElseThrow(() -> new ApiException(404, "resource not found")));
    }

    @Override
    public PageResponse<TopicResponse> getList(int page, int limit, String search, LocalDate date) {
        Page<Topic> pages = topicRepository.searchAll(search, date, AuthUtil.loggedId(), PageUtil.toPageable(page, limit));
        return PageUtil.toResponse(pages, page, limit, pages.map(topicMapper::toResponse).toList());
    }
}
