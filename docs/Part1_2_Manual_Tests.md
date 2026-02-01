# Part 1 – Test Scope & Coverage Definition

## Feature: User Registration

**System Under Test:** https://automationexercise.com/

---

### 1. Feature Overview
The User Registration feature enables new users to create an account on the system through a structured, two-step flow:
#### Step 1 – Signup
The user provides a Name and Email address. At this stage, the system validates:
Required fields
Email format (browser-level validation)
Email uniqueness
If validation succeeds, the user proceeds to the full registration form.
#### Step 2 – Registration Form
The user completes the account creation by providing:
Account credentials (Password)
Personal details
Address and contact information
Optional preferences (newsletter, special offers)
Upon successful submission, the account is created and the user is automatically logged in.
High-level user journey:
Homepage → Signup/Login → Enter Name & Email → Registration Form → Create Account → Success Page → Logged In



### 2. Scope of Testing

#### 2.1 In Scope
Testing focuses on functional correctness, validation behavior, user experience, and basic data integrity across the full registration journey.
Signup Stage
The following aspects are covered:
Successful signup with valid name and unique email
Required field enforcement for Name and Email
Email format validation handled by the browser
Detection and handling of duplicate email addresses
Error message display and user remaining on the signup page
Retention of entered data after signup failure
This stage is critical, as it acts as a gatekeeper to the rest of the flow. Detecting issues at this point helps surface problems early, before the user invests time and effort in completing a longer and more detailed form.

Registration Form Stage
Coverage includes:
Successful account creation with:
Required fields only
All fields filled
Mandatory field enforcement
Handling of optional fields
Behavior of pre-filled fields (Name editable, Email read-only)
Default values (e.g., Country)
Form submission behavior and success handling
Preservation of entered data after validation errors
The registration form represents the core business flow and receives the highest testing priority.

Validation and Edge Cases
The following validation areas are covered:
Required field validation across the form
Invalid email formats
Duplicate email handling
Invalid or unexpected input in Zipcode and Mobile Number fields
Invalid Date of Birth values (e.g., impossible dates, future dates)
Handling of leading/trailing spaces
Very long text input in free-text fields
Where validation gaps are observed, the current system behavior is documented and treated as a potential issue rather than an assumption of intended behavior.

Functional and UX Behavior
Functional behaviors under test include:
Editable versus read-only fields
Dropdown and selection controls (Country, Date of Birth)
Checkbox defaults and interaction
Browser back-button behavior during the flow
User experience when validation errors occur
These tests help ensure the flow feels predictable and user-friendly, allowing users to recover from mistakes without unnecessary friction or loss of entered data.

GUI and Visual Indicators
Required field indicators
Password masking behavior
Visibility and placement of error messages

Basic Security and Data Handling
Basic security-related sanity checks are included to ensure:
User input containing SQL or script-like content does not break the system
Injected scripts are not executed
These checks are not intended to replace full security testing but help identify obvious risks early.

3. Test Types Covered
The testing approach combines multiple perspectives:
End-to-End tests – validating complete user journeys
Functional tests – verifying specific behaviors
Validation tests – ensuring correct handling of invalid or missing data
Negative tests – confirming graceful failure
GUI/UI checks – validating clarity and state
Basic security checks – sanity-level input handling
This combination balances depth with practicality.

4. Out of Scope
The following areas are intentionally excluded at this stage:
Email verification flows
Password reset or account recovery
Account deletion
Social login integrations
Mobile and responsive testing
Performance, load, or stress testing
Deep security or penetration testing
API-level or backend-only testing
Localization and multi-language support
Cross-browser testing beyond Chrome and Edge
These areas are either separate features, require external systems, or demand dedicated tools and time beyond the current scope.

5. Assumptions and Testing Context
The following assumptions describe the testing context and constraints, not acceptance of the system behavior as correct.
They clarify the conditions under which testing is performed, while gaps, missing validations, and questionable behaviors are intentionally surfaced and documented as findings throughout the tests.
The test environment is accessible and stable during execution
Test data (such as email addresses) can be generated dynamically to support repeatable testing
Browser-based validation is active where implemented by the application
The system currently allows account creation without external dependencies (such as email verification)

---
---

# Part 2 – Manual Test Design
## Feature: User Registration

---
**Tester:** Sivan Mir  
**System Under Test:** https://automationexercise.com/  

---

## 1. Overview

