import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectApi } from '../../api/projects';
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, FormControl, Select } from '@mui/material';

const ProjectDetails = () => {
    const { projectId } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [assignedEmployees, setAssignedEmployees] = useState([]);
    const [notAssignedEmployees, setNotAssignedEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectAndEmployees = async () => {
            await fetchProjectDetails(projectId);
            await fetchEmployees(projectId);
        };

        fetchProjectAndEmployees();
    }, [projectId]);

    const fetchProjectDetails = async (projectId) => {
        const { getProjectDetails } = new ProjectApi();
        const res = await getProjectDetails(projectId);
        setProjectDetails(res.data);
    };

    const fetchEmployees = async (projectId) => {
        const { getEmployeesOfProject, getNotAssignedProjectEmployees } = new ProjectApi();
        const assignedRes = await getEmployeesOfProject(projectId);
        const notAssignedRes = await getNotAssignedProjectEmployees(projectId);
        console.log('Assigned Employee API Response:', assignedRes);
        console.log('Not Assigned Employee API Response:', notAssignedRes);
        setAssignedEmployees(Array.isArray(assignedRes.data) ? assignedRes.data : []);
        setNotAssignedEmployees(Array.isArray(notAssignedRes.data.Employees) ? notAssignedRes.data.Employees : []);
    };

    const handleAssignEmployee = () => {
        console.log('Selected Employee:', selectedEmployee);
    };

    const handleDeleteProject = async () => {
        const { deleteProject } = new ProjectApi();
        await deleteProject(projectId);
        navigate('/projects');
    };

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
                <h1>Project Details</h1>
                <Box>
                    <Button
                        type="primary"
                        variant="contained"
                        onClick={() => navigate(`/project/update/${projectId}`)}
                        style={{ marginRight: '8px' }}
                    >
                        Update Project Details
                    </Button>
                    <Button
                        type="primary"
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteProject}
                    >
                        Delete Project
                    </Button>
                </Box>
            </Box>
            {projectDetails && ( // Conditional rendering
                <Box padding="16px">
                    <div>
                        <p>Project Name: {projectDetails.name}</p>
                        <p>Client Company Name: {projectDetails.clientCompanyName}</p>
                        <p>Performer Company Name: {projectDetails.performerCompanyName}</p>
                        <p>Priority: {projectDetails.priority}</p>
                        <p>Start Date: {projectDetails.startProjectDate}</p>
                        <p>Finish Date: {projectDetails.finishProjectDate}</p>
                    </div>
                </Box>
            )}
            <Box padding="16px">
                <h2>Assign Employee to Project</h2>
                <FormControl fullWidth>
                    <Select
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>Select an Employee</em>
                        </MenuItem>
                        {notAssignedEmployees.map((employee) => (
                            <MenuItem key={employee.id} value={employee.id}>
                                {employee.firstName} {employee.lastName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    onClick={handleAssignEmployee}
                    disabled={!selectedEmployee}
                >
                    Add Employee
                </Button>
            </Box>
            <Box padding="16px">
                <h2>Employees Assigned to This Project</h2>
                {assignedEmployees.length === 0 ? (
                    <p>No employees assigned to this project.</p>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {assignedEmployees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </div>
    );
};

export default ProjectDetails;
