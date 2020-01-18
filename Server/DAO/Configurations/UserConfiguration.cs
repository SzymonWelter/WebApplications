using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models.DAL;

namespace Server.DAO.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<UserDAL>
    {
        public void Configure(EntityTypeBuilder<UserDAL> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(u => u.UserId);
            builder.Property(u => u.Login).IsRequired();
            builder.Property(u => u.Password).IsRequired();

            builder.HasOne( u => u.Person).WithOne( p => p.User ).OnDelete(DeleteBehavior.Restrict);
        }
    }
}