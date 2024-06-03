describe('Admin Login Page', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:3000/login');
  });

  it('Shows error message with incorrect credentials', () => {
    loginWithIncorrectCredentials();
    // Assert that error message is displayed
    cy.contains('Email or password is incorrect').should('be.visible');
  });

  it('Logs in successfully and redirects to manage history page', () => {
    loginWithCorrectCredentials();
    redirectToManageHistoryPage();
    redirectToManageStudentPage();
    editFirstStudent();
  });

  it('Deletes the first student', () => {
    loginWithCorrectCredentials();
    redirectToManageStudentPage();
    deleteFirstStudent();
  });

  it('Deletes the first history record', () => {
    loginWithCorrectCredentials();
    redirectToManageHistoryPage();
    deleteFirstHistory();
  });

  it('Redirects to Manage Borrowing sidebar after clicking Manage Borrowing', () => {
    loginWithCorrectCredentials();
    clickManageBorrowing();
    // Assert that the sidebar is in the "Return" section
    cy.get('.sidebar').contains('Return').should('be.visible');
  });

  it('Redirects to Manage Student sidebar after clicking Manage Student', () => {
    loginWithCorrectCredentials();
    clickManageStudent();
    // Assert that the sidebar is in the "Borrowing" section
    cy.get('.sidebar').contains('Borrowing').should('be.visible');
  });
});

function loginWithIncorrectCredentials() {
  // Enter incorrect email and password
  cy.get('#email').type('admin@example.com');
  cy.get('#password').type('wrongpassword');
  // Submit the form
  cy.get('form').submit();
}

function loginWithCorrectCredentials() {
  // Enter correct email and password
  cy.get('#email').clear().type('admin@example.com');
  cy.get('#password').clear().type('password');
  // Submit the form
  cy.get('form').submit();
}

function redirectToManageHistoryPage() {
  // Click on the manage history link
  cy.contains('Manage Borrowing').click();
  // Assert that the manage history page is loaded
  cy.url().should('include', '/manage-borrowing');
}

function redirectToManageStudentPage() {
  // Click on the "Manage Student" link
  cy.contains('Manage Student').click();
  // Assert that the page has been redirected to the "Manage Student" page
  cy.url().should('include', '/manage-student');
}

function editFirstStudent() {
  // Click on the "Edit" button for the first student
  cy.get('table tbody tr').first().find('button').contains('Edit').click();
  // Assert that the modal for editing student data is visible
  cy.get('div#exampleModal').should('be.visible');
  // Modify the student data in the modal
  cy.get('#formName').clear().type('New Student Name');
  cy.get('#formMajor').clear().type('New Major');
  cy.get('#formClass').clear().type('New Class');
  cy.get('#formEmail').clear().type('newemail@example.com');
  cy.get('#formStatus').select('inactive');
  // Click on the "Save Changes" button
  cy.get('button.btn-primary').contains('Save Changes').click();
  // Assert that the success snackbar is displayed
  cy.contains('Data successfully updated').should('be.visible');
}

function deleteFirstStudent() {
  // Click on the "Delete" button for the first student
  cy.get('table tbody tr').first().find('button').contains('Delete').click();
  // Assert that the confirmation modal is visible
  cy.get('div[role="dialog"]').should('be.visible');
  // Click on the "Yes, Delete" button in the confirmation modal
  cy.contains('Yes, Delete').click();
  // Assert that the success snackbar is displayed
  cy.contains('Student successfully deleted').should('be.visible');
  // Assert that the deleted record is no longer visible in the table
  cy.contains('Deleted Student Name').should('not.exist');
}

function deleteFirstHistory() {
  // Click on the "Delete" button for the first history record
  cy.get('table tbody tr').first().find('button').contains('Delete').click();
  // Assert that the confirmation modal is visible
  cy.get('div[role="dialog"]').should('be.visible');
  // Click on the "Yes, Delete" button in the confirmation modal
  cy.contains('Yes, Delete').click();
  // Assert that the success snackbar is displayed
  cy.contains('History record successfully deleted').should('be.visible');
  // Assert that the deleted record is no longer visible in the table
  cy.contains('Deleted History Record').should('not.exist');
}

function clickManageBorrowing() {
  // Click on the "Manage Borrowing" link
  cy.contains('Manage Borrowing').click();
}

function clickManageStudent() {
  // Click on the "Manage Student" link
  cy.contains('Manage Student').click();
}