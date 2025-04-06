describe('Comments Functionality', () => {
    beforeEach(() => {
        // Visit the home page
        cy.visit('/');
        cy.wait(1000);

        // Click on the first post's comments
        cy.get('[data-testid="reddit-post"]')
            .first()
            .within(() => {
                cy.get('[data-testid="comment-button"]').click();
            });

        // Ensure comments section is loaded
        cy.contains('Comments').should('be.visible');
    });

    it('should display comments when a post is expanded', () => {
        // Verify comments are displayed
        cy.get('[data-testid="comment"]').should('have.length.at.least', 1);
    });

    it('should show the comment author and content', () => {
        cy.get('[data-testid="comment"]')
            .first()
            .within(() => {
                // Check for author name
                cy.get('[data-testid="comment-author"]').should('be.visible');

                // Check for comment content
                cy.get('[data-testid="comment-body"]').should('be.visible');
            });
    });

    it('should show a notification about top-level comments when applicable', () => {
        // This test is conditional as the notification only appears when there are more comments than shown
        // Check if notification exists
        cy.document().then((document) => {
            const hasNotification =
                document.querySelector(
                    '[data-testid="comments-notification"]'
                ) !== null;

            if (hasNotification) {
                cy.get('[data-testid="comments-notification"]').should(
                    'be.visible'
                );
                cy.get('[data-testid="comments-notification"]').should(
                    'contain',
                    'top-level comments'
                );
            } else {
                // Optional: Add a log message if notification isn't present
                cy.log(
                    'No comments notification found - this is valid when all comments are shown'
                );
            }
        });
    });

    it('should toggle replies when a comment has them', () => {
        // Find comments with reply buttons using cypress commands
        cy.get('[data-testid="comment"]')
            .find('[data-testid="show-replies-button"]')
            .first()
            .closest('[data-testid="comment"]')
            .as('commentWithReplies');

        // Check if we found a comment with replies
        cy.get('@commentWithReplies').then((comment) => {
            // If comment with replies exists, test the toggle functionality
            if (comment.length) {
                // Initial state - replies should be visible
                cy.get('@commentWithReplies')
                    .find('[data-testid="replies-container"]')
                    .should('be.visible');

                // Click to hide replies
                cy.get('@commentWithReplies')
                    .find('[data-testid="show-replies-button"]')
                    .first()
                    .click();

                // Replies should now be hidden or removed
                cy.get('@commentWithReplies')
                    .find('[data-testid="replies-container"]')
                    .should('not.exist');
            } else {
                // If no comments with replies found, log it
                cy.log('No comments with replies found in this test run');
            }
        });
    });
});
