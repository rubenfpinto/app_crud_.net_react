import axios from 'axios';
import { toast } from 'react-toastify'

// Employees
const API_URL = 'http://localhost:5204/api/employee';

// export const getAll = () => axios.get(API_URL);
export const getEmployees = (search = '', name = '', birthdate ='', years_of_experience = 0, experienced_tech = '', page = 1, pageSize = 10) => {
  try{
    const params = { search, name, birthdate, years_of_experience, experienced_tech, page, pageSize };
    return axios.get(API_URL, { params });
  }
  catch (error){
    toast.error('Something went wrong!');
  }
}

export const create = (data) => axios.post(API_URL, data);
export const update = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const remove = (id) => axios.delete(`${API_URL}/${id}`);

