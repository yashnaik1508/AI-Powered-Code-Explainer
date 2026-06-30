package com.aicodeexplainer.service;

import com.aicodeexplainer.dto.ExplainRequest;
import com.aicodeexplainer.dto.ExplainResponse;

public interface ExplainService {
    ExplainResponse explainCode(ExplainRequest request);
}
