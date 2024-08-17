import React from 'react';
import { InputLabel, OutlinedInput } from '@mui/material';

function InputField({ value, onChange, placeholder, sx, label, multiline, rows, sxLabel, name, type }) {
    return (
        <div>
            <InputLabel sx={{ mb: 1, ...sxLabel }}>{label}</InputLabel>
            <OutlinedInput
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                multiline={multiline && multiline}
                rows={rows}
                sx={{
                    borderColor: 'gray', // Default border color
                    '&.MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'gray', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'darkgray', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2F4CDD', // Border color on focus
                        },
                    },
                    width: '100%',
                    height: !multiline && "7vh",
                    borderRadius: "5px",
                    // padding:"6px"
                    ...sx // Apply any additional styles passed via sx prop
                }}
            />
        </div>
    );
}

export default InputField;
