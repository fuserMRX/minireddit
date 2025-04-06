# Cypress Tests for MiniReddit

This directory contains Cypress tests for the MiniReddit application.

## Running Tests

To run the Cypress tests:

```bash
# Run tests in headless mode
npm run cypress:run

# Open Cypress UI for interactive testing
npm run cypress:open
```

## Test Structure

The tests are organized as follows:

### E2E Tests (`e2e/`)

- **api.cy.ts** - Tests client-side API integrations with Reddit, using intercepted API calls
- **ui.cy.ts** - Tests UI components across different screen sizes for responsive design
- **subreddit.cy.ts** - Tests subreddit navigation and content display
- **home.cy.ts** - Tests the home page functionality
- **comments.cy.ts** - Tests comment display and interaction

### Component Tests (`component/`)

- **RedditComment.cy.tsx** - Tests the comment component in isolation
- **Theme.cy.tsx** - Tests the theme toggling functionality

## Fixtures (`fixtures/`)

The tests use fixtures to mock Reddit API responses:

- **reddit-api.fixture.json** - Main Reddit feed response
- **subreddit-api.fixture.json** - Subreddit-specific feed
- **post-comments.fixture.json** - Comments for a specific post
- **posts.json** & **comments.json** - Individual post and comment data

## Key Testing Patterns

### 1. API Interception

```typescript
// Set up the intercept before the app makes the request
cy.intercept('GET', 'https://www.reddit.com/r/*.json', {
  fixture: 'reddit-api.fixture.json'
}).as('subredditRequest');

// Visit the page
cy.visit('/');

// Trigger the API call
cy.get('[data-testid="subreddit-button"]').click();

// Wait for and verify the intercepted request
cy.wait('@subredditRequest').then(interception => {
  expect(interception.response.statusCode).to.equal(200);
  // Further assertions...
});
```

### 2. Responsive UI Testing

```typescript
// Test mobile view
cy.viewport('iphone-x');
cy.get('[data-testid="reddit-post"]').should('be.visible');

// Test tablet view
cy.viewport('ipad-2');
cy.get('[data-testid="reddit-post"]').should('be.visible');

// Test desktop view
cy.viewport(1280, 720);
cy.get('[data-testid="reddit-post"]').should('be.visible');
```

### 3. Component Testing

```typescript
// Mount a component with mock props
cy.mount(<RedditComment comment={mockComment} />);

// Test component functionality
cy.get('[data-testid="comment-author"]').should('contain', mockComment.author);
```

## Best Practices

1. **Use data-testid attributes** - The app uses data-testid attributes for reliable element selection
2. **Mock API responses** - Use fixtures to ensure consistent, controlled test data
3. **Test responsive behavior** - Verify the UI works across different device sizes
4. **Isolate component tests** - Test complex components in isolation using component testing