This document presents a focused set of manual test cases for the User Registration feature, covering the end-to-end flow from initial signup through account creation.  
The tests are designed for the automationexercise.com application and are written in Gherkin format to support clear and structured behavior-driven testing.

### Test Selection Rationale

This test set contains **23 test cases** selected based on:

1. **Business Criticality** - Validation of core registration functionality required for successful account creation.
2. **Risk Areas** - Focus on data integrity, basic security checks, and common validation gaps (mobile number format, zipcode format, date validation).
4. **User Experience** - Coverage of form behavior, error handling, and data persistence.
5. **Coverage Balance** - Inclusion of end-to-end, functional, validation, and GUI test cases.

### Test Categories

- **@e2e** - End-to-end complete user journeys
- **@functional** - Feature functionality tests
- **@validation** - Data validation and field requirement tests
- **@gui** - User interface behavior tests
- **@negative** - Tests expecting failure or error handling
- **@sanity** - Critical path tests (run on Chrome + Edge)
- **@chrome** - Tests that run on Chrome browser
- **@edge** - Tests that also run on Edge browser

### Browser Coverage

- **Chrome + Edge:** Tests marked with @sanity @chrome @edge
- **Chrome only:** All other tests marked with @chrome

---

## Test Cases

### Feature: User Registration - Signup Page

#### Background
```gherkin
Given I am on the homepage
And I navigate to "Signup / Login" page
```

---

### TC-01: Successful Signup with Valid Credentials

```gherkin
@sanity @e2e @chrome @edge @automation
Scenario: Complete successful signup with valid credentials
  Given I am on the "Signup / Login" page
  When I enter name (e.g., "John Doe")
  And I enter a unique email address
  And I click "Signup" button
  Then I should be redirected to the registration form page
  And the Name field should be pre-filled with the entered name
  And the Email field should be pre-filled and read-only
```

---

### TC-02: Signup with Duplicate Email

```gherkin
@sanity @validation @chrome @edge @automation
Scenario: Signup fails with duplicate email
  Given an account with email "existing@test.com" already exists
  And I am on the "Signup / Login" page
  When I enter name (e.g., "Jane Smith")
  And I enter email "existing@test.com"
  And I click "Signup" button
  Then I should see error message "Email Address already exist!"
  And the error message should be displayed in the signup section
  And I should remain on the "Signup / Login" page
  And the registration form should not be displayed
  And the Name field should retain the entered value
  And the Email field should retain the entered value
```

---

### TC-03: Signup with Empty Name Field

```gherkin
@validation @chrome
Scenario: Signup fails when Name field is empty
  Given I am on the "Signup / Login" page
  When I leave the Name field empty
  And I enter a unique email address
  And I click "Signup" button
  Then the browser should display a native validation message
  And the form should not be submitted
```

---

### TC-04: Signup with Empty Email Field

```gherkin
@validation @chrome
Scenario: Signup fails when Email field is empty
  Given I am on the "Signup / Login" page
  When I enter name (e.g., "John Doe")
  And I leave the Email field empty
  And I click "Signup" button
  Then the browser should display a native validation message
  And the form should not be submitted
```

---

### TC-05: Signup with Invalid Email Format - Missing @

```gherkin
@validation @chrome
Scenario: Signup fails with email missing @ symbol
  Given I am on the "Signup / Login" page
  When I enter name (e.g., "John Doe")
  And I enter email "johnexample.com"
  And I click "Signup" button
  Then the browser should display an email validation message indicating the '@' symbol is missing
  And the form should not be submitted
```

---

### TC-06: Signup with Invalid Email Format - Missing Domain

```gherkin
@validation @chrome
Scenario: Signup fails with incomplete email domain
  Given I am on the "Signup / Login" page
  When I enter name (e.g., "John Doe")
  And I enter email "john@"
  And I click "Signup" button
  Then the browser should prevent form submission due to invalid email format
  And the form should not be submitted
```

---

### Feature: User Registration - Registration Form

#### Background
```gherkin
Given I have completed signup process successfully
And I am on the registration form page
```

---

### TC-07: Complete Registration with All Fields

