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
    
    [HttpGet(Name = "getAll")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll(string? search, string? name, string? birthdate, int? yearsOfExperience, string? experiencedTech,  int page = 1, int pageSize = 10)
    {
        try
        {
            if (page < 1)
            {
                return BadRequest("Page must be greater than 0");
            }
            if (pageSize < 1)
            {
                return BadRequest("Page size must be greater than 0");
            }
            
            var employeesQuery = _context.Employee.AsQueryable();
            var employeesTotal = await employeesQuery.CountAsync();
            
            List<EmployeeDTO> employees = await employeesQuery
                                        .Select(e => new EmployeeDTO
                                        {
                                            Id = e.Id,
                                            Name = e.Name,
                                            Birthdate = e.Birthdate,
                                            YearsOfExperience = e.Years_of_experience,
                                            ExperiencedTech = e.Experienced_tech
                                        })
                                        .OrderBy(e=> e.Id)
                                        .Skip((page-1) * pageSize)
                                        .Take(pageSize).ToListAsync();
            return Ok(new
            {
                employeesTotal,
                page,
                totalPages = employeesTotal <= pageSize ? 1 : employeesTotal / pageSize,
                employees
            });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, new {success = false, message = "Something went wrong!"});
        }
    }
    
    [HttpPost(Name = "add")]
    [AllowAnonymous]
    public async Task<IActionResult> Add(string name, string birthdate, int yearsOfExperience, string experiencedTech)
    {
        try
        {
            Employee employees = new Employee
            {
                Name = name,
                Birthdate = DateTime.Parse(birthdate),
                Years_of_experience = yearsOfExperience,
                Experienced_tech = experiencedTech
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