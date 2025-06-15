namespace app_api.DTOs;

public class EmployeeDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime Birthdate { get; set; }
    public int YearsOfExperience { get; set; }
    public string ExperiencedTech { get; set; }
}

public class AddEmployee
{
    public string Name { get; set; }
    public DateTime Birthdate { get; set; }
    public int Years_of_expirience { get; set; }
    public string Experienced_tech { get; set; }
}