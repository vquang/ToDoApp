package com.example.backend.commons.response.task;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class TaskResponse {
    private Long taskId;
    private String taskName;
    private Boolean isDone;
    private Boolean isDeleted;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private LocalDate deletedAt;
}
