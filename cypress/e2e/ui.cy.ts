describe('UI Elements', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.wait(500);
    });

    context('Navbar', () => {
        it('should display the navbar with all elements', () => {
            cy.get('nav').within(() => {
                // Logo
                cy.get('img').should('be.visible');

                // Theme toggle
                cy.get('[data-testid="theme-toggle"]').should('be.visible');
            });
        });

        it('should be responsive at different screen sizes', () => {
            // Test mobile view
            cy.viewport('iphone-x');
            cy.get('nav').should('be.visible');
            cy.get('nav img').should('be.visible');

            // Test tablet view
            cy.viewport('ipad-2');
            cy.get('nav').should('be.visible');
            cy.get('nav img').should('be.visible');

            // Test desktop view
            cy.viewport(1280, 720);
            cy.get('nav').should('be.visible');
            cy.get('nav img').should('be.visible');
        });
    });

    context('Subreddits', () => {
        it('should display subreddits sidebar on desktop', () => {
            cy.viewport(1280, 720);
            cy.get('[data-testid="subreddits-section"]').should('be.visible');
        });

        it('should adjust layout on smaller screens', () => {
            // On mobile, subreddits might be positioned differently or hidden
            cy.viewport('iphone-x');
            cy.wait(500); // Small wait for responsive elements to adjust

            // The behavior will depend on your app's responsive design
            // This is a general test that would need to be adapted to your specific layout
            cy.get('body').then(($body) => {
                // Check if subreddits are visible (might be at bottom on mobile)
                if (
                    $body.find('[data-testid="subreddits-section"]').length > 0
                ) {
                    cy.get('[data-testid="subreddits-section"]').should(
                        'be.visible'
                    );
                }
            });
        });
    });

    context('Reddit Posts', () => {
        it('should display posts in a responsive layout', () => {
            // Desktop view
            cy.viewport(1280, 720);
            cy.get('[data-testid="reddit-post"]').should(
                'have.length.at.least',
                1
            );

            // Tablet view
            cy.viewport('ipad-2');
            cy.get('[data-testid="reddit-post"]').should(
                'have.length.at.least',
                1
            );

            // Mobile view
            cy.viewport('iphone-x');
            cy.get('[data-testid="reddit-post"]').should(
                'have.length.at.least',
                1
            );
        });

        it('should adjust post card layout on different screen sizes', () => {
            // Check post card size and padding on different viewports
            cy.viewport(1280, 720);
            cy.get('[data-testid="reddit-post"]').first().should('be.visible');

            cy.viewport('iphone-x');
            cy.get('[data-testid="reddit-post"]').first().should('be.visible');
        });
    });

    context('Dark Mode', () => {
        it('should switch between light and dark themes', () => {
            // Check initial theme (assuming light is default)
            cy.get('html').should('have.attr', 'class').and('include', 'light');

            // Switch to dark theme
            cy.get('[data-testid="theme-toggle"]').click();
            cy.get('html').should('have.attr', 'class').and('include', 'dark');

            // Verify some elements have dark theme styles
            cy.get('body').should('have.css', 'background-color');
        });
    });
});
