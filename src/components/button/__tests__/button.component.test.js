import { render, screen } from '@testing-library/react';
import Button from '../button.component';

describe('Button component', () => {
    it('render the base button by default', () => {
        render(<Button />);

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveStyle('background-color: white');
    })

})    