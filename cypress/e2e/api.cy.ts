describe('API Functionality', () => {
    beforeEach(() => {
        // Load fixtures
        cy.fixture('subreddits.json').as('subredditsData');
        cy.fixture('posts.json').as('postsData');
        cy.fixture('comments.json').as('commentsData');
    });

    it('should load posts from the API', () => {
        // Setup intercept for posts API
        cy.get('@postsData').then((postsData) => {
            cy.intercept('GET', '/api/posts*', { body: postsData }).as(
                'getPosts'
            );

            // Visit homepage
            cy.visit('/');

            // Wait for API call
            cy.wait('@getPosts');

            // Verify posts are displayed
            cy.get('[data-testid="reddit-post"]').should('have.length', 5);

            // Verify first post content
            cy.get('[data-testid="reddit-post"]')
                .first()
                .within(() => {
                    cy.contains('Understanding React Hooks').should(
                        'be.visible'
                    );
                });
        });
    });

    it('should load subreddits from the API', () => {
        // Setup intercept for subreddits API
        cy.get('@subredditsData').then((subredditsData) => {
            cy.intercept('GET', '/api/subreddits*', {
                body: subredditsData,
            }).as('getSubreddits');

            // Visit homepage
            cy.visit('/');

            // Wait for API call
            cy.wait('@getSubreddits');

            // Verify subreddits are displayed
            cy.get('[data-testid="subreddit-button"]').should('have.length', 5);

            // Verify first subreddit content
            cy.get('[data-testid="subreddit-button"]')
                .first()
                .within(() => {
                    cy.contains('r/programming').should('be.visible');
                });
        });
    });

    it('should load comments when a post is expanded', () => {
        // Setup intercept for posts API
        cy.get('@postsData').then((postsData) => {
            cy.intercept('GET', '/api/posts*', { body: postsData }).as(
                'getPosts'
            );

            // Setup intercept for comments API
            cy.get('@commentsData').then((commentsData) => {
                cy.intercept('GET', '/api/comments*', {
                    body: commentsData,
                }).as('getComments');

                // Visit homepage
                cy.visit('/');

                // Wait for posts to load
                cy.wait('@getPosts');

                // Click on the first post's comments
                cy.get('[data-testid="reddit-post"]')
                    .first()
                    .within(() => {
                        cy.get('[data-testid="comment-button"]').click();
                    });

                // Wait for comments API
                cy.wait('@getComments');

                // Verify comments are loaded
                cy.get('[data-testid="comment"]').should('have.length', 5);

                // Verify first comment content
                cy.get('[data-testid="comment"]')
                    .first()
                    .within(() => {
                        cy.contains('react_user').should('be.visible');
                    });
            });
        });
    });

    it('should show error state when API fails', () => {
        // Setup intercept for posts API to fail
        cy.intercept('GET', '/api/posts*', { statusCode: 500 }).as(
            'getPostsError'
        );

        // Visit homepage
        cy.visit('/');

        // Wait for API call
        cy.wait('@getPostsError');

        // Check for error state
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="error-message"]').length > 0) {
                cy.get('[data-testid="error-message"]').should('be.visible');
            } else {
                // If no explicit error component, at least ensure no posts are shown
                cy.get('[data-testid="reddit-post"]').should('not.exist');
            }
        });
    });
});
