package com.example.backend.commons.mapper.task;

import com.example.backend.commons.entity.task.Task;
import com.example.backend.commons.entity.topic.Topic;
import com.example.backend.commons.request.task.TaskRequest;
import com.example.backend.commons.response.task.TaskResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    @Mapping(source = "topicId", target = "topic")
    Task toEntity(TaskRequest request);

    void updateEntity(TaskRequest request, @MappingTarget Task task);

    TaskResponse toResponse(Task entity);

    default Topic idToTopic(Long id) {
        return Topic.builder()
                .topicId(id)
                .build();
    }
}
