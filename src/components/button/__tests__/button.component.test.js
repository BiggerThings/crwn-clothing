import { render, screen } from '@testing-library/react';
import Button, { BUTTON_TYPE_CLASSES } from '../button.component';

describe('Button component', () => {
    it('render the base button by default', () => {
        render(<Button />);

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveStyle('background-color: white');
    })

    it('render the google button when type is google', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />)

        const googleButtonElement = screen.getByRole('button');
        expect(googleButtonElement).toHaveStyle('color: white');
    })

    it('render the inverted button when type is inverted', () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />)

        const invertedButtonElement = screen.getByRole('button');
        expect(invertedButtonElement).toHaveStyle('background-color: black');
    })

    it('should be disabled if isLoading is true', () => {
        render(<Button isLoading={true} />);

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).not.toBeDisabled();
    })
})    