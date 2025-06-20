import axios from 'axios';
import { toast } from 'react-toastify'

// Employees
const API_URL = 'https://localhost:7168/api/employee';

// export const getAll = () => axios.get(API_URL);
export const getEmployees = (search = '', orderByType = 0, orderBy =1, page = 1, pageSize = 10) => {
  try{
    const params = { search, orderByType, orderBy, page, pageSize };
    return axios.get(`${API_URL}/getAll`, { params });
  }
  catch (error){
    toast.error('Something went wrong!');
  }
}

export const create = (data) => axios.post(`${API_URL}/create`, data);
export const update = (data) => axios.put(`${API_URL}/update/`, data);
export const remove = (id) => axios.delete(`${API_URL}/delete/${id}`);

