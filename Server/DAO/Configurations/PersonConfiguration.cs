using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models.DAL;

namespace Server.DAO.Configurations
{
    public class PersonConfiguration : IEntityTypeConfiguration<PersonDAL>
    {
        public void Configure(EntityTypeBuilder<PersonDAL> builder)
        {
            builder.ToTable("Persons");
            builder.HasKey(u => u.PersonId);
            builder.Property(u => u.FirstName).IsRequired();
            builder.Property(u => u.LastName).IsRequired();

            builder.HasOne( p => p.Photo).WithMany().HasForeignKey(p => p.PhotoId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}