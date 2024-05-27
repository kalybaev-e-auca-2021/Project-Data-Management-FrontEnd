import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EmployeeApi } from '../../api/employees';
import { Button, Box } from '@mui/material';

const EmployeeDetails = () => {
    const { employeeId } = useParams();
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const [employeeProjects, setEmployeeProjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployeeDetails(employeeId);
        fetchEmployeeProjects(employeeId);
    }, [employeeId]);

    const fetchEmployeeDetails = async (employeeId) => {
        const { getEmployeeDetails } = new EmployeeApi();
        try {
            const res = await getEmployeeDetails(employeeId);
            setEmployeeDetails(res.data);
        } catch (error) {
            console.error("Error fetching employee details:", error);
        }
    };

    const fetchEmployeeProjects = async (employeeId) => {
        const { getProjectsOfEmployee } = new EmployeeApi();
        try {
            const res = await getProjectsOfEmployee(employeeId);
            console.log("Fetched employee projects:", res.data);
            setEmployeeProjects(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error fetching employee projects:", error);
            setEmployeeProjects([]);
        }
    };

    const handleDeleteEmployee = async () => {
        const { deleteEmployee } = new EmployeeApi();
        try {
            await deleteEmployee(employeeId);
            navigate('/employees');
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    if (!employeeDetails) {
        return <div>Loading employee details...</div>;
    }

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
                <h1>Employee Details</h1>
                <Box>
                    <Button
                        type="primary"
                        variant="contained"
                        onClick={() => navigate(`/employee/update/${employeeId}`)}
                        style={{ marginRight: '8px' }}
                    >
                        Update Employee Details
                    </Button>
                    <Button
                        type="primary"
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteEmployee}
                    >
                        Delete Employee
                    </Button>
                </Box>
            </Box>
            <Box padding="16px">
                <div>
                    <p>First Name: {employeeDetails.firstName}</p>
                    <p>Last Name: {employeeDetails.lastName}</p>
                    <p>SurName: {employeeDetails.surName}</p>
                    <p>Email: {employeeDetails.email}</p>
                </div>
            </Box>
            <Box padding="16px">
                <h2>Projects Employee is Working On</h2>
                {employeeProjects.length === 0 ? (
                    <p>No projects assigned to this employee.</p>
                ) : (
                    <ul>
                        {employeeProjects.map((project) => (
                            <li key={project.id}>
                                {project.name} (Priority: {project.priority}, Start Date: {project.startProjectDate}, Finish Date: {project.finishProjectDate})
                            </li>
                        ))}
                    </ul>
                )}
            </Box>
        </div>
    );
};

export default EmployeeDetails;
