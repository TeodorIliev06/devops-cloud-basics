using Microsoft.EntityFrameworkCore;
using TownApplication.Data.Models;

namespace TownApplication.Data
{
    public class TownDbContext : DbContext
    {
        public DbSet<Town> Towns { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("InMemoryDb");
        }
    }
}
