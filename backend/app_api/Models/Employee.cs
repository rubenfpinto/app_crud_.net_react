namespace app_api.Models;

public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime Birthdate { get; set; }
    public int Years_of_experience { get; set; }
    public string Experienced_tech { get; set; }
}