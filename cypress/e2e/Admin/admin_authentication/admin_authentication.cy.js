// cypress/integration/admin_authentication/admin_authentication.spec.js

describe('Admin Authentication', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it("Check system behavior when email and password are correct", () => {
        cy.contains('Login to access admin dashboard').should('be.visible');
        cy.get('#email').type('admin@example.com');
        cy.get('#password').type('password');
        cy.get('form').submit();
        cy.contains('Successfully logged in!').should('be.visible');
        cy.url().should('include', '/dashboard');
    });

    it("Check system behavior when email is correct and password is incorrect", () => {
        cy.contains('Login to access admin dashboard').should('be.visible');
        cy.get('#email').type('admin@example.com');
        cy.get('#password').type('incorrectpassword');
        cy.get('form').submit();
        cy.contains('Email or password is incorrect').should('be.visible');
        cy.url().should('include', '/login');
    });

    it("Check system behavior when email is incorrect and password is correct", () => {
        cy.contains('Login to access admin dashboard').should('be.visible');
        cy.get('#email').type('admin@exampleee.com');
        cy.get('#password').type('password');
        cy.get('form').submit();
        cy.contains('Email or password is incorrect').should('be.visible');
        cy.url().should('include', '/login');
    });

    it("Check system behavior when email and password are incorrect", () => {
        cy.contains('Login to access admin dashboard').should('be.visible');
        cy.get('#email').type('incorrect@gmail.com');
        cy.get('#password').type('wrongpassword');
        cy.get('form').submit();
        cy.contains('Email or password is incorrect').should('be.visible');
        cy.url().should('include', '/login');
    });

    it("Check system behavior when email and password fields are left empty", () => {
        cy.get('form').submit();
        cy.contains('Email or password is incorrect').should('be.visible');
        cy.url().should('include', '/login');
    });
});