```gherkin
@sanity @e2e @chrome @edge @automation
Scenario: Complete registration with all fields filled
  Given I am on the registration form
  And the Name and Email fields should be pre-filled with the values entered during signup
  When I select title "Mr"
  And I enter a valid password (e.g., "Test@123")
  And I select date of birth "15" "May" "1990"
  And I enter first name (e.g., "John")
  And I enter last name (e.g., "Doe")
  And I enter company (e.g., "Test Company")
  And I enter address (e.g., "123 Main Street")
  And I enter address 2 (e.g., "Apt 4B")
  And I select country (e.g., "United States")
  And I enter state (e.g., "California")
  And I enter city (e.g., "Los Angeles")
  And I enter zipcode (e.g., "90001")
  And I enter mobile number (e.g., "1234567890")
  And I check "Sign up for our newsletter!"
  And I check "Receive special offers from our partners!"
  And I click "Create Account" button
  Then registration should succeed
  And I should be redirected to the account created page
  And the URL should contain "/account_created"
  And I should see "ACCOUNT CREATED!" message
```

---

### TC-08: Registration with Required Fields Only

```gherkin
@sanity @e2e @chrome @edge @automation
Scenario: Registration succeeds with required fields only
  Given I am on the registration form
  And the Name and Email fields display values entered on the signup page
  And the Country field is set to default value "India"
  When I enter a valid password (e.g., "Test123")
  And I enter first name (e.g., "Jane")
  And I enter last name (e.g., "Smith")
  And I enter address (e.g., "456 Oak Avenue")
  And I enter state (e.g., "Maharashtra")
  And I enter city (e.g., "Mumbai")
  And I enter zipcode (e.g., "400001")
  And I enter mobile number (e.g., "9876543210")
  And all required fields are populated with the entered values
  And I leave the following optional fields empty:
    | Title                            |
    | Date of Birth (Day, Month, Year) |
    | Company                          |
    | Address 2                        |
    | Newsletter checkbox              |
    | Special offers checkbox          |
  And I click "Create Account" button
  Then registration should succeed
  And I should be redirected to the account created page
  And the URL should contain "/account_created"
  And I should see "ACCOUNT CREATED!" message
```

**Note:** This validates that all optional fields can remain empty without blocking registration.

---

### TC-09: Empty Required Fields Validation

```gherkin
@validation @chrome @automation
Scenario Outline: Registration fails when required fields are empty
  Given I am on the registration form
  When I leave the "<field>" field empty
  And I fill all other required fields with valid data
  And I click "Create Account" button
  Then the browser should display a validation message for the "<field>" field
  And the "<field>" field should be marked as required
  And the form should not be submitted
  
  Examples:
    | field         |
    | Name          |
    | Password      |
    | First Name    |
    | Last Name     |
    | Address       |
    | State         |
    | City          |
    | Zipcode       |
    | Mobile Number |
```

**Note:** Email and Country fields cannot be tested for empty state:
- Email is pre-filled and read-only from signup
- Country has default value "India" and cannot be emptied
---

### TC-10: Registration Form Fields – Default State and Capabilities

```gherkin
@functional @chrome
Scenario: Registration form fields capabilities and default behavior
  Given I completed signup with valid name and email 
  And I am on the registration form

  Then the Name field displays the value entered on the signup page and is editable
  And the Email field displays the value entered on the signup page and is not editable

  And the Title field is selectable
  And the Password field allows input and masks entered characters

  And the Date of Birth fields (Day, Month, Year) are dropdown fields and allow selection

  And the First Name field allows text input
  And the Last Name field allows text input

  And the Company field allows text input
  And the Address field allows text input
  And the Address 2 field allows text input

  And the Country field is a dropdown with default value "India"
  And the State field allows text input
  And the City field allows text input
  And the Zipcode field allows numeric input
  And the Mobile Number field allows numeric input

  And the Newsletter checkbox is unchecked by default and selectable
  And the Special offers checkbox is unchecked by default and selectable
```

**Note:** This scenario documents the observable behavior and capabilities of all registration form fields prior to submission.

---

### TC-11: Registration with Very Long Text Input

```gherkin
@functional @chrome
Scenario: Registration form handles very long text input
  Given I am on the registration form
  When I enter a very long string in text fields (e.g., First Name, Last Name, Address)
  And I fill all other required fields with valid data
  And I click "Create Account" button
  Then the system should handle the input without crashing or breaking the UI
  And the user should receive appropriate feedback if limits are exceeded
```

---

### TC-12: Country Selection and State Field Update

