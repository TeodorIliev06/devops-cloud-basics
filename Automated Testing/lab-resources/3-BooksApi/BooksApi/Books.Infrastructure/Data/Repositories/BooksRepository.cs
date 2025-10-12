namespace Books.Infrastructure.Data.Repositories
{
    using Books.Infrastructure.Data.Common;
    using Books.Infrastructure.Data.Contexts;

    public class BooksRepository : Repository, IBooksRepository
    {
        public BooksRepository(BooksContext context)
            : base(context)
        {
        }
    }
}
