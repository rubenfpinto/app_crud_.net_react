using app_api.Data;
using app_api.DTOs;
using app_api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly AppDbContext _context;

    public EmployeeController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpGet("getAll")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll([FromQuery] GetAllEmployee model)
    {
        try
        {
            if (model.page < 1)
            {
                return BadRequest("Page must be greater than 0");
            }
            if (model.pageSize < 1)
            {
                return BadRequest("Page size must be greater than 0");
            }
            
            var employeesQuery = _context.Employee.AsQueryable();

            if (!string.IsNullOrEmpty(model.search))
            {
                employeesQuery = employeesQuery.Where(e => 
                    e.Name.ToLower().Contains(model.search.ToLower())
                    || e.Birthdate.ToString().Contains(model.search)
                    || e.Years_of_experience.ToString().Contains(model.search)
                    || e.Experienced_tech.ToLower().Contains(model.search.ToLower())
                    );
            }

            switch (model.orderByType)
            {
                case 1:
                    employeesQuery = model.orderBy == 1 ? employeesQuery.OrderBy(e => e.Name) : employeesQuery.OrderByDescending(e => e.Name);
                    break;
                case 2:
                    employeesQuery = model.orderBy == 1 ? employeesQuery.OrderBy(e => e.Birthdate) : employeesQuery.OrderByDescending(e => e.Birthdate);
                    break;
                case 3:
                    employeesQuery = model.orderBy == 1 ? employeesQuery.OrderBy(e => e.Years_of_experience) : employeesQuery.OrderByDescending(e => e.Years_of_experience);
                    break;
                case 4:
                    employeesQuery = model.orderBy == 1 ? employeesQuery.OrderBy(e => e.Experienced_tech) : employeesQuery.OrderByDescending(e => e.Experienced_tech);
                    break;
                default:
                    employeesQuery = model.orderBy == 1 ? employeesQuery.OrderBy(e => e.Id) : employeesQuery.OrderByDescending(e => e.Id);
                    break;
            }
            var employeesTotal = await employeesQuery.CountAsync();
            
            List<EmployeeDTO> employees = await employeesQuery
                                        .AsNoTracking()
                                        // .OrderBy(e=> e.Id)
                                        .Skip((model.page-1) * model.pageSize)
                                        .Take(model.pageSize)
                                        .Select(e => new EmployeeDTO
                                        {
                                            Id = e.Id,
                                            Name = e.Name,
                                            Birthdate = e.Birthdate,
                                            YearsOfExperience = e.Years_of_experience,
                                            ExperiencedTech = e.Experienced_tech
                                        })
                                        .ToListAsync();
            
            int totalPages = employeesTotal <= model.pageSize ? 1 : (int)Math.Ceiling((double)employeesTotal / (double)model.pageSize);

            return Ok(new
            {
                employeesTotal,
                model.page,
                totalPages,
                employees
            });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, new {success = false, message = "Something went wrong!"});
        }
    }
    
    [HttpPost("create")]
    [AllowAnonymous]
    public async Task<IActionResult> Create([FromBody] AddEmployee model)
    {
        try
        {
            Employee employee = new Employee
            {
                Name = model.Name.Trim(),
                Birthdate = DateTime.Parse(model.Birthdate),
                Years_of_experience = model.YearsOfExperience,
                Experienced_tech = model.ExperiencedTech.Trim()
            };
            await _context.Employee.AddAsync(employee);
            await _context.SaveChangesAsync();
            await _context.Database.ExecuteSqlRawAsync("PRAGMA synchronous = FULL;");

            return Ok(new {success = true,  message = "Employee added successfully!"});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, new {success = false, message = "Something went wrong!"});
        }
    }
    
    [HttpPut("update")]
    [AllowAnonymous]
    public async Task<IActionResult> Update([FromBody] EditEmployeeDTO model)
    {
        try
        {
            Employee dbEmployee = await _context.Employee.FindAsync(model.Id);
            
            if (dbEmployee == null)
            {
                return BadRequest(new {success = false,  message = "Employee doesn't exist!"});
            }
            
            bool hasChanges = false;
            if (dbEmployee.Name != model.Name)
            {
                dbEmployee.Name = model.Name.Trim();
                hasChanges = true;
            }
            if (dbEmployee.Birthdate != model.Birthdate)
            {
                dbEmployee.Birthdate = model.Birthdate;
                hasChanges = true;
            }

            if (dbEmployee.Years_of_experience != model.YearsOfExperience)
            {
                dbEmployee.Years_of_experience = model.YearsOfExperience;
                hasChanges = true;
            }

            if (dbEmployee.Experienced_tech != model.ExperiencedTech)
            {
                dbEmployee.Experienced_tech = model.ExperiencedTech.Trim();
                hasChanges = true;
            }

            if (hasChanges)
            {
                await _context.SaveChangesAsync();
                await _context.Database.ExecuteSqlRawAsync("PRAGMA synchronous = FULL;");
                
                return Ok(new {success = true,  message = "Employee was edited successfully!"});
            }
            else
            {
                return Ok(new {success = false,  message = "No changes have been made!"});
            }
        
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, new {success = false, message = "Something went wrong!"});
        }
    }
    
    [HttpDelete("delete/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            Employee dbEmployee = await _context.Employee.FindAsync(id);
            
            if (dbEmployee == null)
            {
                return BadRequest(new {success = false,  message = "Employee doesn't exist!"});
            }
          
            _context.Remove(dbEmployee);
            await _context.SaveChangesAsync();
            await _context.Database.ExecuteSqlRawAsync("PRAGMA synchronous = FULL;");
            
            return Ok(new {success = true,  message = "Employee deleted successfully!"});
    
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, new {success = false, message = "Something went wrong!"});
        }
    }
}