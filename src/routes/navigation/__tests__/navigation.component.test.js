import { screen } from '@testing-library/react';

import Navigation from '../navigation.component';

import { renderWithProvider } from '../../../utils/test/test.utils';

describe('Navigation component Tests', () => {
    test('It should render  Sign In link if there us no current user', () => {
        renderWithProvider(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: null,
                },
            },
        });
        const signInLink = screen.getByText(/SIGN-IN/);
        expect(signInLink).toBeInTheDocument();
    })
});