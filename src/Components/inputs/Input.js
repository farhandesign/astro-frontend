import React from 'react';
import { TextField } from '@material-ui/core';

const ForwardInput = (props, ref) => {
	return <TextField margin="normal" inputRef={ref} fullWidth {...props} />;
};

const Input = React.forwardRef(ForwardInput);

export default Input;
