namespace Books.Infrastructure.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Book
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Author { get; set; } = null!;
    }
}
