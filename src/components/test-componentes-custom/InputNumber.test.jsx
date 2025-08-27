import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputNumber from '../InputNumber.jsx';

describe('InputNumber', () => {
    test('renderiza el input con valor inicial', () => {
        render(<InputNumber value={5} onChange={() => {}} />);
        const input = screen.getByLabelText(/Número/i);
        expect(input.value).toBe('5');
    });

    test('cambia el valor y llama a onChange', () => {
        const handleChange = jest.fn();
        render(<InputNumber value={0} onChange={handleChange} />);
        const input = screen.getByLabelText(/Número/i);

        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: '10' } });
        expect(handleChange).toHaveBeenCalledWith(10);

        fireEvent.change(input, { target: { value: '' } });
        expect(handleChange).toHaveBeenCalledWith(0);
    });

    test('al perder foco con input vacío, mantiene 0', () => {
        const handleChange = jest.fn();
        render(<InputNumber value={0} onChange={handleChange} />);
        const input = screen.getByLabelText(/Número/i);

        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.blur(input);

        expect(handleChange).toHaveBeenCalledWith(0);
    });
});
