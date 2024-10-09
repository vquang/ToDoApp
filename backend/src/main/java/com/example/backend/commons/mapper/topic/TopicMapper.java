package com.example.backend.commons.mapper.topic;

import com.example.backend.commons.entity.topic.Topic;
import com.example.backend.commons.request.topic.TopicRequest;
import com.example.backend.commons.response.topic.TopicResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TopicMapper {
    Topic toEntity(TopicRequest request);

    void updateTopic(TopicRequest request, @MappingTarget Topic topic);

    TopicResponse toResponse(Topic entity);
}
