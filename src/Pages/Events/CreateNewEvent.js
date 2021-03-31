import React from 'react';
import { useForm } from 'react-hook-form';
import InputContainer from '../../Components/inputs/InputContainer';
import CreateForm from '../../Components/Forms/CreateForm';
import Input from '../../Components/inputs/Input';
import FormButton from '../../Components/Forms/FormButton';

const CreateNewEvent = () => {
	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur'
	});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<InputContainer>
			<CreateForm>
				{errors.name && <div className="alert alert-danger">Please enter a title</div>}
				{errors.description && <div className="alert alert-danger">Please enter a description</div>}

				<Input key={1} ref={register({ required: true })} name="name" type="text" label="Title" />

				<Input key={2} ref={register({ required: true })} name="description" type="text" label="Description" />

				<Input key={3} ref={register} name="address" type="text" label="Location" />

				<FormButton>Create</FormButton>
			</CreateForm>
		</InputContainer>
	);
};

export default CreateNewEvent;
