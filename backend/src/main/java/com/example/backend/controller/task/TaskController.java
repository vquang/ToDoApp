package com.example.backend.controller.task;

import com.example.backend.commons.request.task.TaskRequest;
import com.example.backend.commons.response.BaseResponse;
import com.example.backend.commons.response.MessageResponse;
import com.example.backend.commons.response.PageResponse;
import com.example.backend.commons.response.task.TaskResponse;
import com.example.backend.service.task.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/task")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping("")
    public BaseResponse<MessageResponse> create(@Valid @RequestBody TaskRequest request) {
        return BaseResponse.ok(taskService.create(request));
    }

    @PutMapping("/{id}")
    public BaseResponse<MessageResponse> update(@PathVariable("id") Long id,
                                                @Valid @RequestBody TaskRequest request) {
        return BaseResponse.ok(taskService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public BaseResponse<MessageResponse> delete(@PathVariable("id") Long id) {
        return BaseResponse.ok(taskService.delete(id));
    }

    @GetMapping("/{topicId}")
    public BaseResponse<PageResponse<TaskResponse>> getList(@RequestParam(value = "page", defaultValue = "1") int page,
                                                            @RequestParam(value = "limit", defaultValue = "10") int limit,
                                                            @RequestParam(value = "search", defaultValue = "") String search,
                                                            @PathVariable("topicId") Long topicId) {
        return BaseResponse.ok(taskService.getList(page, limit, search, topicId));
    }

    @PutMapping("/done/{id}")
    public BaseResponse<MessageResponse> done(@PathVariable("id") Long id) {
        return BaseResponse.ok(taskService.done(id));
    }
}
