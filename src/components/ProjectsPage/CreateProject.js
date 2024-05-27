import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectApi } from '../../api/projects';

const CreateProject = () => {
    const navigate = useNavigate(); // Create a navigate function

    const [projectData, setProjectData] = useState({
        Name: '',
        ClientCompanyName: '',
        PerformerCompanyName: '',
        Priority: 'High',
        StartProjectDate: '',
        FinishProjectDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const fetchCreateProject = async () => {
        const { createProject } = new ProjectApi();
        try {
            await createProject(projectData);
            setProjectData({
                Name: '',
                ClientCompanyName: '',
                PerformerCompanyName: '',
                Priority: 'High',
                StartProjectDate: '',
                FinishProjectDate: '',
            });
            navigate('/projects'); // Redirect to the main page after creating the project
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCreateProject();
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
                Create
            </button>
        </form>
    );
};

export default CreateProject;
