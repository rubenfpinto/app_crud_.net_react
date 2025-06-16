namespace app_api.DTOs;

public class EmployeeDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime Birthdate { get; set; }
    public int YearsOfExperience { get; set; }
    public string ExperiencedTech { get; set; }
}

public class GetAllEmployee
{
    public string? search { get; set; } = String.Empty;
    public int orderByType { get; set; } = 0;
    public int orderBy { get; set; } = 1;
    public int page { get; set; } = 1;
    public int pageSize { get; set; } = 10;
}

public class AddEmployee
{
    public string Name { get; set; }
    public string Birthdate { get; set; }
    public int YearsOfExperience { get; set; }
    public string ExperiencedTech { get; set; }
}