```gherkin
@functional @chrome
Scenario: Changing country selection
  Given I am on the registration form
  And the Country field shows "India"
  When I select country (e.g., "United States")
  Then the Country field should update to show "United States"
  And I should be able to enter state information accordingly
```

---


### TC-13: Mobile Number Should Reject Non-Numeric Input

```gherkin
@validation @negative @chrome
Scenario: Mobile number should reject non-numeric input
  Given I am on the registration form
  When I enter "abc123xyz" in the Mobile Number field
  And I fill all other required fields with valid data
  And I click "Create Account" button
  Then the system should display a validation error
  And the form should not be submitted
```

**Note:** Currently, the system does not validate Mobile Number input format. Expected behavior: Should reject non-numeric characters.

---

### TC-14: Zipcode Should Reject Non-Numeric Input

```gherkin
@validation @negative @chrome
Scenario: Zipcode should reject non-numeric input
  Given I am on the registration form
  When I enter "ABC12" in the Zipcode field
  And I fill all other required fields with valid data
  And I click "Create Account" button
  Then the system should display a validation error
  And the form should not be submitted
```

**Note:** Currently, the system does not validate Zipcode input format. Expected behavior: Should accept only numeric input.

---

### TC-15: Invalid Date - Non-Existent Calendar Date

```gherkin
@validation @negative @chrome
Scenario: Registration fails with invalid calendar date
  Given I am on the registration form
  When I select date of birth "31" "February" "1990"
  And I fill all other required fields with valid data
  And I click "Create Account" button
  Then the system should validate the date
  And reject invalid calendar dates
```

**Note:** Currently, the system accepts invalid dates (e.g., 31 February). Expected behavior: Should validate against actual calendar dates.

---

### TC-16: Future Date of Birth Should Be Rejected

```gherkin
@validation @negative @chrome
Scenario: Date of birth cannot be in the future
  Given I am on the registration form
  When I select a future date of birth
  And I fill all other required fields with valid data
  And I click "Create Account" button
  Then the system should reject the future date
  And display an appropriate error message
```

**Note:** A user cannot be born in the future. System should validate that the selected date is in the past.

---

### TC-17: Special Characters in Name Fields

```gherkin
@validation @chrome
Scenario: Name fields accept valid special characters
  Given I am on the registration form
  When I enter first name "Mary-Jane"
  And I enter last name "O'Connor"
  And I fill all other required fields with valid data
  And I click "Create Account" button
  Then registration should succeed
  And the entered name values should be visible in the submitted request without modification
```

**Note:** The submitted values can be verified by inspecting the network request using browser DevTools and via the application UI.

---

### TC-18: Leading and Trailing Spaces in Text Fields

```gherkin
@validation @chrome
Scenario: Leading and trailing spaces are trimmed in text fields
  Given I am on the registration form
  When I enter values with leading and trailing spaces in the following text fields:
    | Field       | Value            |
    | First Name  | "  John  "       |
    | Last Name   | "  Doe  "        |
    | Company     | "  Test Corp  "  |
    | Address     | "  123 Main St " |
    | Address 2   | "  Apt 4B  "     |
    | State       | "  California "  |
    | City        | "  Los Angeles " |
  And I fill all other required fields with valid data
  And I click "Create Account" button
  Then registration should succeed
  And the entered values should be sent consistently in the registration request (using browser DevTools)

```

**Note:** User input may accidentally include extra spaces. trimming such spaces helps maintain consistent data quality.

---

### TC-19: Browser Back Button During Registration

```gherkin
@functional @chrome
Scenario: Browser back button during registration flow
  Given I am on the registration form
  And I have entered values in the Name and Email fields
  When I click the browser back button
  Then I should be navigated back to the "Signup / Login" page
  And the Name and Email fields should retain the previously entered values
  And no error message should be displayed
```

---

### TC-20: Form Data Persistence After Validation Error

```gherkin
@functional @chrome
Scenario: Form retains entered data after validation error
  Given I am on the registration form
  When I fill all fields with data
  And I leave one required field empty (e.g., Password)
  And I click "Create Account" button
  Then I should see a validation error
  And all other entered data should remain populated in the form
```

**Note:** After a validation error, the user should not have to re-enter all data. Form should retain previously entered values.

---

### TC-21: SQL Injection Attempt Basic Check

