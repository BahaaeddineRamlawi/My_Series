document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchSeries();
    }
});

async function searchSeries() {
    const query = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (query) {
        try {
            const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
            const data = await response.json();
            document.getElementById('searchInput').value = '';

            data.forEach(item => {
                const series = item.show;
                const seriesElement = document.createElement('div');
                seriesElement.className = 'searchseries';

                const nameElement = document.createElement('h2');
                const link = document.createElement('a');
                link.href = `fetchSeriesData.html?name=${encodeURIComponent(series.name)}&id=${series.id}`;
                link.textContent = series.name;
                link.target = "_blank";
                nameElement.appendChild(link);

                const imgElement = document.createElement('img');
                imgElement.src = series.image ? series.image.medium : 'assets/noImageAvailable.png';
                imgElement.alt = `${series.name} poster`;

                seriesElement.appendChild(imgElement);
                seriesElement.appendChild(nameElement);

                resultsContainer.appendChild(seriesElement);
            });

        } catch (error) {
            console.error("Error fetching data:", error);
            resultsContainer.innerHTML = "<p>Could not load series data. Please try again later.</p>";
        }
    } else {
        alert("Please enter a series name.");
    }
}
