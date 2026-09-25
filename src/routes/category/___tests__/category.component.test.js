import { screen } from '@testing-library/react';
import Category from '../category.component';
import { renderWithProvider } from '../../../utils/test/test.utils';

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: () => ({
        category: 'mens'
    }),
}));

describe('Category component Tests', () => {
    test('It should render a spinner when isLoading is true', () => {
        renderWithProvider(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    categories: [],
                },
            },
        });

        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
    });

    test('It should not render a spinner when isLoading is false', () => {
        renderWithProvider(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categories: [],
                },
            },
        });

        const spinner = screen.queryByTestId('spinner');
        expect(spinner).not.toBeInTheDocument();
    });


})