```gherkin
@validation @chrome
Scenario: SQL injection attempt is safely handled
  Given I am on the registration form
  When I enter "' OR '1'='1" in the first name field
  And I fill all other required fields with valid data
  And I click "Create Account" button
  Then the system should not display technical errors or database errors
  And the input should be treated and saved as regular text (can verify using browser DevTools)
```

**Note:** Basic security check to ensure SQL injection attempts do not expose technical errors or database structure.

---

### TC-22: XSS Injection Attempt Basic Check

```gherkin
@validation @chrome
Scenario: XSS input is not executed
  Given I am on the registration form
  When I enter "<script>alert('XSS')</script>" in the first name field
  And I fill all other required fields with valid data
  And I click "Create Account" button
  Then registration should handle the input safely
  And no script execution should occur
  And the input should be stored as text with tags escaped or stripped (can verify using browser DevTools)
```

**Note:** Basic security check to ensure XSS attempts are safely handled and scripts are not executed.

---

### TC-23: Required Field Indicators Display

```gherkin
@gui @chrome
Scenario Outline: Required fields display asterisk indicator
  Given I am on the registration form
  Then the "<field>" field should display a required indicator "*"
  
  Examples:
    | field         |
    | Name          |
    | Email         |
    | Password      |
    | First Name    |
    | Last Name     |
    | Address       |
    | Country       |
    | State         |
    | City          |
    | Zipcode       |
    | Mobile Number |
```

---

## Unclear Requirements 

The following areas require clarification from the product team. 
Current system behavior is documented, but the intended requirements are not clearly defined.

**1. Password Security Requirements**
- **Current behavior:** The system accepts any non-empty password (e.g., "1", "abc")
- **Question:** What is the intended password policy (length, complexity)?
- **Impact:** High - affects account security

**2. Mobile Number Format Validation**
- **Current behavior:** Accepts any input including alphabetic characters (no validation)
- **Question:** Should the field enforce numeric-only input? Is an international format required?
- **Impact:** Medium – affects data quality and potential SMS functionality

**3. Date of Birth Validation**
- **Current behavior:** The system accepts invalid calendar dates (e.g., 31 February)
- **Question:** Should date selection be restricted to valid calendar dates? Are there age restrictions?
- **Impact:** Medium – affects data integrity

**4. Zipcode Format Validation**
- **Current behavior:** The Zipcode field accepts alphabetic characters and does not enforce a specific format.
- **Question:** Should the Zipcode field be validated? If so, should the validation be country-specific?
- **Impact:** Medium – affects data consistency and address accuracy.


**5. Field Length Limits**
- **Current behavior:** No maximum length limits were observed for text fields
- **Question:** Are there defined maximum lengths for fields such as name and address?
- **Impact:** Medium – affects data consistency and user experience

**6. Date of Birth Year Selection**
- **Current behavior:** The year dropdown allows selection up to 2021, while the current year is 2026.
- **Question:** Is this intentional or an outdated configuration
- **Impact:** Low – may cause user confusion


---

## Potential Flaky Behavior

**1. Form State and Client-Side Error Handling**
- **Issue:** In certain flows, client-side state handling may be inconsistent, leading to unexpected errors or unstable behavior during form submission, navigation, or validation failures.
- **Mitigation:** Identify and document flows where state inconsistencies occur, and ensure tests account for potential instability in these scenarios.
- **Risk:** Inconsistent client-side state may result in intermittent errors and flaky test outcomes.

**2. Password Field UI Behavior Across Browsers**
- **Issue:** The password visibility control (show/hide password icon) behaves inconsistently across browsers and navigation flows.
- **Observation:** In Chrome, no password visibility option is displayed, while in Edge the option appears but may disappear after navigation between screens or page transitions.
- **Mitigation:** Document the observed browser-specific behavior and raise it for clarification or defect investigation. Until the expected behavior is defined and aligned across browsers, avoid treating the password visibility control as a reliable verification point during testing.
- **Risk:** Inconsistent UI behavior may lead to unreliable test steps or visual validation failures across browsers.

---

## Product Improvements

**1. Real-Time Field Validation**
- **Current:** Validation only occurs on form submission
- **Suggestion:** Add real-time validation as user types or leaves field (on blur event)
- **Benefit:** Immediate feedback improves user experience and reduces frustration
- **Example:** Display validation feedback when the user leaves a field, rather than only after form submission.("Email already exists")

