package com.aicodeexplainer.service.impl;

import org.springframework.stereotype.Service;

import com.aicodeexplainer.client.AIClient;
import com.aicodeexplainer.dto.ExplainRequest;
import com.aicodeexplainer.dto.ExplainResponse;
import com.aicodeexplainer.service.ExplainService;

@Service
public class ExplainServiceImpl implements ExplainService {

    private final AIClient aiClient;

    public ExplainServiceImpl(AIClient aiClient) {
        this.aiClient = aiClient;
    }

    @Override
    public ExplainResponse explainCode(ExplainRequest request) {
        return aiClient.generateExplanation(request.getLanguage(), request.getCode());
    }
}
