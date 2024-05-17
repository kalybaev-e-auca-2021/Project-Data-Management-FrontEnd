import React, { useState } from 'react';
import { EmployeeApi } from '../../api/employees';

function CreateEmployee() {

    const [employeeData, setemployeeData] = useState({
        FirstName: '',
        LastName: '',
        SurName: '',
        Email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setemployeeData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const fetchUpdateEmployee = async () => {
        const { createEmployee } = new EmployeeApi();
        await createEmployee(employeeData);
        setemployeeData({
            FirstName: '',
            LastName: '',
            SurName: '',
            Email: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchUpdateEmployee();
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                First Name:
                <input
                    type="text"
                    name="FirstName"
                    value={employeeData.FirstName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Last Name
                <input
                    type="text"
                    name="LastName"
                    value={employeeData.LastName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                SurName
                <input
                    type="text"
                    name="SurName"
                    value={employeeData.SurName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Email Address
                <input
                    type="text"
                    name="Email"
                    value={employeeData.Email}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </label>
            <button
                type="submit"
                style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Create
            </button>
        </form>
    );
}

export default CreateEmployee;
