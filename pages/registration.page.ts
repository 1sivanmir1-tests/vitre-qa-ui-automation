import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  //  Locators: Signup Section 
  readonly signupLoginLink: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;

  //  Locators: Account Information Section 
  readonly accountInformationHeader: Locator;
  readonly passwordInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;

  //  Locators: Success Section 
  readonly accountCreatedHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initial Signup Locators
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.nameInput = page.getByPlaceholder('Name');
    this.emailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.signupErrorMessage = page.getByText('Email Address already exist!');

    // Registration Form Locators
    this.accountInformationHeader = page.getByText('Enter Account Information');
    this.passwordInput = page.getByLabel('Password');
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.addressInput = page.locator('[data-qa="address"]');
    this.stateInput = page.getByLabel('State');
    this.cityInput = page.getByLabel('City');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.getByLabel('Mobile Number');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });

    // Header Locators
    this.accountCreatedHeader = page.getByText('ACCOUNT CREATED!');
  }

  //  Navigation Methods 

  async goToHomePage() {
  await this.page.goto('https://automationexercise.com/');
  // Wait for the logo or login link to be visible before continuing.
  await this.signupLoginLink.waitFor({ state: 'visible', timeout: 15000 });
}


async goToSignupPage() {
  await this.page.goto('https://automationexercise.com/login');
  // wait for the field that proves we have arrived to signup page
  await this.nameInput.waitFor({ state: 'visible', timeout: 15000 });
}

  //  Action Methods 

  async signup(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }

  async signupExpectingDuplicateEmailError(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);

    await Promise.all([
      this.signupErrorMessage.waitFor({ state: 'visible' }),
      this.signupButton.click(),
    ]);
  }

  async fillRequiredFields() {
    await this.passwordInput.fill('Test123');
    await this.firstNameInput.fill('Jane');
    await this.lastNameInput.fill('Smith');
    await this.addressInput.fill('456 Oak Avenue');
    await this.stateInput.fill('Maharashtra');
    await this.cityInput.fill('Mumbai');
    await this.zipcodeInput.fill('400001');
    await this.mobileNumberInput.fill('9876543210');
  }

  async fillRequiredFieldsExceptPassword() {
    await this.firstNameInput.fill('Jane');
    await this.lastNameInput.fill('Smith');
    await this.addressInput.fill('456 Oak Avenue');
    await this.stateInput.fill('Maharashtra');
    await this.cityInput.fill('Mumbai');
    await this.zipcodeInput.fill('400001');
    await this.mobileNumberInput.fill('9876543210');
  }

  async fillAllRegistrationFields() {
    await this.page.locator('input[name="title"][value="Mr"]').check();
    await this.passwordInput.fill('Test123');
    await this.page.locator('[data-qa="days"]').selectOption('15');
    await this.page.locator('[data-qa="months"]').selectOption('5');
    await this.page.locator('[data-qa="years"]').selectOption('1990');
    await this.firstNameInput.fill('John');
    await this.lastNameInput.fill('Doe');
    await this.page.locator('[data-qa="company"]').fill('Test Company');
    await this.addressInput.fill('123 Main Street');
    await this.page.locator('[data-qa="address2"]').fill('Apt 4B');
    await this.page.getByLabel('Country').selectOption('United States');
    await this.stateInput.fill('California');
    await this.cityInput.fill('Los Angeles');
    await this.zipcodeInput.fill('90001');
    await this.mobileNumberInput.fill('1234567890');
    await this.page.getByLabel('Sign up for our newsletter!').check();
    await this.page.getByLabel('Receive special offers from our partners!').check();
  }

  async submitRegistration() {
    await this.createAccountButton.click();
  }


  async submitRegistrationAndExpectSuccess() {
  await this.createAccountButton.click();
  // Wait for the URL to change to a success relevant address
  await this.page.waitForURL('**/account_created', { timeout: 20000 });
}

  //  Assertion Methods 

  async expectOnRegistrationPage() {
  // wait specifically for the form title
  await this.accountInformationHeader.waitFor({ state: 'visible', timeout: 15000 });
}

  async expectStillOnRegistrationPage() {
    await expect(this.accountInformationHeader).toBeVisible();
  }

  async expectRegistrationFormNotDisplayed() {
    await expect(this.accountInformationHeader).not.toBeVisible();
  }

  async expectPrefilledNameAndEmail(expectedName: string, expectedEmail: string) {
    const nameInput = this.page.locator('[data-qa="name"]');
    const emailInput = this.page.locator('[data-qa="email"]');
    await expect(nameInput).toHaveValue(expectedName);
    await expect(emailInput).toHaveValue(expectedEmail);
  }

  async expectSignupNameAndEmailRetained(expectedName: string, expectedEmail: string) {
    await expect(this.nameInput).toHaveValue(expectedName);
    await expect(this.emailInput).toHaveValue(expectedEmail);
  }

  async expectAccountCreatedHeaderVisible() {
    await expect(
      this.page.getByRole('heading', { name: 'ACCOUNT CREATED!' })
    ).toBeVisible();
  }

  async expectDuplicateEmailError() {
    await expect(this.signupErrorMessage).toBeVisible();
  }

  async expectStillOnSignupPage() {
    await expect(this.accountInformationHeader).not.toBeVisible();
  }

  async expectStillOnSignupLoginPage() {
    await expect(this.nameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.signupButton).toBeVisible();
  }

  async expectDefaultCountryIsIndia() {
    const countrySelect = this.page.getByLabel('Country');
    await expect(countrySelect).toHaveValue('India');
  }

  async expectRequiredFieldsAreFilled() {
    await expect(this.passwordInput).toHaveValue(/.+/);
    await expect(this.firstNameInput).toHaveValue(/.+/);
    await expect(this.lastNameInput).toHaveValue(/.+/);
    await expect(this.addressInput).toHaveValue(/.+/);
    await expect(this.stateInput).toHaveValue(/.+/);
    await expect(this.cityInput).toHaveValue(/.+/);
    await expect(this.zipcodeInput).toHaveValue(/.+/);
    await expect(this.mobileNumberInput).toHaveValue(/.+/);
  }

  async expectOptionalFieldsAreEmpty() {
    await expect(this.page.locator('[data-qa="company"]')).toHaveValue('');
    await expect(this.page.locator('[data-qa="address2"]')).toHaveValue('');
    const selectedTitle = this.page.locator('input[name="title"]:checked');
    await expect(selectedTitle).toHaveCount(0);
    await expect(this.page.getByLabel('Sign up for our newsletter!')).not.toBeChecked();
    await expect(this.page.getByLabel('Receive special offers from our partners!')).not.toBeChecked();
  }

  async expectAllRegistrationFieldsAreFilled() {
    await expect(this.page.locator('input[name="title"]:checked')).toHaveValue('Mr');
    await expect(this.passwordInput).toHaveValue(/.+/);
    await expect(this.page.locator('[data-qa="days"]')).toHaveValue('15');
    await expect(this.page.locator('[data-qa="months"]')).toHaveValue('5');
    await expect(this.page.locator('[data-qa="years"]')).toHaveValue('1990');
    await expect(this.firstNameInput).toHaveValue('John');
    await expect(this.lastNameInput).toHaveValue('Doe');
    await expect(this.page.locator('[data-qa="company"]')).toHaveValue('Test Company');
    await expect(this.addressInput).toHaveValue('123 Main Street');
    await expect(this.page.locator('[data-qa="address2"]')).toHaveValue('Apt 4B');
    await expect(this.page.getByLabel('Country')).toHaveValue('United States');
    await expect(this.stateInput).toHaveValue('California');
    await expect(this.cityInput).toHaveValue('Los Angeles');
    await expect(this.zipcodeInput).toHaveValue('90001');
    await expect(this.mobileNumberInput).toHaveValue('1234567890');
    await expect(this.page.getByLabel('Sign up for our newsletter!')).toBeChecked();
    await expect(this.page.getByLabel('Receive special offers from our partners!')).toBeChecked();
  }
}