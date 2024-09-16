import React, { useRef, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { MONEY_PLEASE } from '../../utils/mutations';
import { Button, TextField } from '@mui/material';

export default function Tip() {
  const tipAmount = useRef();
  const [formSubmit, { data }] = useMutation(MONEY_PLEASE);

  useEffect(() => {
    if (data) document.location.assign(data.moneyPlease.url);
  }, [data]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const tip = tipAmount.current.value;
    try {
      await formSubmit({ variables: { tipAmount: parseFloat(tip) } });
    } catch (e) {
      console.error('Error submitting tip:', e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Button
        type="submit"
        size="large"
        color="primary"
      >
        Buy me a coffee ☕
      </Button>
      <TextField
        id="outlined-number"
        inputRef={tipAmount}
        label="Tip Amount"
        type="number"
        inputProps={{
          min: 0,
        }}
        sx={{
          width: '100px',
          '& input': {
            fontSize: '1.25rem',
            padding: '20px',
          },
        }}
      />

    </form>
  );
}
