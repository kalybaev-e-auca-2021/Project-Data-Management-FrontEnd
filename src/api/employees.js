import { contextApi } from "."




export class EmployeeApi {
    async getEmployeesList() {
        return await contextApi.get(`/Project/getEmployeeList`)
    }
    async getEmployeeDetails(id) {
        return await contextApi.get(`/Project/getEmployeeDetails`, {
            params: { id },
        })
    }
    async updateEmployee(command) {
        return await contextApi.post(`/Project/updateEmployee`, {
            ...command,
        })
    }
    async createEmployee(command) {
        return await contextApi.post(`/Project/createEmployee`, {
            ...command,
        })
    }
    async getProjectsOfEmployee(id) {
        return await contextApi.get(`/Project/getEmployeeProjects`, {
            params: { id },
        })
    }
    async deleteEmployee(id) {
        return await contextApi.delete(`/Project/deleteEmployee`, {
            params: { id },
        })
    }
}