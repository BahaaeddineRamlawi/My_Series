document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchSeries('');
    }
});

let lastSearchQuery = '';
let query;

async function searchSeries(queryHolder) {
    if (queryHolder === "") {
        query = document.getElementById('searchInput').value;
        lastSearchQuery = query;
    } else {
        query = queryHolder;
    }

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

                // Create image container for styling
                const imgContainer = document.createElement('div');
                imgContainer.className = 'img-container';

                const imgElement = document.createElement('img');
                imgElement.src = series.image ? series.image.medium : 'assets/noImageAvailable.png';
                imgElement.alt = `${series.name} poster`;

                // Create "Watch Later" button
                const watchLaterButton = document.createElement('button');
                watchLaterButton.className = 'watch-later-btn';
                watchLaterButton.textContent = 'Watch Later';

                // Check if the series is already in the Watch Later list
                const watchLaterList = JSON.parse(localStorage.getItem('watchLater')) || [];
                const isInWatchLater = watchLaterList.some(item => item.id === series.id);
                if (isInWatchLater) {
                    watchLaterButton.classList.add('watch-later');  // Add 'watch-later' class if in list
                }

                // Add event listener to toggle between adding and removing
                watchLaterButton.addEventListener('click', () => toggleWatchLater(series, watchLaterButton));

                // Append button and image to container
                imgContainer.appendChild(imgElement);
                imgContainer.appendChild(watchLaterButton);

                seriesElement.appendChild(imgContainer);
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

function toggleWatchLater(series, button) {
    let watchLaterList = JSON.parse(localStorage.getItem('watchLater')) || [];
    
    const index = watchLaterList.findIndex(item => item.id === series.id);
    if (index > -1) {
        watchLaterList.splice(index, 1);
        button.classList.remove('watch-later');
        button.textContent = 'Removed from Watch Later';
        button.classList.add('removed');
    } else {
        watchLaterList.push(series);
        button.classList.add('watch-later');
        button.textContent = 'Added to Watch Later';
        button.classList.remove('removed');
    }

    localStorage.setItem('watchLater', JSON.stringify(watchLaterList));
}

function showWatchLaterList() {
    // Get the Watch Later list from localStorage
    const watchLaterList = JSON.parse(localStorage.getItem('watchLater')) || [];

    // Get the modal and list container
    const watchLaterModal = document.getElementById('watchLaterModal');
    const watchLaterListContainer = document.getElementById('watchLaterList');

    // Clear previous items
    watchLaterListContainer.innerHTML = '';

    // If the list is empty
    if (watchLaterList.length === 0) {
        watchLaterListContainer.innerHTML = '<p>No series added to Watch Later.</p>';
    } else {
        // Loop through the watchLaterList and create HTML for each series
        watchLaterList.forEach(series => {
            const seriesElement = document.createElement('div');
            seriesElement.className = 'searchseries';

            const nameElement = document.createElement('h2');
            const link = document.createElement('a');
            link.href = `fetchSeriesData.html?name=${encodeURIComponent(series.name)}&id=${series.id}`;
            link.textContent = series.name;
            link.target = "_blank";
            nameElement.appendChild(link);

            // Create image container for styling
            const imgContainer = document.createElement('div');
            imgContainer.className = 'img-container';

            const imgElement = document.createElement('img');
            imgElement.src = series.image ? series.image.medium : 'assets/noImageAvailable.png';
            imgElement.alt = `${series.name} poster`;

            // Create "Watch Later" button
            const watchLaterButton = document.createElement('button');
            watchLaterButton.className = 'watch-later-btn';
            watchLaterButton.textContent = 'Watch Later';
            watchLaterButton.classList.add('watch-later');
            watchLaterButton.addEventListener('click', () => toggleWatchLater(series, watchLaterButton));

            // Append button and image to container
            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(watchLaterButton);

            seriesElement.appendChild(imgContainer);
            seriesElement.appendChild(nameElement);

            watchLaterListContainer.appendChild(seriesElement);
        });
    }

    // Display the modal
    watchLaterModal.style.display = 'flex';
}

function closeWatchLaterList() {
    const watchLaterModal = document.getElementById('watchLaterModal');
    watchLaterModal.style.display = 'none';

    if (lastSearchQuery) {
        searchSeries(lastSearchQuery);
    }
}