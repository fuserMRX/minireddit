describe('Reddit API Client-Side Tests', () => {
    context('Subreddit API client calls', () => {
        beforeEach(() => {
            // Set up the intercept before the app makes the request
            cy.intercept('GET', 'https://www.reddit.com/r/*.json', {
                fixture: 'reddit-api.fixture.json'
            }).as('subredditRequest');

            cy.visit('/');

            // Wait for the page to load
            cy.get('[data-testid="reddit-post"]', { timeout: 10000 }).should('exist');
        });

        it('should intercept and mock subreddit API requests', () => {
            // First click on the subreddit button to open the subreddit menu
            cy.get('[data-testid="subreddit-button"]').first().click();

            // Wait for the intercepted request
            cy.wait('@subredditRequest').then(interception => {
                // Verify the interception was successful
                expect(interception.response.statusCode).to.equal(200);

                // Verify the fixture data was used
                expect(interception.response.body).to.have.property('kind', 'Listing');

                // Verify the UI updated with the fixture data
                cy.get('[data-testid="reddit-post"]').should('exist');
                cy.get('[data-testid="reddit-post"]').should('have.length.at.least', 1);
            });
        });
    });
});
