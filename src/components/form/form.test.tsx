import { render, screen, fireEvent } from '@testing-library/react';
import OTPForm from './form';

describe('OTPForm Component', () => {
	test('renders the OTP form and input fields correctly', () => {
		render(<OTPForm />);

		const inputs = screen.getAllByRole('textbox');
		expect(inputs).toHaveLength(4);

		const submitButton = screen.getByRole('button', { name: /submit/i });
		expect(submitButton).not.toBeDisabled();
	});

	test('allows user to type in OTP input fields', () => {
		render(<OTPForm />);

		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: '1' } });
		fireEvent.change(inputs[1], { target: { value: '2' } });
		fireEvent.change(inputs[2], { target: { value: '3' } });
		fireEvent.change(inputs[3], { target: { value: '4' } });

		expect(inputs[0]).toHaveValue('1');
		expect(inputs[1]).toHaveValue('2');
		expect(inputs[2]).toHaveValue('3');
		expect(inputs[3]).toHaveValue('4');
	});

	test('enables submit button when correct OTP is entered', () => {
		const url = new URL(window.location.href);
		url.searchParams.set('otp', '1234');
    window.history.pushState({}, '', url);
    
		render(<OTPForm />);

		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: '1' } });
		fireEvent.change(inputs[1], { target: { value: '2' } });
		fireEvent.change(inputs[2], { target: { value: '3' } });
		fireEvent.change(inputs[3], { target: { value: '4' } });

		const submitButton = screen.getByRole('button', { name: /submit/i });
		expect(submitButton).not.toBeDisabled();
	});

	test('prevents non-numeric input', () => {
    render(<OTPForm />);
    
		const inputs = screen.getAllByRole('textbox');
		fireEvent.change(inputs[0], { target: { value: 'a' } });
		expect(inputs[0]).toHaveValue('');
	});
});
