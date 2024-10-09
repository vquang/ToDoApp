package com.example.backend.commons.request.topic;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TopicRequest {
    @NotBlank(message = "topic name is required")
    private String topicName;
    @JsonFormat(pattern = "dd-MM-yyyy")
    @NotNull(message = "date is required")
    private LocalDate date;
}
