import React, { useEffect, useState } from 'react';
import { addEmployees, getEmployeebyId, updateEmployee } from '../Services/employeeService';
import { useNavigate, useParams } from 'react-router-dom';

function NewEmployee() {

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [department, setdepartment] = useState('');

    const { id } = useParams(); // Extracts 'id' from route params like /employee/:id
    // State to track validation error messages for each input field
    const [error, seterror] = useState({
        firstname: '',   // Error message for the First Name input
        lastname: '',    // Error message for the Last Name input
        email: '',       // Error message for the Email input
        department: ''   // Error message for the Department input
    });

    useEffect(() => {
        if (id) {
            // If id is present, fetch the employee data from the API
            getEmployeebyId(id)
                .then((response) => {
                    setfirstname(response.data.firstname);
                    setlastname(response.data.lastname);
                    setemail(response.data.email);
                    setdepartment(response.data.department);
                })
                .catch((error) => {
                    console.error("Failed to fetch employee for update:", error);
                });
        }
    }, [id]);

    const navigator = useNavigate();
    // Handles input change for the First Name field and updates the state
    const handleFirstName = (e) => setfirstname(e.target.value);

    // Updates the 'lastname' state when the Last Name input changes
    const handleLastName = (e) => setlastname(e.target.value);

    // Updates the 'email' state when the Email input changes
    const handleEmail = (e) => setemail(e.target.value);

    // Updates the 'department' state when the Department input changes
    const handleDepartment = (e) => setdepartment(e.target.value);

    // Handles the Save button click event (add or update employee)
    const handleSave = (e) => {
        e.preventDefault(); // Prevent default form behavior

        if (validate()) {
            const employee = { firstname, lastname, email, department }; // Construct employee object
            console.log("Employee Data:", employee);

            if (id) {
                // Update existing employee
                updateEmployee(id, employee)
                    .then((response) => {
                        console.log("Employee updated:", response.data);
                        navigator('/employees');
                    })
                    .catch(error => {
                        console.error("Failed to update employee:", error);
                    });
            } else {
                // Add new employee
                addEmployees(employee)
                    .then((response) => {
                        console.log("Employee added:", response.data);
                        navigator('/employees');
                    })
                    .catch(error => {
                        console.error("Failed to add employee:", error);
                    });
            }
        }
    };
    // Function to validate form fields before submission
    function validate() {
        let valid = true;
        const errorcopy = { ...error }// Make a copy of the error state to update validation messages
        if (firstname.trim()) {
            errorcopy.firstname = '';
        } else {
            errorcopy.firstname = 'Required Field'
            valid = false;// Set valid to false if the First Name is empty
        }
        if (lastname.trim()) {
            errorcopy.lastname = '';
        } else {
            errorcopy.lastname = 'Required Field'
            valid = false;// Set valid to false if the Last Name is empty
        }
        if (email.trim() && email.includes('@')) {
            errorcopy.email = '';
        } else {
            errorcopy.email = 'Invalid Email'
            valid = false;// Set valid to false if the Email is empty or does not contain '@'
        }

        if (department.trim()) {
            errorcopy.department = '';
        } else {
            errorcopy.department = 'Required Field'
            valid = false;// Set valid to false if the Department is empty
        }
        seterror(errorcopy);
        return valid;
    }
    function pageTitle() {
        if (id) {
            return <h2 className='text-center my-4'>Update Employee</h2>;
        } else {
            return <h2 className='text-center my-4'>Add Employee</h2>;
        }
    }

    return (
        <div className="body" style={{ paddingTop: '150px' }}>
            <div className="border rounded shadow login-center" >
                {
                    pageTitle()
                }
                <form style={{ paddingTop: '32px' }}>
                    <div className="text-center form-group mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-file-earmark-person-fill" viewBox="0 0 16 16">
                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0m2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755" />
                        </svg>
                    </div>

                    <div className="form-group mb-3 text-center">
                        <div className="d-flex justify-content-center">
                            <input
                                className={`form-control ${error.firstname ? 'is-invalid' : ''}`}
                                type="text"
                                style={{ width: '200px' }}
                                placeholder="First Name"
                                value={firstname}
                                onChange={handleFirstName}
                            />
                        </div>
                        {error.firstname && (
                            <div className="invalid-feedback d-block">{error.firstname}</div>
                        )}
                    </div>

                    <div className="form-group mb-3 text-center">
                        <div className="d-flex justify-content-center">
                            <input
                                className={`form-control ${error.lastname ? 'is-invalid' : ''}`}
                                type="text"
                                style={{ width: '200px' }}
                                placeholder="Last Name"
                                value={lastname}
                                onChange={handleLastName}
                            />
                        </div>
                        {error.lastname && (
                            <div className="invalid-feedback d-block">{error.lastname}</div>
                        )}
                    </div>

                    <div className="form-group mb-3 text-center">
                        <div className="d-flex justify-content-center">
                            <input
                                className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                type="email"
                                style={{ width: '200px' }}
                                placeholder="Email"
                                value={email}
                                onChange={handleEmail}
                            />
                        </div>
                        {error.email && (
                            <div className="invalid-feedback d-block">{error.email}</div>
                        )}
                    </div>
                    <div className="form-group mb-3 text-center">
                        <div className="d-flex justify-content-center">
                            <input
                                className={`form-control ${error.department ? 'is-invalid' : ''}`}
                                type="text"
                                style={{ width: '200px' }}
                                placeholder="Department"
                                value={department}
                                onChange={handleDepartment}
                            />
                        </div>
                        {error.department && (
                            <div className="invalid-feedback d-block">{error.department}</div>
                        )}
                    </div>

                    <div className="d-flex justify-content-center form-group mb-3">
                        <button
                            className="btn btn-dark"
                            style={{ width: '200px' }}
                            type="button"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default NewEmployee;