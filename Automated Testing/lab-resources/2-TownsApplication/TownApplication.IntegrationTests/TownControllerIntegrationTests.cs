namespace TownApplication.IntegrationTests
{
    using ControllerLayer;

    public class TownControllerIntegrationTests
    {
        private readonly TownController controller;

        public TownControllerIntegrationTests()
        {
            controller = new TownController();
            controller.ResetDatabase();
        }

        [Fact]
        public void AddTown_ValidInput_ShouldAddTown()
        {
            // Arrange
            string townName = "Rome";
            int population = 2873545;

            // Act
            controller.AddTown(townName, population);

            // Assert
            var townInDb = controller.GetTownByName(townName);
            Assert.NotNull(townInDb);
            Assert.Equal(population, townInDb.Population);
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("AB")]
        public void AddTown_InvalidName_ShouldThrowArgumentException(string invalidName)
        {
            // Arrange
            int population = 100000;

            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => controller.AddTown(invalidName, population));
            Assert.Equal("Invalid town name.", exception.Message);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        public void AddTown_InvalidPopulation_ShouldThrowArgumentException(int invalidPopulation)
        {
            // Arrange
            string townName = "Athens";

            // Act
            Action act = () => controller.AddTown(townName, invalidPopulation);

            // Assert
            var exception = Assert.Throws<ArgumentException>(act);
            Assert.Equal("Population must be a positive number.", exception.Message);
        }

        [Fact]
        public void AddTown_DuplicateTownName_DoesNotAddDuplicateTown()
        {
            // Arrange
            string townName = "SampleTown";
            int population = 10000;

            // Act
            controller.AddTown(townName, population);
            controller.AddTown(townName, population);

            // Assert
            Assert.Single(controller.ListTowns());
        }

        [Fact]
        public void UpdateTown_ShouldUpdatePopulation()
        {
            // Arrange
            string townName = "SampleTown";
            int initialPopulation = 10000;
            int updatedPopulation = 12000;

            // Act
            controller.AddTown(townName, initialPopulation);

            var townToUpdate = controller.GetTownByName(townName);

            controller.UpdateTown(townToUpdate!.Id, updatedPopulation);

            // Assert
            var townInDb = controller.GetTownByName(townName);
            Assert.NotNull(townInDb);
            Assert.Equal(updatedPopulation, townInDb.Population);
        }

        [Fact]
        public void DeleteTown_ShouldDeleteTown()
        {
            // Arrange
            string townName = "SampleTown";
            int population = 10000;

            // Act
            controller.AddTown(townName, population);

            var townToDelete = controller.GetTownByName(townName);

            controller.DeleteTown(townToDelete!.Id);

            // Assert
            var townInDb = controller.GetTownByName(townName);
            Assert.Null(townInDb);
        }

        [Fact]
        public void ListTowns_ShouldReturnTowns()
        {
            // Arrange
            controller.AddTown("Town1", 5000);
            controller.AddTown("Town2", 8000);
            controller.AddTown("Town3", 12000);

            // Act
            var townsList = controller.ListTowns();

            var town1 = controller.GetTownByName("Town1");
            var town2 = controller.GetTownByName("Town2");
            var town3 = controller.GetTownByName("Town3");

            // Assert
            Assert.Equal(3, townsList.Count);
            Assert.Contains(town1, townsList);
            Assert.Contains(town2, townsList);
            Assert.Contains(town3, townsList);
        }
    }
}
