import React from 'react'
import { TextField } from '@mui/material';

export default function Input(props) {

    const { name, type, label, value,error=null, onChange } = props;
    return (
        <TextField
            variant="standard"
            type={type}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
        />
    )
}