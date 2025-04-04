# Cypress Tests for Mini-Reddit

This directory contains end-to-end and component tests for the Mini-Reddit application.

## Structure

- `cypress/e2e/`: Contains end-to-end tests that simulate user interactions with the application
- `cypress/fixtures/`: Contains test data used by tests
- `cypress/support/`: Contains helper functions, custom commands, and global configuration

## Running Tests

### Running in the UI Mode

To open Cypress in UI mode:

```bash
npm run cypress:open
```

This will open the Cypress Test Runner where you can select which tests to run.

### Running in Headless Mode

To run all tests in headless mode:

```bash
npm run cypress:run
```

To run a specific test file:

```bash
npm run cypress:run -- --spec "cypress/e2e/home.cy.ts"
```

## Test Categories

1. **Home Page Tests** (`home.cy.ts`)
   - Basic page loading
   - Subreddit sidebar display
   - Reddit posts display
   - Theme toggle functionality

2. **Subreddit Page Tests** (`subreddit.cy.ts`)
   - Navigation to a specific subreddit
   - Subreddit-specific posts
   - Comment expansion

3. **Comments Tests** (`comments.cy.ts`)
   - Comment display
   - Comment content and author display
   - Top-level comments notification
   - Reply toggle functionality

4. **UI Tests** (`ui.cy.ts`)
   - Responsive design tests across different viewports
   - Layout adjustments for mobile, tablet, and desktop
   - Dark mode functionality

5. **Search Tests** (`search.cy.ts`)
   - Search input functionality
   - Search results display
   - No results handling
   - Search clear functionality

## Adding New Tests

When adding new tests:

1. Create a new file in the `cypress/e2e/` directory
2. Use the existing test patterns as a guide
3. Add data-testid attributes to elements in the application to make them easier to select
4. Run tests frequently to ensure they're working as expected

## Best Practices

- Use data-testid attributes for element selection instead of CSS classes or elements
- Keep tests focused on a single aspect of functionality
- Use beforeEach hooks to set up common test state
- Use fixtures for test data
- Keep tests independent of each other 