namespace TownApplication.ControllerLayer
{
    using TownApplication.Data;
    using TownApplication.Data.Models;

    public class TownController
    {
        private readonly TownDbContext context;

        public TownController()
        {
            context = new TownDbContext();
            context.Database.EnsureCreated();
        }

        public void AddTown(string townName, int population)
        {
            // Validate townName
            if (string.IsNullOrWhiteSpace(townName) || townName.Length < 3)
            {
                throw new ArgumentException("Invalid town name.");
            }

            // Validate population
            if (population <= 0)
            {
                throw new ArgumentException("Population must be a positive number.");
            }

            var existingTown = GetTownByName(townName);

            if (existingTown != null)
            {
                return;
            }
            else
            {
                var town = new Town { Name = townName, Population = population };
                context.Towns.Add(town);
                context.SaveChanges();
            }
        }

        public void UpdateTown(int id, int newPopulation)
        {
            var town = context.Towns.FirstOrDefault(t => t.Id == id);
            if (town != null)
            {
                town.Population = newPopulation;
                context.SaveChanges();
            }
        }

        public void DeleteTown(int id)
        {
            var town = context.Towns.FirstOrDefault(t => t.Id == id);
            if (town != null)
            {
                context.Towns.Remove(town);
                context.SaveChanges();
            }
        }

        public List<Town> ListTowns()
        {
            return context.Towns.ToList();
        }

        public void PrintAll()
        {
            var towns = context.Towns.ToList();
            foreach (var town in towns)
            {
                Console.WriteLine($"ID: {town.Id}, Name: {town.Name}, Population: {town.Population}");
            }
        }

        public Town? GetTownByName(string townName)
        {
            return context.Towns.FirstOrDefault(t => t.Name == townName);
        }

        public void ResetDatabase()
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
        }
    }
}