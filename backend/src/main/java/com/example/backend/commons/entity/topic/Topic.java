package com.example.backend.commons.entity.topic;

import com.example.backend.commons.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long topicId;
    @Column(nullable = false)
    private String topicName;
    @Column(nullable = false)
    private LocalDate date;
    private Boolean isDeleted;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private LocalDate deletedAt;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
