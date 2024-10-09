package com.example.backend.repository.task;

import com.example.backend.commons.entity.task.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Modifying
    @Transactional
    @Query("update Task t set t.isDeleted = true, t.deletedAt = :deletedAt where t.topic.topicId = :topicId")
    void deleteByTopic(Long topicId, LocalDate deletedAt);

    @Query("select t from Task t where t.taskName like %:search% and t.topic.topicId = :topicId " +
            "and (t.isDeleted = false or t.isDeleted is null )")
    Page<Task> searchAll(String search, Long topicId, Pageable pageable);

    @Query("select t from Task t where t.taskId = :id and (t.isDeleted = false or t.isDeleted is null )")
    Optional<Task> findActiveTaskById(Long id);
}
