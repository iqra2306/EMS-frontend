import React from 'react'

const EmployeeHeader = () => {
    return (
        <div className='container-fluid sticky-top'>
            <header>
                <nav className="navbar navbar-drak bg-dark  ">
                    <div className="container-fluid"><a className="navbar-brand" href="http://localhost:3000/employees"><img src="/EMS-logo/cover.png" style={{ width: "89px" }} alt="EMS Logo" /></a>
                        <h5 className="text-center text-light my-3">Employee Management System</h5>
                    </div>
                </nav>
            </header>

        </div>
    )
}

export default EmployeeHeader
