
describe('Comments Functionality', () => {
  beforeEach(() => {
    // Visit the home page
    cy.visit('/');

    // Click on the first post's comments
    cy.get('[data-testid="reddit-post"]').first().within(() => {
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
    cy.get('[data-testid="comment"]').first().within(() => {
      // Check for author name
      cy.get('[data-testid="comment-author"]').should('be.visible');

      // Check for comment content
      cy.get('[data-testid="comment-body"]').should('be.visible');
    });
  });

  it('should show a notification about top-level comments when applicable', () => {
    // This test is conditional as the notification only appears when there are more comments than shown
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="comments-notification"]').length > 0) {
        cy.get('[data-testid="comments-notification"]').should('be.visible');
        cy.get('[data-testid="comments-notification"]').should('contain', 'top-level comments');
      }
    });
  });

  it('should toggle replies when a comment has them', () => {
    cy.get('[data-testid="comment"]').then(($comments) => {
      // Find a comment with replies
      const commentWithReplies = [...$comments].find(comment =>
        Cypress.$(comment).find('[data-testid="show-replies-button"]').length > 0
      );

      if (commentWithReplies) {
        cy.wrap(commentWithReplies).within(() => {
          // Click to show replies
          cy.get('[data-testid="show-replies-button"]').click();

          // Verify replies are visible
          cy.get('[data-testid="replies-container"]').should('be.visible');

          // Click again to hide replies
          cy.get('[data-testid="show-replies-button"]').click();

          // Verify replies are hidden
          cy.get('[data-testid="replies-container"]').should('not.be.visible');
        });
      }
    });
  });
});