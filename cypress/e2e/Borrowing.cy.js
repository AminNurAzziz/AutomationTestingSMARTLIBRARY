describe('Borrow Book Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Searches and Borrows a Book Successfully', () => {
    // Click on the "Search Book" button
    cy.contains('Search Book').click();

    // Wait for the search modal to appear
    cy.get('#search-book-modal-title').should('be.visible');

    // Type the book code or title into the search input
    cy.get('input[name="Book Code or Title"]').type('123456');

    // Click on the "Find" button to search for the book
    cy.contains('Find').click();

    // Wait for the book detail modal to appear
    cy.get('h6').should('contain', 'Book Detail');

    // Click on the "Pinjam" button to borrow the book
    cy.contains('Pinjam').click();

    // Wait for the borrowing process to complete
    cy.get('button').contains('Pinjam Buku').should('be.enabled').click();

    // Wait for the borrowing receipt page to appear
    cy.url().should('include', '/borrow-receipt');
    cy.contains('Borrowing Successful').should('be.visible');
  });

  // Add more test cases as needed...
});
