namespace Books.Infrastructure.Data.Contexts
{
    using Microsoft.EntityFrameworkCore;

    using Books.Infrastructure.Models;
    public class BooksContext : DbContext
    {
        public BooksContext()
        {
        }

        public BooksContext(DbContextOptions<BooksContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
