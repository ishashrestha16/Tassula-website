
const searchInput = document.querySelector("#animal-search");
const animalCards = document.querySelectorAll(".animal-card");
const resultCount = document.querySelector("#result-count");
const noResults = document.querySelector("#no-results");

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    animalCards.forEach(function (card) {
        const animalInfo = card.textContent.toLowerCase();
        const matches = animalInfo.includes(searchText);

        card.hidden = !matches;

        if (matches) {
            visibleCount++;
        }
    });

    resultCount.textContent =
        `Showing ${visibleCount} of ${animalCards.length} animals.`;

    noResults.hidden = visibleCount !== 0;
});
