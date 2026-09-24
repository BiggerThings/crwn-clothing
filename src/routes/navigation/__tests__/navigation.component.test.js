import { screen, fireEvent } from '@testing-library/react';
import * as userActions from '../../../store/user/user.action';

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

    test('It should render  Sign Out link if there is a current user', () => {
        renderWithProvider(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {},
                },
            },
        });
        const signOutLink = screen.getByText(/SIGN-OUT/);
        expect(signOutLink).toBeInTheDocument();
    });

    test('It should render a cart dropdown if isCartOpen is true', () => {
        renderWithProvider(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: [],
                },
            },
        });
        const cartDropdown = screen.getByText(/GO TO CHECKOUT/);
        expect(cartDropdown).toBeInTheDocument();
    });

    test('It should not render a cart dropdown if isCartOpen is false', () => {
        renderWithProvider(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: [],
                },
            },
        });
        const cartDropdown = screen.queryByText(/GO TO CHECKOUT/);
        expect(cartDropdown).not.toBeInTheDocument();
    });

    test('it should dispatch signOutStart action when Sign Out link is clicked', () => {
        const signOutStartSpy = jest.spyOn(userActions, 'signOutStart');

        renderWithProvider(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {},
                },
            },
        });

        const signOutElement = screen.getByText(/sign-out/i);
        fireEvent.click(signOutElement);

        // Assert that the action creator was executed when the link was clicked
        expect(signOutStartSpy).toHaveBeenCalled();
    });


});
