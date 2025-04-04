import React from 'react';
import Theme from '../../components/Theme';

describe('Theme component', () => {
    it('renders correctly', () => {
        // Mount the component
        cy.mount(<Theme />);

        // Check if the button exists
        cy.get('[data-testid="theme-toggle"]').should('exist');
    });

    it('toggles theme when clicked', () => {
        // Mock localStorage
        cy.window().then((win) => {
            win.localStorage.setItem('theme', 'light');
        });

        // Mount the component
        cy.mount(<Theme />);

        // Initially should show moon icon (for light mode)
        cy.get('[data-testid="theme-toggle"]').find('svg').should('be.visible');

        // Click the toggle
        cy.get('[data-testid="theme-toggle"]').click();

        // Should now have dark theme in localStorage
        cy.window().then((win) => {
            expect(win.localStorage.getItem('theme')).to.eq('dark');
        });
    });
});
