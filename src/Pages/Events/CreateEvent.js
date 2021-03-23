import React, { useState } from 'react';

const CreateEvent = () => {

    /*
     * This component will have four states:
     * "initial", "creating", "successful", "unsuccessful", "failed"
     */
    const [ state, setState ] = useState("initial");
    const [ errorsState, setErrorsState ] = useState([]);

    let titleField;
    let descriptionField;
    let addressField;

    // For the form with images
    const formData = new FormData();

    const attachFile = (evt) => {
        const files = Array.from(evt.target.files);

        files.forEach(
            (file, index) => {
                formData.append(index, file);
            }
        )
    }

    const create = () => {
        const errors = [];

        // 1. Validate the fields
            if( titleField.value.length === 0 ) {
                errors.push("Please enter a title of your event")
            }
            if( descriptionField.value.length === 0 ) {
                errors.push("Please enter a description of your event")
            }
            
            // 1.1 If fields are invalid, setState("validation failed")
            if(errors.length > 0) {
                setState("validation failed");
                setErrorsState(errors);
            }
            // 1.2 If the fields are valid, setState("sending")
            else {
                
                // 2 Show "sending..." and invoke the fetch()
                setState("creating");

                formData.append('name', titleField.value);
                formData.append('description', descriptionField.value);
                formData.append('address', addressField.value);

                fetch(
                    "http://localhost:3500/events/create-event",
                    {
                        method: 'POST',
                        // headers: {"Content-Type": "application/json"},
                        body: formData
                    }
                )
                // 2.1 If the Promise resolves, setState("successful")
                .then(
                    () => {
                        setState("successful")
                        setErrorsState([])
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

    return (
        <div className="container" style={{maxWidth: '600px'}}>
            <h1 className="mt-4 mb-3">Create your event!</h1>


            <div class="mb-3">
                <label for="formFile" class="form-label">Upload event image</label>
                <input 
                onChange={attachFile}
                class="form-control" type="file" id="formFile" />
            </div>

            <div className="mb-3">
                <label for="exampleInputFirstName1" className="form-label">Title</label>
                <input ref={ (element) => titleField = element } type="text" className="form-control" id="exampleInputFirstName1" aria-describedby="firstNameHelp"/>
            </div>

            <div className="mb-3">
                <label for="exampleInputLastName1" className="form-label">Description</label>
                <textarea 
                    type="text" 
                    ref={ (element) => descriptionField = element }
                    className="form-control" 
                    id="exampleInputLastName1" 
                    aria-describedby="lastNameHelp"
                    rows="3">
                </textarea>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Location</label>
                <input 
                    type="text"
                    ref={ (element) => addressField = element }
                    className="form-control" 
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                />
            </div>
                     
            { 
                (state !== "creating" && state !== "successful") && 
                <button onClick={create} type="submit" className="btn btn-primary mb-4">Create Event</button> 
            }

            {
                state === "creating" && <p>creating...</p>
            }

            {
                state === "successful" && <div className="alert alert-success">Successful</div>
            }

            {
                state === "unsuccessful" && <div className="alert alert-danger">Please try again.</div>
            }

            {
                state === "failed" && 
                    <div className="alert alert-danger">
                        <ul>
                        {
                            errorsState.map(
                                (error) => <li>{error}</li>
                            )
                        }
                        </ul>
                    </div>
            }

            
        </div>
    )
}

export default CreateEvent;