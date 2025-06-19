import { useEffect } from 'react';
import { getEmployees } from '../services/api.js';
import DeleteConfirmation from '../components/DeleteConfirmation.jsx'
import Edit from '../components/Edit.jsx'

export default function EmployeesTable({className, jumpToPage, employees, setEmployees, pagination, setPagination, totalPages, setTotalPages, filters,setFilters, search, setSearch, searchParams, totalEmployees, setTotalEmployees, loading, setLoading}){

  useEffect(() => {
    async function fetchData() {
      try {
        const PageMemory = parseInt(searchParams.get('page')) || 1;
        const filtersMemory = {
          search: searchParams.get("search") || "",
          orderByType: parseInt(searchParams.get("orderByType")) || 0,
          orderBy: parseInt(searchParams.get("orderBy")) || 1,
        };
        setLoading(true);
        const res = await getEmployees(filtersMemory.search, filtersMemory.orderByType, filtersMemory.orderBy, PageMemory, 10);
        setEmployees(res.data.employees);
        setPagination(res.data.page);
        setTotalPages(res.data.totalPages);
        setTotalEmployees(res.data.employeesTotal);
        setFilters({
          orderByType:  filtersMemory.orderByType,
          orderBy:  filtersMemory.orderBy
        });
        setSearch(filtersMemory.search);
        setLoading(false);
      } catch (err) {
        console.error('Something went wrong:', err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <table className={`table table-hover border align-middle ${className}`}>
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
          {loading ? (
            <tr>
             <td colSpan="5" className="text-center py-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          ) : (
            employees.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-3">
                  No employees.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
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
                        setTotalEmployees={setTotalEmployees}
                      />
                      <DeleteConfirmation             
                        id={employee.id}
                        setEmployees={setEmployees}
                        setPagination={setPagination} pagination={pagination}
                        filters={filters}
                        search={search}
                        setTotalEmployees={setTotalEmployees}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
      <div className={`text-center ${className}`}>
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
        <p style={{ fontStyle: 'italic', fontSize: '0.8rem' }}>
          {totalEmployees} Employees | {totalPages} Pages
        </p>
      </div>
    </>
  )
}