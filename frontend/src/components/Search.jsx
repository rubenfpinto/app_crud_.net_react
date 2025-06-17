import { useEffect } from 'react';
import { getEmployees } from '../services/api.js';

export default function Search ({search, setSearch, pagination, setPagination, setEmployees, totalPages, setTotalPages}){
  const searchSubmit = async (e)=> {
    try {
      e.preventDefault();
      setSearch(search.trim());
      const res = await getEmployees(search.trim(), 0, 1, pagination, 10);
      setEmployees(res.data.employees);
      setPagination(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Something went wrong:', err);
    }
  }

  useEffect(() => {
      if(search === ''){
        document.getElementById('searchForm').requestSubmit();
      }
  }, [search]);

  return (
        <form id='searchForm' className="d-flex" role="search" onSubmit={searchSubmit}>
          <input 
            className="form-control me-2" 
            type="search" 
            placeholder="Search" 
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value.trimStart())} 
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      )
}