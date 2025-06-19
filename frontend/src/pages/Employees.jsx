import { useState } from 'react';
import Create from '../components/Create.jsx';
import EmployeesTable from '../components/EmployeesTable.jsx';
import Search from '../components/Search.jsx';
import Filters from '../components/Filters.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { getEmployees } from '../services/api.js';

export default function Employees(){
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    orderByType: 0,
    orderBy: 1
  });
  const [totalEmployees, setTotalEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const updateSearchParam = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    navigate(`?${searchParams.toString()}`);
  };

  const jumpToPage = async (page) => {
    try {
        const res = await getEmployees(search, filters.orderByType, filters.orderBy, page, 10);
        setEmployees(res.data.employees);
        setPagination(res.data.page);
        // const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', page);
        navigate(`?${searchParams.toString()}`);
      } catch (err) {
        console.error('Something went wrong:', err);
      }
  }

  return(
    <main className='px-5 py-4 fade-in'>
      <div className='d-flex gap-2 '>
        <h1>List of Employees </h1>
        <div className='d-flex gap-2 py-2'>
          <Create
            setEmployees={setEmployees}
            setPagination={setPagination}
            filters={filters}
            pagination={pagination}
            setTotalEmployees={setTotalEmployees}
            setLoading={setLoading}
          />
        </div>
      </div>
      <div className='d-flex gap-2 py-2'>
        <Filters 
          search={search}
          filters={filters} setFilters={setFilters}
          pagination={pagination} setPagination={setPagination}
          setEmployees={setEmployees}
          setTotalPages={setTotalPages}
          location={location} 
          navigate={navigate}
          searchParams={searchParams}
          setTotalEmployees={setTotalEmployees}
          setLoading={setLoading}

        />
        <Search 
          search={search} setSearch={setSearch}
          pagination={pagination} setPagination={setPagination}
          setEmployees={setEmployees}
          setTotalPages={setTotalPages}
          navigate={navigate}
          searchParams={searchParams}
          updateSearchParam={updateSearchParam}
          jumpToPage={jumpToPage}
          setTotalEmployees={setTotalEmployees}
          filters={filters}
          setLoading={setLoading}
        />
      </div>
      <EmployeesTable className="fade-in fade2"
        jumpToPage={jumpToPage}
        employees={employees} setEmployees={setEmployees}
        pagination={pagination} setPagination={setPagination}
        totalPages={totalPages} setTotalPages={setTotalPages}
        filters={filters} setFilters={setFilters}
        search={search} setSearch={setSearch}
        navigate={navigate}
        searchParams={searchParams}
        totalEmployees={totalEmployees} setTotalEmployees={setTotalEmployees}
        loading={loading} setLoading={setLoading}
      />
    </main>
  )
}