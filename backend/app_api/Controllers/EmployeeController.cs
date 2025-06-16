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
            var employeesTotal = await employeesQuery.CountAsync();

            switch (model.orderByType)
            {
                case 0:
                    employeesQuery = model.orderBy == 1 ? employeesQuery.OrderBy(e => e.Name) : employeesQuery.OrderByDescending(e => e.Name);
                    break;
                case 1:
                    employeesQuery = model.orderBy == 1 ? employeesQuery.OrderBy(e => e.Birthdate) : employeesQuery.OrderByDescending(e => e.Birthdate);
                    break;
                case 2:
                    employeesQuery = model.orderBy == 1 ? employeesQuery.OrderBy(e => e.Years_of_experience) : employeesQuery.OrderByDescending(e => e.Years_of_experience);
                    break;
                case 3:
                    employeesQuery = model.orderBy == 1 ? employeesQuery.OrderBy(e => e.Experienced_tech) : employeesQuery.OrderByDescending(e => e.Experienced_tech);
                    break;
                default:
                    employeesQuery = model.orderBy == 1 ? employeesQuery.OrderBy(e => e.Id) : employeesQuery.OrderByDescending(e => e.Id);
                    break;
            }
            
            List<EmployeeDTO> employees = await employeesQuery
                                        .Select(e => new EmployeeDTO
                                        {
                                            Id = e.Id,
                                            Name = e.Name,
                                            Birthdate = e.Birthdate,
                                            YearsOfExperience = e.Years_of_experience,
                                            ExperiencedTech = e.Experienced_tech
                                        })
                                        // .OrderBy(e=> e.Id)
                                        .Skip((model.page-1) * model.pageSize)
                                        .Take(model.pageSize).ToListAsync();
            return Ok(new
            {
                employeesTotal,
                model.page,
                totalPages = employeesTotal <= model.pageSize ? 1 : employeesTotal / model.pageSize,
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
            Employee employees = new Employee
            {
                Name = model.Name,
                Birthdate = DateTime.Parse(model.Birthdate),
                Years_of_experience = model.YearsOfExperience,
                Experienced_tech = model.ExperiencedTech
            };
            _context.Employee.Add(employees);
            await _context.SaveChangesAsync();
            
            return Ok(new {success = true, message = "Employee added successfully!"});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, new {success = false, message = "Something went wrong!"});
        }
    }
}