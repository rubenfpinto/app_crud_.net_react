import { useState } from 'react';
import Create from '../components/Create.jsx';
import EmployeesTable from '../components/EmployeesTable.jsx';
import Search from '../components/search.jsx';
import Filters from '../components/Filters.jsx';

export default function Employees(){
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    orderByType: 0,
    orderBy: 1
  });
  
  return(
    <main className='px-5 py-4'>
      <div className='d-flex gap-2'>
        <h1>List of Employees </h1>
        <div className='d-flex gap-2 py-2'>
          <Create
            setEmployees={setEmployees}
            setPagination={setPagination}
            filters={filters}
            pagination={pagination}
          />
          {/* <Search 
            search={search} setSearch={setSearch}
            pagination={pagination} setPagination={setPagination}
            setEmployees={setEmployees}
          /> */}
        </div>
      </div>
      <div className='d-flex gap-2 py-2'>
        <Filters 
          filters={filters} setFilters={setFilters}
          pagination={pagination} setPagination={setPagination}
          setEmployees={setEmployees}
        />
        <Search 
          search={search} setSearch={setSearch}
          pagination={pagination} setPagination={setPagination}
          setEmployees={setEmployees}
          totalPages={totalPages} setTotalPages={setTotalPages}
        />
      </div>
      <EmployeesTable 
        employees={employees} setEmployees={setEmployees}
        pagination={pagination} setPagination={setPagination}
        totalPages={totalPages} setTotalPages={setTotalPages}
        filters={filters} setFilters={setFilters}
        search={search}
      />
    </main>
  )
}