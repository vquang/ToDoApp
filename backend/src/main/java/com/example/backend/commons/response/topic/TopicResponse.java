package com.example.backend.commons.response.topic;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class TopicResponse {
    private Long topicId;
    private String topicName;
    private LocalDate date;
    private Boolean isDeleted;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private LocalDate deletedAt;
}
