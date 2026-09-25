import {
    categoriesReducer,
    CATEGORIES_INITIAL_STATE,
} from '../category.reducer';

import {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from '../category.action';

describe('Categories Reducer tests', () => {
    test('fetchCategoriesStart', () => {
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: true,
        };

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart())).toEqual(expectedState);
    })

    test('fetchCategoriesSuccess', () => {
        const mockData = [
            {
                title: 'mens',
                imageUrl: 'mens.jpg',
                items: [
                    {
                        id: 1,
                        name: 'T-shirt',
                        price: 25
                    },
                    {
                        id: 2,
                        name: 'Jeans',
                        price: 50
                    }
                ]
            },
            {
                title: 'womens',
                imageUrl: 'womens.jpg',
                items: [
                    {
                        id: 1,
                        name: 'Skirt',
                        price: 35
                    },
                    {
                        id: 2,
                        name: 'Blouse',
                        price: 250
                    }
                ]
            }
        ]

        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            categories: mockData,
            isLoading: false,
        };

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockData))).toEqual(expectedState);
    })

    test('fetchCategoriesFailed', () => {
        const mockError = new Error('Failed to fetch categories');

        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            error: mockError
        };

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFailed(mockError))).toEqual(expectedState);
    })
})