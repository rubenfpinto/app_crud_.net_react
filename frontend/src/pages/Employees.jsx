import { useState } from 'react';
import AddEmployee from '../components/AddEmployee.jsx';
import EmployeesTable from '../components/EmployeesTable.jsx';
import Search from '../components/search.jsx';

export default function Employees(){
  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [search, setSearch] = useState('');
  return(
    <main className='px-5 py-4'>
      <div className='d-flex gap-2'>
        <h1>List of Employees </h1>
        <div className='d-flex gap-2 py-2'>
          <AddEmployee />
          <Search 
            search={search} setSearch={setSearch}
            pagination={pagination} setPagination={setPagination}
            setEmployees={setEmployees}
          />
        </div>
      </div>
      <EmployeesTable 
        employees={employees} setEmployees={setEmployees}
        pagination={pagination} setPagination={setPagination}
        totalPages={totalPages} setTotalPages={setTotalPages}
      />
    </main>
  )
}