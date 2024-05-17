import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import Employees from './components/EmployeesPage/Employees';
import Projects from './components/ProjectsPage/Projects';
import AssignEmployee from './components/AssignEmployee';
import ProjectDetails from './components/ProjectsPage/ProjectDetails';
import EmployeeDetails from './components/EmployeesPage/EmployeeDetails';
import UpdateProject from './components/ProjectsPage/UpdateProject';
import UpdateEmployee from './components/EmployeesPage/UpdateEmployee';
import CreateEmployee from './components/EmployeesPage/CreateEmployee';
import CreateProject from './components/ProjectsPage/CreateProject';

const { Header, Content } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/employees">Employees</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/projects">Projects</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/assign-employee">Assign Employee</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flex: 1,
            }}
          >
            <Routes>
              <Route path="/employees" element={<Employees />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/assign-employee" element={<AssignEmployee />} />
              <Route path="/project/update/:projectId" element={<UpdateProject />} />
              <Route path="/employee/update/:employeeId" element={<UpdateEmployee />} />
              <Route path="/project/create" element={<CreateProject />} />
              <Route path="/employee/create" element={<CreateEmployee />} />
              <Route path="/project/:projectId" element={<ProjectDetails />} /> {/* Adjusted to match parameter */}
              <Route path="/employee/:employeeId" element={<EmployeeDetails />} /> {/* Adjusted to match parameter */}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
