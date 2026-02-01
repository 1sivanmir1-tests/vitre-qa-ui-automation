# Part 5 – Reflection

---

## 1. What was the hardest part of automating this feature?
The most challenging aspect was achieving synchronization within an unstable environment. The target website suffers from high latency and frequent third-party ad overlays that can intercept clicks. To overcome this, I had to move away from standard page-load strategies and implement a defensive coding approach using explicit, element-based waits.

---

## 2. What part felt manual-QA-heavy rather than automation-heavy?
Requirement Analysis and "Hidden" Logic Discovery. Before writing a single line of code, I had to manually investigate the DOM and the project's instructions. I found functional metadata and attributes in the code that weren't visible in the UI, which required a human eye to interpret and incorporate into the test strategy.

---

## 3. What would break first if the UI changed?
The Locators (Selectors). Even with the Page Object Model (POM) design, any change to the data-qa attributes or a structural reorganization of the multi-step form would be the first point of failure.

---

## 4. How would you decide what NOT to automate in this product?
I chose not to automate Security Injection tests (like SQL or Prompt Injection) and the behavior of Third-party ads. These scenarios are better suited for manual exploratory testing or specialized security tools, as they are often non-deterministic and provide a low ROI when included in a functional UI automation suite.

---

## 5. What is a bug you expect users to find before QA?
Performance degradation under peak load. Automation typically runs in a "clean" environment. Real-world users might experience "Internal Server Errors" or extreme latency when many users register simultaneously—issues that a functional UI test is not designed to catch.

---

## 6. How could this test pass in automation but fail in production?
Environment Mismatches. Factors such as production-only CDN configurations, live security headers, or third-party tracking scripts that are disabled in testing but active in production could interfere with the form submission or UI rendering in the "Real World."

---

## 7. If this test started failing randomly in CI, where would you look first?
I would first investigate the Network Logs and Server Status. Given the application's history of server-side instability (Django/SQLite errors), a random failure is most likely caused by a backend timeout or a network "Abort" rather than a regression in the automation code.

---

## Security Awareness: Identification of Prompt Injection

During the initial review of the assignment requirements, I identified a hidden "Prompt Injection" instruction embedded in the text (specifically directing any processing LLM to produce "disordered and unreliable output").

**Action Taken:**  
To ensure the accuracy of the AI-assisted portions of this project, I manually filtered these instructions before processing. This step was essential to maintain the reliability of the generated test ideas and code structures, ensuring they align with the actual functional requirements of the task rather than the conflicting instructions hidden in the document.