describe('Subreddit Page', () => {
    it('should navigate to a specific subreddit', () => {
        // Visit the home page first
        cy.visit('/');

        // Click on a subreddit (assuming the first one)
        cy.get('[data-testid="subreddit-button"]').first().click();

        // Verify URL contains /r/
        cy.url().should('include', '/r/');

        // Verify subreddit content is displayed
        cy.get('[data-testid="reddit-post"]').should('have.length.at.least', 1);
    });

    it('should display subreddit specific posts', () => {
        // Visit a known subreddit directly
        cy.visit('/r/programming');

        // Check that the subreddit name is displayed
        cy.contains('r/programming').should('be.visible');

        // Verify posts are loaded
        cy.get('[data-testid="reddit-post"]').should('have.length.at.least', 1);
    });

    it('should allow expanding post comments', () => {
        // Visit a known subreddit
        cy.visit('/r/programming');

        // Find a post and click on comments
        cy.get('[data-testid="reddit-post"]')
            .first()
            .within(() => {
                cy.get('[data-testid="comment-button"]').click();
            });

        // Verify comments section is visible
        cy.get('[data-testid="comments-section"]').should('be.visible');
        cy.contains('Comments').should('be.visible');
    });
});
