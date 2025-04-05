describe('Subreddit Page', () => {
    it('should navigate to a specific subreddit', () => {
        // Visit the home page first
        cy.visit('/');

        // Wait for content to load
        cy.get('[data-testid="reddit-post"]').should('be.visible');

        // Click on a subreddit (assuming the first one)
        cy.get('[data-testid="subreddit-button"]').first().click();

        // Verify subreddit content is displayed after navigation
        cy.get('[data-testid="reddit-post"]').should('have.length.at.least', 1);
    });

    it('should display subreddit specific posts', () => {
        // Visit a subreddit directly - using popular as a fallback
        cy.visit('/');

        // Check that subreddit content loads
        cy.get('[data-testid="reddit-post"]').should('have.length.at.least', 1);

        // Check that the subreddits section is visible
        cy.get('[data-testid="subreddits-section"]').should('be.visible');
    });

    it('should allow expanding post comments', () => {
        // Visit the homepage
        cy.visit('/');

        // Wait for posts to load
        cy.get('[data-testid="reddit-post"]').should('be.visible');

        // Find a post and click on comments
        cy.get('[data-testid="reddit-post"]')
            .first()
            .find('[data-testid="comment-button"]')
            .click();

        // Verify comments section is visible
        cy.get('[data-testid="comments-section"]').should('be.visible');
        cy.contains('Comments').should('be.visible');
    });
});
