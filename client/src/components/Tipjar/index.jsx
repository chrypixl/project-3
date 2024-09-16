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
<Button 
  size="large" 
  color="black">
  Buy me a coffee ☕
</Button>

        <TextField
          class="tip-jar"
          id="outlined-number"
          inputRef={tipAmount}
          label=""
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
