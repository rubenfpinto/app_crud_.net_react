import { useState } from 'react';
import { getEmployees } from '../services/api.js';

export default function Search ({search, setSearch, pagination, setPagination, setEmployees}){
  const searchSubmit = (e)=> {
    try {
      e.preventDefault();
      const res = getEmployees(search, '', '', 0, '', pagination, 10);
      setEmployees(res.data.employees);
      setPagination(res.data.page);
    } catch (err) {
      console.error('Something went wrong:', err);
    }
  }

  return (
        <form className="d-flex" role="search" onSubmit={searchSubmit}>
          <input 
            className="form-control me-2" 
            type="search" 
            placeholder="Search" 
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)} 
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      )
}