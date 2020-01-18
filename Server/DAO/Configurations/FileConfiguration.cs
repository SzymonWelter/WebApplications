using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models.DAL;

namespace Server.DAO.Configurations
{
    public class FileConfiguration : IEntityTypeConfiguration<FileDAL>
    {
        public void Configure(EntityTypeBuilder<FileDAL> builder)
        {
            builder.ToTable("Files");
            builder.HasKey(f => f.FileId);
            builder.HasOne( f => f.Author).WithMany(p => p.Writings).HasForeignKey(f => f.AuthorId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne( f => f.Publisher).WithMany( u => u.Writings).HasForeignKey(f => f.PublisherId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}