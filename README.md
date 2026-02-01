# UI Automation – User Registration Suite

This project contains UI automation tests for the **User Registration** feature on [Automation Exercise](https://automationexercise.com/). 
The suite was implemented as part of a QA automation assignment, with an emphasis on maintainable test structure and stable execution.

---

## Tech Stack

- **Framework:** Playwright
- **Language:** TypeScript
- **Runtime:** Node.js
- **Design Pattern:** Page Object Model (POM)

---

## Setup Instructions

### Prerequisites

Before running the tests, ensure you have:

- **Node.js v18 or higher** ([Download](https://nodejs.org/))
  - Recommended: v20 (LTS) or v22 (latest)
  - Minimum: v18
- **Git** ([Download](https://git-scm.com/))

To check your Node version:
```bash
node --version
```

### Installation Steps

**1. Clone the repository:**
```bash
git clone https://github.com/1sivanmir1-tests/vitre-qa-ui-automation.git
cd vitre-qa-ui-automation
```

**Alternative:** Download as ZIP:
- Click "Code" → "Download ZIP"
- Extract and navigate to the folder

**2. Install dependencies:**
```bash
npm install
```

**3. Install Playwright browsers:**
```bash
npx playwright install chromium msedge
```


---

## How to Run the Tests

To run the entire suite with the pre-configured settings (Headed mode, stability timeouts, and reporting), simply execute: npx playwright test

Note: The tests are configured to run in Headed mode by default to allow for visual validation of the registration flow.

### View Test Results

After test execution:
-  **Console:** Real-time pass/fail summary
-  **HTML Report:** Opens automatically with detailed results

To manually open the report:
```bash
npx playwright show-report
```

---

## Assumptions & Limitations

### Assumptions
- The application is accessible during test execution
- No CAPTCHA or anti-bot protection blocks automated flows
- User registration is available without external dependencies (e.g., email verification)

### Limitations
- Test data is not cleaned up after execution
- Automated coverage focuses on desktop browsers only
- Performance and security testing are out of scope


---

##  What Was Automated

The automation focuses on the core user registration flow and its most critical validation points.

### Core Registration Flow
- **Signup page:** Name and email entry with validation
- **Registration form:** Data entry for required and optional fields
- **Success verification:** Account creation confirmation
- **Pre-filled fields:** Verification of name/email propagation from signup
- **Error handling:** Duplicate email detection and display

### Field Types Covered
- Text inputs (name, email, password, address, city, state, zipcode, mobile)
- Dropdowns (country, date of birth)
- Radio buttons (title: Mr/Mrs)
- Checkboxes (newsletter, special offers)

### Validation Testing
- Required field enforcement (password as representative example)
- Duplicate email rejection
- Blocking form submission on validation errors
- Error message display and persistence

---

## What Was Intentionally Not Automated

### Account Deletion
- **Reason:** Out of scope for registration testing
- **Note:** Would require separate test suite for account management
- **Potential improvement:** a controlled cleanup mechanism to maintain a clean and reusable test environment

### Newsletter/Email Verification
- **Reason:** Requires integration with external email services
- **Consideration:** External dependencies beyond the scope of this exercise
- **Alternative:** UI validation of checkbox state is included in tests

### Required Fields Validation Coverage
- **Current:** Required field validation is automated, using the password field as a representative example
- **Reason:** Validation behavior is consistent across required fields
- **Potential improvement:** Expand coverage using a data-driven approach

### Navigation Edge Cases
- **Examples:** Browser back button, page refresh during registration
- **Reason:** Highly state-dependent scenarios with limited business risk
- **Note:** Covered manually to observe UX and state handling

### Browser-Native HTML5 Messages
- **Covered:** Form submission is blocked when required fields are empty
- **Not covered:** Exact browser validation message text
- **Reason:** Message wording varies across browsers and locales
- **Focus:** Verifying behavior and user impact rather than exact text

---

## What Could Be Improved With More Time

### Improved Test Data Management
- **Current approach:** Timestamp-based email generation
- **Potential improvement:** Introducing a controlled mechanism for managing and cleaning up test data
- **Value:** Supports a cleaner, reusable test environment and improves long-term stability


### Expanded Data-Driven Coverage
- **Current approach:** Test data defined directly in the test files
- **Potential improvement:** Using parameterized tests to systematically cover similar validation scenarios
- **Value:** Improves maintainability and allows broader coverage without duplicating test logic


### Enhanced Cross-Browser Coverage
- **Current:** Chromium (all tests), Edge (sanity only)
- **Potential improvement:** Expanding coverage to additional browsers and viewports
- **Value:** Increases confidence in consistent behavior across user environments

### Visual Regression Checks
- **Potential improvement:** Adding visual checks for key user-facing pages
- **Value:** Helps detect unintended UI changes that functional assertions may miss


### Test Stability Improvements
- **Current approach:** Tests rely on built-in actionability checks
- **Potential improvement:** Reducing interference from dynamic third-party content
- **Value:** More predictable execution and faster feedback


### Automated Execution in CI
- **Potential improvement:** Integrating automated tests into a CI pipeline
- **Value:** Early detection of regressions and continuous feedback on system quality


---

## Test Execution Recording

A full automation run recording is available here:  
📹 https://drive.google.com/file/d/1hOdrHIs_Cg4_QWwGyxE66V7xm_Vu4h6l/view?usp=sharing
