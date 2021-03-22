import React, { useState } from 'react';

const validateEmail = (email) => {
    // eslint-disable-next-line
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/;
    return re.test(password);
}

const SignupPage = () => {
    /*
     * This component will have four states:
     * "initial", "sending", "successful", "unsuccessful"
     */
    const [ state, setState ] = useState("initial");

    let firstNameField;
    let lastNameField;
    let emailField;
    let passwordField;

    const register = () => {

        const errors = [];

        // 1. Validate the fields
            if( firstNameField.value.length === 0 ) {
                errors.push("Please enter your first name")
            }
            if( lastNameField.value.length === 0 ) {
                errors.push("Please enter your last name")
            }
            if( validateEmail(emailField.value) === false ) {
                errors.push("Please enter a valid email address")
            }
            if( validatePassword(passwordField.value) === false ) {
                errors.push("Please enter a password between 8 to 16 characters")
            }
            
            // 1.1 If fields are invalid, setState("unsuccessful")
            if(errors.length > 0) {
                setState("unsuccessful")
            }
            // 1.2 If the fields are valid, setState("sending")
            else {
                
                // 2 Show "sending..." and invoke the fetch()
                setState("sending");

                
                fetch(
                    "http://localhost:3500/users/signup",
                    {
                        method: 'POST',
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(
                            {
                                firstName: firstNameField.value,
                                lastName: lastNameField.value,
                                email: emailField.value,
                                password: passwordField.value
                            }
                        )
                    }
                )
                // 2.1 If the Promise resolves, setState("successful")
                .then(
                    () => {
                        setState("successful")
                    }
                )
                // 2.1 Else if the Promise rejects, setState("unsuccessful")
                .catch(
                    () => {
                        setState("unsuccessful")
                    }
                )
            }
    }

    return(
        <div className="container" style={{maxWidth: '600px'}}>
            <h1 className="mt-4 mb-3">Registration</h1>
            <div className="mb-3">
                <label for="exampleInputFirstName1" className="form-label">First name</label>
                <input ref={ (element) => firstNameField = element } type="text" className="form-control" id="exampleInputFirstName1" aria-describedby="firstNameHelp"/>
            </div>
            <div className="mb-3">
                <label for="exampleInputLastName1" className="form-label">Last name</label>
                <input type="text" 
                ref={ (element) => lastNameField = element }
                className="form-control" 
                id="exampleInputLastName1" 
                aria-describedby="lastNameHelp"/>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input 
                    type="email"
                    ref={ (element) => emailField = element }
                    className="form-control" 
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input 
                    type="password" 
                    ref={ (element) => passwordField = element }
                    className="form-control" 
                    id="exampleInputPassword1" 
                />
            </div>
                     
            { 
                (state !== "sending" && state !== "successful") && 
                <button onClick={register} type="submit" className="btn btn-primary">Submit</button> 
            }

            {
                state === "sending" && <p>sending...</p>
            }

            {
                state === "successful" && <div className="alert alert-success">Successful</div>
            }

            {
                state === "unsuccessful" && <div className="alert alert-danger">Please try again.</div>
            }

            
        </div>
    )
};



export default SignupPage;
