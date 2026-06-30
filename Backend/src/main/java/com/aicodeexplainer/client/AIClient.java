package com.aicodeexplainer.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.google.genai.Client;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.aicodeexplainer.dto.ExplainResponse;

@Component
public class AIClient {

    private final Client client;
    private final String model = "gemini-2.5-flash";
    private final ObjectMapper objectMapper;

    public AIClient(@Value("${gemini.api.key}") String apiKey) {
        this.client = Client.builder().apiKey(apiKey).build();
        this.objectMapper = new ObjectMapper();
    }

    public ExplainResponse generateExplanation(String language, String code) {
        String prompt = String.format(
                "You are an expert software engineer.\n\n" +
                "Analyze the following %s code.\n\n" +
                "CRITICAL INSTRUCTION: If the selected language does not match the submitted code, do not explain it. " +
                "Instead, return an error message stating the detected language and ask the user to select the correct language.\n\n" +
                "Return your response ONLY as a valid JSON object. Do not use Markdown formatting and do not wrap it in ```json blocks.\n" +
                "The JSON must have exactly these keys (or just the \"error\" key if there is a language mismatch):\n" +
                "- \"error\": Use this ONLY if there is a language mismatch (e.g. \"The submitted code appears to be Python, but you selected JavaScript...\").\n" +
                "- \"language\": The programming language of the code.\n" +
                "- \"explanation\": A plain-English explanation (2-4 sentences).\n" +
                "- \"purpose\": The purpose of the code.\n" +
                "- \"expectedOutput\": The expected output (or \"N/A\" if not applicable).\n" +
                "- \"timeComplexity\": The estimated time complexity.\n" +
                "- \"spaceComplexity\": The estimated space complexity.\n\n" +
                "Code:\n%s", 
                language, code);

        try {
            String jsonText = client.models.generateContent(model, prompt, null).text();
            
            if (jsonText != null) {
                jsonText = jsonText.trim();
                if (jsonText.startsWith("```json")) {
                    jsonText = jsonText.substring(7);
                } else if (jsonText.startsWith("```")) {
                    jsonText = jsonText.substring(3);
                }
                if (jsonText.endsWith("```")) {
                    jsonText = jsonText.substring(0, jsonText.length() - 3);
                }
                jsonText = jsonText.trim();
            }
            
            return objectMapper.readValue(jsonText, ExplainResponse.class);
        } catch (Exception e) {
            ExplainResponse errorResponse = new ExplainResponse();
            errorResponse.setExplanation("Error communicating with AI service or parsing JSON: " + e.getMessage());
            return errorResponse;
        }
    }
}
