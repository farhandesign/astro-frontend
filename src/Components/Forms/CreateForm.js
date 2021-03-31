import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	roote: {
		width: '100%',
		marginTop: theme.spacing(1)
	}
}));

const CreateForm = ({ children, ...props }) => {
	const styles = useStyles();

	return (
		<form className={styles.root} noValidate {...props}>
			{children}
		</form>
	);
};

export default CreateForm;
