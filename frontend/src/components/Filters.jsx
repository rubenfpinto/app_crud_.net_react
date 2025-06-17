import { getEmployees } from '../services/api.js';

export default function Filters({filters, setFilters, pagination, setPagination, setEmployees}){

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilter = () => {
    setFilters({
      orderByType: 0,
      orderBy: 1
    });
  };

  const applyFilter = async (e)=> {
    try {
      e.preventDefault();
      const res = await getEmployees('', filters.orderByType, filters.orderBy, pagination, 10);
      setEmployees(res.data.employees);
      setPagination(res.data.page);
    } catch (err) {
      console.error('Something went wrong:', err);
    }
  }

  return(
      <div className="btn-group">
        <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-filter"></i> Filter
        </button>
        <ul className="dropdown-menu p-3">
          <form className='Filters' onSubmit={applyFilter}>
            <li>
              <div className="form-floating">
                <select 
                  className="form-select" 
                  id="orderByType"
                  name="orderByType"
                  value={filters.orderByType}
                  onChange={handleChange}
                  aria-label="Order by Type"
                >
                  <option value="0">Default</option>
                  <option value="1">Name</option>
                  <option value="2">Birthdate</option>
                  <option value="3">Years of experience</option>
                  <option value="4">Experieced Tech</option>
                </select>
                <label htmlFor="orderByType">Order by Type</label>
              </div>
            </li>
            <li>
              <div className="form-floating">
                <select
                  className="form-select" 
                  id="orderBy"
                  name="orderBy"
                  value={filters.orderBy}
                  onChange={handleChange}
                  aria-label="Order by"  
                >
                  <option value="1">Descending</option>
                  <option value="2">Ascending </option>
                </select>
                <label htmlFor="floatingSelect">Order by Type</label>
              </div>
            </li>              
            <li className='text-center'>
              <div className='d-flex justify-content-center gap-2'>
                <button className="btn btn-secondary" onClick={resetFilter}>
                  <i className="bi bi-arrow-repeat"> Reset</i>
                </button>
                <button className="btn btn-secondary" type="submit">
                  Apply
                </button>
              </div>
            </li>
          </form>
        </ul>
    </div>
  )
}