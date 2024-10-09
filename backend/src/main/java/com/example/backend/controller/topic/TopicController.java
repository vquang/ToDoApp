package com.example.backend.controller.topic;

import com.example.backend.commons.request.topic.TopicRequest;
import com.example.backend.commons.response.BaseResponse;
import com.example.backend.commons.response.MessageResponse;
import com.example.backend.commons.response.PageResponse;
import com.example.backend.commons.response.topic.TopicResponse;
import com.example.backend.service.topic.TopicService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.example.backend.util.TimeUtil.toLocalDate;

@RestController
@RequestMapping("/api/topic")
@RequiredArgsConstructor
public class TopicController {
    private final TopicService topicService;

    @PostMapping("")
    public BaseResponse<MessageResponse> create(@Valid @RequestBody TopicRequest request) {
        return BaseResponse.ok(topicService.create(request));
    }

    @PutMapping("/{id}")
    public BaseResponse<MessageResponse> update(@PathVariable("id") Long id,
                                                @Valid @RequestBody TopicRequest request) {
        return BaseResponse.ok(topicService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public BaseResponse<MessageResponse> delete(@PathVariable("id") Long id) {
        return BaseResponse.ok(topicService.delete(id));
    }

    @GetMapping("/{id}")
    public BaseResponse<TopicResponse> getById(@PathVariable("id") Long id) {
        return BaseResponse.ok(topicService.getById(id));
    }

    @GetMapping("")
    public BaseResponse<PageResponse<TopicResponse>> getList(@RequestParam(value = "page", defaultValue = "1") int page,
                                                             @RequestParam(value = "limit", defaultValue = "10") int limit,
                                                             @RequestParam(value = "search", defaultValue = "") String search,
                                                             @RequestParam(value = "date", defaultValue = "09-05-2002") String date) {
        return BaseResponse.ok(topicService.getList(page, limit, search, toLocalDate(date)));
    }
}
