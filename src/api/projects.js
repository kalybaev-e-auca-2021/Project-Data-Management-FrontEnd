import { contextApi } from "."

export class ProjectApi {
    async getProjectsList() {
        return await contextApi.get('/Project/getProjectList')
    }

    async getProjectDetails(id) {
        return await contextApi.get(`/Project/getProjectDetails`, {
            params: { id },
        })
    }

    async updateProject(command) {
        return await contextApi.post(`/Project/updateProject`, {
            ...command,
        })
    }
    async createProject(command) {
        return await contextApi.post(`/Project/createProject`, {
            ...command,
        })
    }

    async getEmployeesOfProject(id) {
        return await contextApi.get(`/Project/getProjectEmployees`, {
            params: { id },
        })
    }

    async getNotAssignedProjectEmployees(id) {
        return await contextApi.get(`/Project/getNotAssignedProjectEmployees`, {
            params: { id },
        })
    }

    async deleteProject(id) {
        return await contextApi.delete(`/Project/deleteProject`, {
            params: { id },
        })
    }
    async assignEmployee(idE, idP) {
        return await contextApi.post(`/Project/assignEmployee`, null, {
            params: { idE, idP }
        });
    }
}