﻿using app_api.Models;
using Microsoft.EntityFrameworkCore;

namespace app_api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
    public DbSet<Employee> Employee { get; set; }
}