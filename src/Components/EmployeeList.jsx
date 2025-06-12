import React, { useState, useEffect } from 'react';
import { deleteEmployee, getEmployees } from '../Services/employeeService';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]); //State to hold the list of employees (initially empty, to be filled on component mount)
    // Load  data on mount
    const navigator = useNavigate();// Hook to navigate between routes
    useEffect(() => {
        getAll();

    }, []);
    function getAll() {
        getEmployees().then(response => {
            // return a negative number → a comes before b
            // return 0 → keep original order
            // return a positive number → b comes before a
            const sorted = response.data.sort((a, b) => a.id - b.id);
            setEmployees(sorted);
        });
    }
    function addEmployee() {
        navigator('/add-employee')
    }
    function updateEmployee(id) {
        navigator(`/update-employee/${id}`);
    }
    function removeEmployee(id) {
        console.log("deleted Id:" + id);
        deleteEmployee(id).then((response) => {
            getAll();
        }).catch(error => {
            console.log(error);
        })
    }//deletes the employee with corrresponding id
    return (
        <div className='container-fluid  mt-4'>
            <h2 className='text-black text-center mx-3 my-4'>Meet our Employees!!</h2>
            <div id="TableSorterCard" className="card" style={{ borderStyle: "none", borderRadius: "6.5px" }}>
                <div className="card-header py-3" style={{ background: "rgb(23,25,33)", borderWidth: 0 }}>
                    <div className="row table-topper align-items-center">
                        <div className="col-12 col-sm-5 col-md-6 text-start" style={{ padding: "5px 15px" }}>
                            <p className="m-0 fw-bold text-white">List of Employees</p>
                        </div>
                        <div className="col-12 col-sm-7 col-md-6 text-end" style={{ padding: "5px 15px" }}>
                            <button id="zoom_in" className="btn btn-success btn-sm" onClick={addEmployee} style={{ margin: "2px" }}>
                                <i className="bi bi-person-add"></i> Add Employee
                            </button>
                            {/* <button id="zoom_out" className="btn btn-danger btn-sm" style={{ margin: "2px" }}>
                                <i className="bi bi-person-dash"></i> Remove Employee
                            </button> */}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive" style={{ background: "#171921" }}>
                            <table className="table table-striped table tablesorter">
                                <thead className="thead-dark" style={{ background: "#21252F", borderBottomColor: "#21252F" }}>
                                    <tr style={{ background: "#21252F" }}>
                                        <th className="text-center text-black">Employee id</th>
                                        <th className="text-center text-black">First Name</th>
                                        <th className="text-center text-black">Last Name</th>
                                        <th className="text-center text-black">Email</th>
                                        <th className="text-center text-black">Department</th>
                                        <th className="text-center ">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {employees.map((employee) => (
                                        <tr key={employee.id} style={{ background: "#262a38" }}>
                                            <td style={{ color: "black" }}>{employee.id}</td>
                                            <td style={{ color: "black" }}>{employee.firstname}</td>
                                            <td style={{ color: "black" }}>{employee.lastname}</td>
                                            <td style={{ color: "black" }}>{employee.email}</td>
                                            <td style={{ color: "black" }}>{employee.department}</td>
                                            <td>
                                                <button type='button' className='btn btn-outline-info btn-sm mb-3' onClick={() =>
                                                    updateEmployee(employee.id)} >
                                                    Update
                                                </button>
                                                <button type='button' className='btn btn-outline-danger btn-sm mb-3 mx-3' onClick={() =>
                                                    removeEmployee(employee.id)} >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;