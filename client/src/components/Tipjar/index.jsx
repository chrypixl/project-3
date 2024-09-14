import React, {useState, useEffect, useRef} from 'react';
import {useMutation} from '@apollo/client';
import {MONEY_PLEASE} from '../../utils/mutations';
import {Button, TextField} from '@mui/material';

export default function Tip() {
    const tipAmount = useRef();
    const [formSubmit, {data}] = useMutation(MONEY_PLEASE);

    useEffect(() => {
        if (data) document.location.assign(data.moneyPlease.url)
    }, [data]);
    const handleFormSubmit = async(event) => {
        event.preventDefault();
        const tip = tipAmount.current.value;
        console.log(tipAmount.current);
        await formSubmit({variables: {
            tipAmount: parseFloat(tip),
        }})
    }

    return (
        <form onSubmit={(handleFormSubmit)}>
<Button size="small">Buy me a coffee ☕</Button>

        <TextField
          id="outlined-number"
          inputRef={tipAmount}
          label="Number"
          type="number"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          />
</form>
    );
};
