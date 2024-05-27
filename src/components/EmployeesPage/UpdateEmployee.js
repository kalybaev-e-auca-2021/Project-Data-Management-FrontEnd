import React, { useEffect, useState } from 'react';
import { EmployeeApi } from '../../api/employees';
import { useParams } from 'react-router-dom';

const UpdateEmployee = () => {
    const { employeeId } = useParams();
    const [employeeData, setEmployeeData] = useState({
        Id: employeeId,
        FirstName: '',
        LastName: '',
        SurName: '',
        Email: ''
    });

    useEffect(() => {
        fetchEmployeeDetails(employeeId);
    }, [employeeId]);

    const fetchEmployeeDetails = async (employeeId) => {
        const { getEmployeeDetails } = new EmployeeApi();
        try {
            const res = await getEmployeeDetails(employeeId);
            setEmployeeData({
                Id: employeeId,
                FirstName: res.data.firstName,
                LastName: res.data.lastName,
                SurName: res.data.surName,
                Email: res.data.email
            });
        } catch (error) {
            console.error("Error fetching employee details:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const fetchUpdateEmployee = async () => {
        const { updateEmployee } = new EmployeeApi();
        try {
            await updateEmployee(employeeData);
            // Optionally, navigate to another page or show a success message
        } catch (error) {
            console.error("Error updating employee:", error);
        }
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
                Last Name:
                <input
                    type="text"
                    name="LastName"
                    value={employeeData.LastName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                SurName:
                <input
                    type="text"
                    name="SurName"
                    value={employeeData.SurName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Email Address:
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
                Update Employee Info
            </button>
        </form>
    );
};

export default UpdateEmployee;
