using System.Linq;
using Microsoft.EntityFrameworkCore;
using Server.DAO.Configurations;
using Server.Models.DAL;

namespace Server.DAO
{
    public class WebAppContext : DbContext
    {

        public WebAppContext(DbContextOptions options) : base(options) { }
        public DbSet<FileDAL> Files { get; set; }
        public DbSet<PersonDAL> Persons { get; set; }
        public DbSet<UserDAL> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.ApplyConfiguration(new FileConfiguration());
            modelBuilder.ApplyConfiguration(new PersonConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());

        }

    }
}