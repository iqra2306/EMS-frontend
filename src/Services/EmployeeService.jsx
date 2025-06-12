import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getEmployees = () => axios.get(API_BASE_URL); // client code for get request

export const addEmployees = (employee) => axios.post(API_BASE_URL, employee);// client code for post request

export const getEmployeebyId = (employeeId) => axios.get(`${API_BASE_URL}/${employeeId}`);// Get employee details by ID (for editing)

export const updateEmployee = (employeeId, employee) => axios.put(`${API_BASE_URL}/${employeeId}`, employee);// Update employee details

export const deleteEmployee = (employeeId) => axios.delete(`${API_BASE_URL}/${employeeId}`);// Delete employee by ID