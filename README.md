# AI-Powered Code Explainer

A full-stack web application built using React, Spring Boot, and Google Gemini AI that accepts Python or JavaScript code snippets and generates a plain-English explanation, expected output, and estimated time and space complexity.

## Features

- Analyze Python and JavaScript code snippets.
- Generate a plain-English explanation using Google Gemini AI.
- Display the purpose of the code.
- Predict the expected output.
- Estimate time and space complexity.
- Detect language mismatch before analysis.
- Syntax highlighting for Python and JavaScript code using PrismJS.
- Users can continuously submit different code snippets for analysis without restarting the application.
- Responsive React-based user interface with a modern glassmorphism aesthetic.

## Tech Stack

**Frontend**
- React
- Vite
- Axios
- CSS (Vanilla)

**Backend**
- Java 21
- Spring Boot
- REST API
- Maven

**AI**
- Google Gemini 2.5 Flash

## System Architecture

The application follows a decoupled client-server architecture. The frontend communicates with the backend through REST APIs, and the backend securely interacts with the Google Gemini API.

1. **Frontend (React + Vite)**: 
   - A Single Page Application (SPA) built with React.
   - Vite is used as the build tool and development server for lightning-fast HMR and optimized production builds.
   - Uses `react-simple-code-editor` and `PrismJS` for real-time, token-based syntax highlighting.
   - Custom CSS featuring a modern "glassmorphism" aesthetic with a responsive CSS Grid layout.
   - Axios is used for API communication, with Vite proxying requests to the backend to cleanly handle cross-origin requests during development.

2. **Backend (Spring Boot + Java)**:
   - A robust REST API built with Spring Boot.
   - Designed with a clear separation of concerns: Controller -> Service -> Client.
   - Uses the official `google-genai` SDK for Java to communicate securely with the Google Gemini API.
   - Requests structured JSON responses from Gemini, allowing the backend to parse and send the data reliably to the frontend.

## Project Structure

```text
AI-Powered-Code-Explainer
│
├── Backend/
│
├── Frontend/
│
└── README.md
```

## Application Workflow

1. The user selects a programming language (Python or JavaScript).
2. The user enters a code snippet in the editor.
3. The React frontend sends the request to the Spring Boot backend via a REST API.
4. The backend validates the selected language and forwards the request to Google Gemini.
5. Gemini returns a structured JSON response containing the explanation, purpose, expected output, and complexity analysis.
6. The backend parses the response and sends it back to the frontend.
7. The frontend displays the analysis in a user-friendly format.

## Technical Decisions

- **Vanilla CSS over Frameworks**: To achieve a highly customized, premium aesthetic without the overhead of heavy component libraries or utility classes, the UI was styled using pure vanilla CSS and CSS variables.
- **Vite Proxy**: Instead of globally opening CORS on the Spring Boot backend, the Vite development server is configured to proxy `/api` requests locally to the backend.
- **Language Validation**: The application validates whether the selected programming language matches the submitted code. If a mismatch is detected, the user is prompted to select the correct language before analysis.

## AI Tool Selection & Reasoning

**Model Selected**: Google Gemini (`gemini-2.5-flash`)

**Reasoning**:
- **Speed & Latency**: For an interactive web UI, latency is critical. The `flash` variant of Gemini is incredibly fast, allowing for near-instantaneous code analysis.
- **Structured Output**: Gemini handles strict JSON-formatting instructions exceptionally well, which is crucial for our backend parser to map the response directly to our Java Data Transfer Objects (DTOs).
- **Context Window**: It offers a massive context window natively, ensuring that even extremely large code snippets can be analyzed without arbitrary token limits.
- **Performance**: Gemini 2.5 Flash provides a good balance between response speed and code analysis quality, making it suitable for an interactive application.

## Response Validation and Accuracy

To minimize hallucinations and ensure accurate explanations, the system implements several guardrails:
1. **Strict Prompt Engineering**: The system prompt explicitly defines the model's persona ("expert software engineer") and strictly restricts the explanation length to 2-4 sentences to prevent rambling.
2. **Deterministic Output Formatting**: By forcing the LLM to output only JSON with specific keys (`explanation`, `expectedOutput`, `timeComplexity`, `spaceComplexity`), we prevent the model from injecting unprompted code blocks or conversational filler.
3. **Validation & Error Boundaries**: The backend catches JSON parsing exceptions and logic errors (like language mismatches), returning a structured error payload to the frontend to prevent silent failures or UI crashes.

## Screenshots

Screenshots will be added after deployment.

## Running Locally

### Backend
1. Navigate to the `Backend` directory.
2. Add your Gemini API Key in `src/main/resources/application.properties` (`gemini.api.key=YOUR_GEMINI_API_KEY_HERE`).
3. Run `./mvnw spring-boot:run`.
4. The backend runs at http://localhost:9091.

### Frontend
1. Navigate to the `Frontend` directory.
2. Run `npm install`.
3. Run `npm run dev`.
4. The frontend runs at http://localhost:5174.
