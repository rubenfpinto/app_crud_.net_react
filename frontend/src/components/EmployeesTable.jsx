import { useEffect, useState } from 'react';
import { getEmployees } from '../services/api.js';
import DeleteConfirmation from '../components/DeleteConfirmation.jsx'
import Edit from '../components/Edit.jsx'
import { useNavigate, useLocation } from 'react-router-dom';

export default function EmployeesTable({employees, setEmployees, pagination, setPagination, totalPages, setTotalPages, filters, search}){
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const searchParams = new URLSearchParams(location.search);
        const PageMemory = parseInt(searchParams.get('page')) || 1;
        setPagination(PageMemory);
        const res = await getEmployees('', 0, 1, PageMemory, 10);
        setEmployees(res.data.employees);
        setPagination(res.data.page);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Something went wrong:', err);
      }
    }
    fetchData();
  }, []);

  

  const jumpToPage = async (page) => {
    try {
        const res = await getEmployees(search, filters.orderByType, filters.orderBy, page, 10);
        setEmployees(res.data.employees);
        setPagination(res.data.page);
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', page);
        navigate(`?${searchParams.toString()}`);
      } catch (err) {
        console.error('Something went wrong:', err);
      }
  }
    
  return (
    <>
      <table className="table table-hover border align-middle">
        <thead className="table-dark align-middle">
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Birthdate</th>
            <th className="border px-4 py-2">Years of experience</th>
            <th className="border px-4 py-2">Experieced Tech</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border px-4 py-2">{employee.name}</td>
              <td className="border px-4 py-2">
                {new Date(employee.birthdate).toLocaleDateString(
                  'pt-PT', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }
                )}
              </td>
              <td className="border px-4 py-2">{employee.yearsOfExperience}</td>
              <td className="border px-4 py-2">{employee.experiencedTech}</td>
              <td className="border px-4 py-1">
                <div className="d-flex justify-content-evenly gap-2 w-100">
                  <Edit
                    id={employee.id}
                    employees={employees} setEmployees={setEmployees}
                    setPagination={setPagination} pagination={pagination}
                    filters={filters}
                    search={search}
                  />
                  <DeleteConfirmation             
                    id={employee.id}
                    setEmployees={setEmployees}
                    setPagination={setPagination} pagination={pagination}
                    filters={filters}
                    search={search}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {pagination == 1 ? (
              <li className="page-item disabled">
                <a className="page-link">Previous</a>
              </li>
            ) : (
              <li className="page-item">
                <a href='#' className="page-link" onClick={(e) => {
                  e.preventDefault();
                  jumpToPage(pagination-1);
                }} >Previous</a>
              </li>
            )
          }
          {Array.from({length: totalPages}, (_, index) => (
            <li key={index} className={`page-item ${(index+1) == pagination ? 'active' : ''}`}>
              <a className="page-link" 
                onClick={(index+1) == pagination ? undefined : (e) => {
                          e.preventDefault();
                          jumpToPage(index+1);
                        }
              }>{index+1}</a>
            </li>
          ))}
          {totalPages == 1 || pagination == totalPages ? (
            <li className="page-item">
                <a className="page-link disabled" >Next</a>
            </li>
          ) : (
            <li className="page-item">
                <a href='#' className="page-link" onClick={(e) => {
                  e.preventDefault();
                  jumpToPage(pagination+1);
                }} >Next</a>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}