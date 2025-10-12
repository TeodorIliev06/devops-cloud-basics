namespace Books.Core.Contracts
{
    using Books.Infrastructure.Models;

    public interface IBookService
    {
        Task<IEnumerable<Book>> GetAllBooksAsync();

        Task<Book> GetBookAsync(int id);

        Task<Book> AddBookAsync(Book book);

        Task EditBookAsync(int id, Book book);

        Task EditBookPartiallyAsync(int id, Book book);

        Task<Book> DeleteBookAsync(int id);
    }
}
