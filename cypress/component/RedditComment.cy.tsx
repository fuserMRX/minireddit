import React from 'react';
import RedditComment from '../../components/reddit/RedditComment';

describe('RedditComment component', () => {
    let mockComment;

    beforeEach(() => {
        mockComment = {
            kind: 't1',
            data: {
                id: 'comment123',
                author: 'testUser',
                body: 'This is a test comment',
                created_utc: Date.now() / 1000,
                score: 42,
                replies: {
                    data: {
                        children: [
                            {
                                kind: 't1',
                                data: {
                                    id: 'reply123',
                                    author: 'replyUser',
                                    body: 'This is a test reply',
                                    created_utc: Date.now() / 1000,
                                    score: 10,
                                },
                            },
                        ],
                    },
                },
            },
        };
    });

    it('renders comment with author and content', () => {
        // Mount the component with the mock comment
        cy.mount(<RedditComment comment={mockComment} />);

        // Check if the comment element exists
        cy.get('[data-testid="comment"]').should('exist');

        // Check if author is displayed
        cy.get('[data-testid="comment-author"]').should('contain', 'testUser');

        // Check if comment body is displayed
        cy.get('[data-testid="comment-body"]').should(
            'contain',
            'This is a test comment'
        );
    });

    it('shows replies when toggled', () => {
        // Mount the component with the mock comment
        cy.mount(<RedditComment comment={mockComment} />);

        // Check if show replies button exists
        cy.get('[data-testid="show-replies-button"]').should('exist');

        // Click to show replies
        cy.get('[data-testid="show-replies-button"]').click();

        // Check if reply container is visible
        cy.get('[data-testid="replies-container"]').should('be.visible');

        // Check if the reply content is visible
        cy.get('[data-testid="replies-container"]')
            .find('[data-testid="comment-body"]')
            .should('contain', 'This is a test reply');
    });
});
