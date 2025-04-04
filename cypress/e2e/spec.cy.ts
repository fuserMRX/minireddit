
// Cypress automatically provides the 'describe', 'it', and 'cy' globals
// No need to import them when using the reference directive above

describe('template spec', () => {
    it('passes', () => {
        cy.visit('https://example.cypress.io');
    });
});
