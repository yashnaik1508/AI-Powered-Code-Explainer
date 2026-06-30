package com.aicodeexplainer.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.aicodeexplainer.dto.ExplainRequest;
import com.aicodeexplainer.dto.ExplainResponse;
import com.aicodeexplainer.service.ExplainService;

@RestController
@RequestMapping("/api/explain")
public class ExplainController {

    private final ExplainService explainService;

    public ExplainController(ExplainService explainService) {
        this.explainService = explainService;
    }

    @PostMapping
    public ExplainResponse explainCode(@RequestBody ExplainRequest request) {
        return explainService.explainCode(request);
    }
}