**2. Password Strength Indicator**
- **Current:** No password requirements or visual feedback
- **Suggestion:** Add visual password strength meter (weak/medium/strong)
- **Benefit:** Helps users create secure passwords and understand security expectations
- **Example:** Visual bar showing strength with requirements checklist

**3. Custom Error Messages**
- **Current:** Generic browser validation messages
- **Suggestion:** Implement custom, specific error messages with clear guidance
- **Benefit:** Clearer guidance helps users correct errors quickly
- **Example:** Instead of a generic browser message, display a message such as: "Mobile number must contain only digits (10–15 characters)."

**4. Auto-Format Input Fields**
- **Current:** Free text input with no formatting assistance
- **Suggestion:** Auto-format phone numbers and zipcodes as user types
- **Benefit:** Better data consistency and user experience
- **Example:** Format phone as user types: xxx-xxx-xxxx

**5. Country-Based Field Adaptation**
- **Current:** Same fields and formats for all countries
- **Suggestion:** Adapt zipcode/postal code format and validation based on selected country
- **Benefit:** Better international support and data quality
- **Example:** US zipcode: 5 digits, UK postcode: alphanumeric format

**6. Form Progress Indicator**
- **Current:** Long single-page form with no progress indication
- **Suggestion:** Show visual progress (e.g., "Step 1 of 2: Account Info", "Step 2 of 2: Personal Details")
- **Benefit:** Users understand how much remains, reducing abandonment
- **Example:** Progress bar or step indicator at top of form

**7. Consistent Cross - Browser UI Behavior**
- **Current:** Certain UI elements behave differently across browsers
- **Suggestion:** Align UI behavior across supported browsers to ensure a consistent user experience.
- **Benefit:** Predictable behavior reduces confusion and improves perceived quality

**8. Unsaved Data Warning on Navigation**
- **Current:** No warning when user navigates away or closes browser with unsaved form data
- **Suggestion:** Display a confirmation prompt when user attempts to leave the registration form with unsaved data (browser back button, close tab, navigate away)
- **Benefit:** Prevents accidental data loss and reduces user frustration from having to re-enter all information
- **Example:** Show prompt: "You have unsaved changes. Are you sure you want to leave this page?"
---

## Test Execution Notes

### Prerequisites
- **Unique Email Addresses:** Each test run requires unique email addresses
- **Generation Strategy:** Use timestamp-based generation: `test${Date.now()}@example.com`
- **Existing Accounts:** TC-02 (duplicate email test) requires an existing account - create one manually or in test setup

### Test Data Management
- **Email:** Generate dynamically to ensure uniqueness across test runs
- **Names:** Use variations to test different character sets (alphanumeric, hyphens, apostrophes)
- **Dates:** Test with valid dates, invalid dates (31 Feb), and edge cases (future dates, leap years)
- **Phone/Zipcode:** Test with numeric-only inputs and also with non-numeric to validate gaps

### Environment Assumptions
- Site is accessible and stable at https://automationexercise.com/
- No CAPTCHA blocking automated testing
- Browser HTML5 validation is enabled and functioning
- Network connection is stable
- Tests run on Chrome (latest stable) and Edge (latest stable) for @sanity tests

### Browser-Specific Notes
- **Chrome:** Primary browser for all tests
- **Edge:** Run @sanity tests to ensure cross-browser compatibility
- **Validation Messages:** May differ slightly between browsers - use flexible assertions

---

## Summary

**Total Test Cases:** 23

### Category Breakdown:
- **E2E Tests:** 3 (TC-01, TC-07, TC-08)
- **Validation Tests:** 15 (TC-02 through TC-06, TC-09, TC-13 through TC-21)
- **Functional Tests:** 6 (TC-11 through TC-15, TC-22)
- **GUI Tests:** 1 (TC-23)

### Coverage Focus:
- **Critical User Flows:** Complete signup and registration with all fields and with required fields only
- **Validation Gaps:** Mobile number format, zipcode format, date validation (documented as gaps)
- **Security Basics:** SQL injection and XSS sanity checks
- **User Experience:** Pre-filled fields, data persistence, error handling
- **GUI Elements:** Password masking, required field indicators

### Browser Coverage:
- **Chrome:** All test cases
- **Edge:** Sanity and critical flow tests only (TC-01, TC-02, TC-07, TC-08)

----

**Note:** This test set demonstrates a balanced approach prioritizing business-critical functionality, risk areas, validation gaps, and user experience while maintaining focus on the registration feature scope.

