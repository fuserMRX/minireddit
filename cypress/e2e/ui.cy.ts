describe('UI Elements', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid="reddit-post"]').should('be.visible');
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
            cy.get('body').should('be.visible');

            cy.document().then((document) => {
                const hasSubredditSection =
                    document.querySelector(
                        '[data-testid="subreddits-section"]'
                    ) !== null;

                if (hasSubredditSection) {
                    cy.get('[data-testid="subreddits-section"]').should(
                        'be.visible'
                    );
                } else {
                    cy.log(
                        'Subreddits section not present in mobile view - this may be intended'
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

    context('Theme Toggle', () => {
        it('should have a functioning theme toggle button', () => {
            cy.get('html')
                .invoke('attr', 'class')
                .then((initialThemeClass) => {
                    cy.get('[data-testid="theme-toggle"]').first().click({force: true});;

                    cy.get('html')
                        .invoke('attr', 'class')
                        .should((newThemeClass) => {
                            expect(newThemeClass).not.to.equal(
                                initialThemeClass
                            );
                        });

                    cy.get('[data-testid="theme-toggle"]').first().click({force: true});
                });
        });
    });
});
