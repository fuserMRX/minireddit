describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should load the home page successfully', () => {
        cy.get('nav').should('be.visible');
        cy.contains('h1', 'Popular Posts').should('be.visible');
    });

    it('should display the subreddits sidebar', () => {
        cy.get('[data-testid="subreddits-section"]').should('be.visible');
        cy.contains('Popular Subreddits').should('be.visible');
    });

    it('should display Reddit posts', () => {
        cy.get('[data-testid="reddit-post"]').should('have.length.at.least', 1);
    });

    it('should have working theme toggle', () => {
        // Get initial theme state
        cy.get('html')
            .invoke('attr', 'class')
            .then((initialClass) => {
                const initialIsDark = initialClass?.includes('dark');

                // Click theme toggle
                cy.get('[data-testid="theme-toggle"]').click();

                // Verify theme changed to the opposite
                if (initialIsDark) {
                    cy.get('html')
                        .should('have.attr', 'class')
                        .and('not.include', 'dark');
                } else {
                    cy.get('html')
                        .should('have.attr', 'class')
                        .and('include', 'dark');
                }

                // Toggle back
                cy.get('[data-testid="theme-toggle"]').click();

                // Verify returned to initial state
                if (initialIsDark) {
                    cy.get('html')
                        .should('have.attr', 'class')
                        .and('include', 'dark');
                } else {
                    cy.get('html')
                        .should('have.attr', 'class')
                        .and('not.include', 'dark');
                }
            });
    });

    it('should navigate to a subreddit when clicked', () => {
        cy.get('[data-testid="subreddit-button"]').first().click();
        cy.url().should('include', '/r/');
    });
});
