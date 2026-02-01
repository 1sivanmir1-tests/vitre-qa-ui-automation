# Part 3 – AI-Assisted QA

## Overview

Throughout this QA assignment, I used AI (chat GPT, claude) as a collaborative partner to accelerate test planning, identify edge cases, and assist with automation code. This section demonstrates how AI was used as a force multiplier while maintaining critical QA judgment and verification.

My approach was not to ask for "the answer," but to use AI for brainstorming, structuring, and accelerating the technical implementation, while I provided the domain expertise and critical validation.

---

## Example 1: Generating Test Ideas & Coverage Strategy

### Prompt
I'm testing a user registration feature with the following flow:
1. Signup page: User enters Name and Email
2. Registration form: User fills required fields (Password, First Name, Last Name, country
   Address, State, City, Zipcode, Mobile) and optional fields (Title, DOB, Company, 
   Address 2, Newsletter, Special Offers)
3. Success page: Account created confirmation

Analyze this feature and suggest:
- Test coverage strategy (what types of tests to include)
- Risk-based prioritization
- Which scenarios are must-test vs nice-to-have

### AI Output (Partial)

```markdown
## Recommended Test Coverage Strategy

### High Priority (Must Test):
1. **E2E Happy Path**
   - Complete registration with all fields
   - Registration with required fields only
   
2. **Critical Validations**
   - Required field enforcement (all 11 fields)
   - Email format validation (missing @, missing domain)
   - Duplicate email handling
   
3. **Security Basics**
   - SQL injection attempts
   - XSS script injection
   - HTML tag handling

### Medium Priority:
4. **Field Behaviors**
   - Pre-filled fields (Name editable vs Email read-only)
   - Country dropdown default value
   - Optional fields truly optional
   
5. **Data Integrity**
   - Date validation (invalid dates like 31 Feb)
   - Mobile number format
   - Zipcode format

### Lower Priority:
6. **UI/UX**
   - Error message placement
   - Required field indicators
   - Data persistence after validation error
```

### What I Trusted
* Test categorization - The grouping into E2E, Validation, Functional, GUI made sense
* Risk-based prioritization - Happy path and security as high priority was correct

### What I Verified/Changed

**Field count:** AI initially suggested "test all required fields" but didn't specify which ones
   I manually verified the form and identified exactly 11 required fields + 6 optional
- Country field behavior - AI suggested "test empty country"
   I discovered through testing that Country cannot be empty (has default "India")
- Prioritization adjustment - AI suggested all 11 required fields as "must test"
   I chose password as representative example due to time constraints, documented others as future work

---

## Example 2: Edge Cases Generation

### Prompt

"I'm testing email and name fields in a registration form. 
Generate edge cases commonly missed by QA engineers, focusing on:
- Special characters in names (hyphens, apostrophes)
- Email format variations
- Boundary values (very short/long inputs)
- Security concerns"

### AI Output (Partial)

**Email Edge Cases:**
1. Missing @ symbol: `johnexample.com`
2. Multiple @ symbols: `john@@example.com`
3. Missing domain: `john@`
4. Valid with plus: `john+test@example.com`
5. Valid with dots: `first.last@example.com`

**Name Field Edge Cases:**
6. Hyphenated names: `Mary-Jane`
7. Apostrophes: `O'Brien`
8. Accented characters: `José`
9. Very long name: 255+ characters
10. SQL injection attempt: `'; DROP TABLE users; --`

### What I Trusted

- **Email format variations** - AI correctly identified common mistakes (missing @, missing domain)
- **Valid special characters** - Plus (+) and dots (.) in emails are indeed valid
- **Security test ideas** - SQL injection suggestion was valuable

### What I Verified/Changed

**Tested against actual site:**
- Confirmed: `user+tag@example.com` is accepted
- Confirmed: `john@` triggers browser validation
- Confirmed: Hyphenated names (`Mary-Jane`) work

