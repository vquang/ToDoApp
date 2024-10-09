package com.example.backend.repository.topic;

import com.example.backend.commons.entity.topic.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    @Query("select t from Topic t where t.topicName like %:search% and t.date = :date " +
            "and (t.isDeleted = false or t.isDeleted is null ) and t.user.userId = :userId")
    Page<Topic> searchAll(String search, LocalDate date, Long userId, Pageable pageable);

    @Query("select t from Topic t where t.topicId = :id and (t.isDeleted = false or t.isDeleted is null )" +
            "and t.user.userId = :userId")
    Optional<Topic> findActiveTopicById(Long id, long userId);
}
