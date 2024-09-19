import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    test('renders OTPForm component with input fields and submit button', () => {
        render(<App />);

        const inputs = screen.getAllByRole('textbox');
        expect(inputs).toHaveLength(4); 

        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeInTheDocument();
    })
})