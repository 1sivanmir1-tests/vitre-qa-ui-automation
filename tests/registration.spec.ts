import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';

test.describe('User Registration', () => {

  test('@sanity successful registration with required fields only', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    const name = 'Test User';
    const email = `test${Date.now()}@example.com`;

    await registrationPage.goToHomePage();
    await registrationPage.goToSignupPage();
    await registrationPage.signup(name, email);

    await registrationPage.expectOnRegistrationPage();

    await registrationPage.expectPrefilledNameAndEmail(name, email);
    await registrationPage.expectDefaultCountryIsIndia();

    await registrationPage.fillRequiredFields();

    await registrationPage.expectRequiredFieldsAreFilled();
    await registrationPage.expectOptionalFieldsAreEmpty();

    await registrationPage.submitRegistrationAndExpectSuccess();
    await registrationPage.expectAccountCreatedHeaderVisible();
  });


  test('@sanity successful registration with all fields filled', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  const name = 'Test User';
  const email = `test${Date.now()}@example.com`;

  await registrationPage.goToHomePage();
  await registrationPage.goToSignupPage();
  await registrationPage.signup(name, email);

  await registrationPage.expectOnRegistrationPage();
  await registrationPage.expectPrefilledNameAndEmail(name, email);

  await registrationPage.fillAllRegistrationFields();
  await registrationPage.expectAllRegistrationFieldsAreFilled();

  await registrationPage.submitRegistrationAndExpectSuccess();
  await registrationPage.expectAccountCreatedHeaderVisible();
});


  test('@sanity signup fails with duplicate email', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  const name = 'Jane Smith';
  const email = 'existing@test.com';

  await registrationPage.goToHomePage();
  await registrationPage.goToSignupPage();

  await registrationPage.signupExpectingDuplicateEmailError(name, email);

  await registrationPage.expectRegistrationFormNotDisplayed();
  await registrationPage.expectSignupNameAndEmailRetained(name, email);
});


  test('@validation registration fails when password is missing', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  const name = 'Validation User';
  const email = `validation${Date.now()}@example.com`;

  await registrationPage.goToHomePage();
  await registrationPage.goToSignupPage();
  await registrationPage.signup(name, email);

  await registrationPage.expectOnRegistrationPage();

  await registrationPage.fillRequiredFieldsExceptPassword();

  await registrationPage.submitRegistration();

  await registrationPage.expectStillOnRegistrationPage();
});


});
