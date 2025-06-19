import { useEffect } from 'react';
import { getEmployees } from '../services/api.js';

export default function Search ({search, setSearch, pagination, setPagination, setEmployees, setTotalPages, navigate, searchParams, updateSearchParam, jumpToPage, setTotalEmployees, filters, setLoading}){
  const searchSubmit = async (e)=> {
    try {
      e.preventDefault();
      setSearch(search.trim());
      if(search.trim() != ''){
        searchParams.set("page", 1);
        searchParams.set("search", search.trim());
        navigate(`?${searchParams.toString()}`);
      }
      setLoading(true);
      const res = await getEmployees(search.trim(), filters.orderByType, filters.orderBy, 1, 10);
      setEmployees(res.data.employees);
      setPagination(res.data.page);
      setTotalPages(res.data.totalPages);
      setTotalEmployees(res.data.employeesTotal);
      setLoading(false);
    } catch (err) {
      console.error('Something went wrong:', err);
    }
  }

  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if(search === '' && currentSearch !== ''){
      document.getElementById('searchForm').requestSubmit();
      searchParams.delete("search");
      jumpToPage(pagination);
      navigate(`?${searchParams.toString()}`);
    }else{
      updateSearchParam('search', search);
      navigate(`?${searchParams.toString()}`);
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