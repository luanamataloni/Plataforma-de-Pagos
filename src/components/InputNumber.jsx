import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const InputNumber = ({ value, onChange, label = "Número" }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [tempValue, setTempValue] = useState('');

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue === '') {
            setTempValue('');
            onChange?.(0);
            return;
        }
        const numericValue = Number(inputValue);
        if (!isNaN(numericValue)) {
            setTempValue(inputValue);
            onChange?.(numericValue);
        }
    };

    const handleFocus = (event) => {
        setIsFocused(true);
        setTempValue(value === 0 ? '' : value.toString());
        event.target.select();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (tempValue === '') {
            onChange?.(0);
            setTempValue('');
        }
    };

    const displayValue = isFocused ? tempValue : value;

    return (
        <TextField
            label={label}
            type="number"
            variant="outlined"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            fullWidth
            InputProps={{
                inputProps: { min: 0, step: 1 },
            }}
        />
    );
};

export default InputNumber;