**Prioritized for scope:**
- Selected 5 critical edge cases for test suite (TC-05, TC-06, TC-07, TC-21)
- Documented SQL injection as security sanity check (TC-21)
- Excluded Unicode/accented character testing as it is not a priority for this assignment scope

**Found limitation:**
- AI suggested testing "very long names (255+ chars)"
- Actual site: No visible length limit (gap documented in findings)
- Added to test plan as validation gap (TC-20)

---

## Example 3: Automation Code Assistance

### Prompt
I'm using Playwright with TypeScript and Page Object Model.
Create a Page Object class for a registration form with these elements:
- Name input (data-qa="name")
- Email input (data-qa="email") 
- Password input (label="Password")
- First Name input (label="First Name")
- Submit button (role="button", name="Create Account")

Include methods for:
- Filling required fields
- Submitting the form
- Verifying success message

### AI Output (Partial)

```typescript
import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly firstNameInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.passwordInput = page.getByLabel('Password');
    this.firstNameInput = page.getByLabel('First Name');
    this.submitButton = page.getByRole('button', { name: 'Create Account' });
    this.successMessage = page.getByText('Account Created');
  }

  async fillRequiredFields(name: string, email: string, password: string, firstName: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.firstNameInput.fill(firstName);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async expectSuccess() {
    await expect(this.successMessage).toBeVisible();
  }
}
```

### What I Trusted
* Page Object structure - Basic class structure was solid
* Locator strategies - Mix of data-qa, getByLabel, getByRole was appropriate
* TypeScript typing - Proper use of readonly and Locator types

### What I Verified/Changed

**Added missing fields** - AI only created 4 fields, I needed all 11 required + 6 optional:

```typescript// Added:
readonly lastNameInput: Locator;
readonly addressInput: Locator;
readonly stateInput: Locator;
readonly cityInput: Locator;
readonly zipcodeInput: Locator;
readonly mobileNumberInput: Locator;
// ... and 6 optional fields
```

**Added waits for stability** - AI didn't include explicit waits, I added:

```typescriptasync goToSignupPage() {
  await this.page.goto('https://automationexercise.com/login');
  await this.nameInput.waitFor({ state: 'visible', timeout: 15000 }); // Added!
}
```

**Separated concerns** - Created separate methods for different scenarios:

```typescript// AI had one fillRequiredFields()
// I created:
async fillRequiredFields() { ... }
async fillRequiredFieldsExceptPassword() { ... }  // For negative test
async fillAllRegistrationFields() { ... }         // For complete test
```

**Enhanced assertions** - AI had basic `toBeVisible()`, I added:

```typescriptasync expectPrefilledNameAndEmail(expectedName: string, expectedEmail: string) {
  await expect(this.nameInput).toHaveValue(expectedName);
  await expect(this.emailInput).toHaveValue(expectedEmail);
}

async expectRequiredFieldsAreFilled() {
  await expect(this.passwordInput).toHaveValue(/.+/);
  await expect(this.firstNameInput).toHaveValue(/.+/);
  // ... all fields
}
```

**Fixed success message** - AI used "Account Created", actual text is "ACCOUNT CREATED!":

```typescript// Changed from:
this.successMessage = page.getByText('Account Created');
// To:
this.accountCreatedHeader = page.getByText('ACCOUNT CREATED!');
```

---

## What AI Did Wrong or Poorly

### Assumed Selectors That Don't Exist (High Impact)

**What AI suggested:**

```typescriptthis.companyInput = page.getByLabel('Company');
this.zipcodeInput = page.getByLabel('Zipcode');
```

**Actual reality:**

```typescript
// Correct selectors:
this.companyInput = page.locator('[data-qa="company"]');
this.zipcodeInput = page.locator('[data-qa="zipcode"]');
```

**Why AI was wrong:**
- AI assumed standard form labels
- Actual site uses `data-qa` attributes without visible labels for some fields

**How I caught it:**
- Ran initial automation → tests failed with "element not found"
- Inspected DOM using browser DevTools
- Updated selectors to match actual attributes

**Impact if not caught:**
- Tests would fail to find elements
- Automation completely non-functional
