import React, { useEffect, useState } from 'react';
import { ProjectApi } from '../../api/projects';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateProject() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [projectData, setProjectData] = useState({
        Id: projectId,
        Name: '',
        ClientCompanyName: '',
        PerformerCompanyName: '',
        Priority: 'High',
        StartProjectDate: '',
        FinishProjectDate: ''
    });

    useEffect(() => {
        fetchProjectDetails(projectId);
    }, [projectId]);

    const fetchProjectDetails = async (projectId) => {
        const { getProjectDetails } = new ProjectApi();
        try {
            const res = await getProjectDetails(projectId);
            setProjectData({
                Id: projectId,
                Name: res.data.name,
                ClientCompanyName: res.data.clientCompanyName,
                PerformerCompanyName: res.data.performerCompanyName,
                Priority: res.data.priority,
                StartProjectDate: res.data.startProjectDate,
                FinishProjectDate: res.data.finishProjectDate
            });
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const fetchUpdateProject = async () => {
        const { updateProject } = new ProjectApi();
        try {
            await updateProject(projectData);
            navigate('/projects'); // Navigate to the main page after successful update
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchUpdateProject();
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Project Name:
                <input
                    type="text"
                    name="Name"
                    value={projectData.Name}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Client Company Name:
                <input
                    type="text"
                    name="ClientCompanyName"
                    value={projectData.ClientCompanyName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Performer Company Name:
                <input
                    type="text"
                    name="PerformerCompanyName"
                    value={projectData.PerformerCompanyName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Priority:
                <select
                    name="Priority"
                    value={projectData.Priority}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Start Date:
                <input
                    type="date"
                    name="StartProjectDate"
                    value={projectData.StartProjectDate}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </label>
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Finish Date:
                <input
                    type="date"
                    name="FinishProjectDate"
                    value={projectData.FinishProjectDate}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '4px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
                />
            </label>
            <button
                type="submit"
                style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Update Project Info
            </button>
        </form>
    );
}

export default UpdateProject;
