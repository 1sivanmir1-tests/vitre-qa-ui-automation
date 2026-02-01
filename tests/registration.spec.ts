import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';

test.describe('User Registration', () => {

  test('@sanity successful registration with required fields only', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const name = 'Test User';
    const email = `test${Date.now()}@example.com`;

    // Step 1: Navigate and trigger initial signup
    await registrationPage.goToHomePage();
    await registrationPage.goToSignupPage();
    await registrationPage.signup(name, email);

    // Step 2: Verify pre-filled data on registration form
    await registrationPage.expectOnRegistrationPage();
    await registrationPage.expectPrefilledNameAndEmail(name, email);
    await registrationPage.expectDefaultCountryIsIndia();

    // Step 3: Complete mandatory fields and verify input
    await registrationPage.fillRequiredFields();
    await registrationPage.expectRequiredFieldsAreFilled();
    await registrationPage.expectOptionalFieldsAreEmpty();

    // Step 4: Submit and verify final outcome
    await registrationPage.submitRegistrationAndExpectSuccess();
    await registrationPage.expectAccountCreatedHeaderVisible();
  });

  test('@sanity successful registration with all fields filled', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const name = 'Test User';
    const email = `test${Date.now()}@example.com`;

    // Step 1: Initial signup flow
    await registrationPage.goToHomePage();
    await registrationPage.goToSignupPage();
    await registrationPage.signup(name, email);

    // Step 2: Fill entire form and verify all fields
    await registrationPage.expectOnRegistrationPage();
    await registrationPage.fillAllRegistrationFields();
    await registrationPage.expectAllRegistrationFieldsAreFilled();

    // Step 3: Execution and success validation
    await registrationPage.submitRegistrationAndExpectSuccess();
    await registrationPage.expectAccountCreatedHeaderVisible();
  });

  test('@sanity signup fails with duplicate email', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const name = 'Jane Smith';
    const email = 'existing@test.com';

    // Attempt signup with existing credentials
    await registrationPage.goToHomePage();
    await registrationPage.goToSignupPage();
    await registrationPage.signupExpectingDuplicateEmailError(name, email);

    // Verify error state and data retention
    await registrationPage.expectRegistrationFormNotDisplayed();
    await registrationPage.expectSignupNameAndEmailRetained(name, email);
  });

  test('@validation registration fails when password is missing', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const name = 'Validation User';
    const email = `validation${Date.now()}@example.com`;

    // Navigate to registration form
    await registrationPage.goToHomePage();
    await registrationPage.goToSignupPage();
    await registrationPage.signup(name, email);
    await registrationPage.expectOnRegistrationPage();

    // Submit form with missing mandatory field (Password)
    await registrationPage.fillRequiredFieldsExceptPassword();
    await registrationPage.submitRegistration();

    // Verify system stays on same page (No redirection)
    await registrationPage.expectStillOnRegistrationPage();
  });

});