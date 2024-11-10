document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get('id');
    const seriesName = urlParams.get('name');
    
    const apiUrl = `https://api.tvmaze.com/shows/${showId}`;
    const seasonsUrl = `${apiUrl}/seasons`;

    document.getElementById('pageTitle').textContent = seriesName || 'Series Details';

    let seriesImage;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            seriesImage = data.image ? data.image.original : 'assets/noImageAvailable.png';
            document.getElementById('pageTitle').textContent = data.name;
            document.getElementById('series-title').textContent = data.name;

            document.getElementById('series-type').textContent = data.type;
            document.getElementById('series-language').textContent = data.language;
            document.getElementById('series-genres').textContent = data.genres.join(' - ');
            document.getElementById('series-status').textContent = data.status;
            document.getElementById('series-premiered').textContent = data.premiered || 'N/A';
            document.getElementById('series-ended').textContent = data.ended || 'N/A';
            document.getElementById('series-runtime').textContent = data.runtime || data.averageRuntime || 'N/A';
            document.getElementById('series-rating').textContent = data.rating.average || 'N/A';

            const network = data.network;
            document.getElementById('series-network').textContent = network ? network.name : 'N/A';

            document.getElementById('series-poster').src = data.image ? data.image.original : 'assets/noImageAvailable.png';
            document.getElementById('series-link').href = data.url || '#';
            document.getElementById('series-description').innerHTML = data.summary || 'No description available.';
        })
        .catch(error => {
            console.error('Error fetching series data:', error);
            document.getElementById('series-description').textContent = 'Failed to load series information.';
        });

    fetch(seasonsUrl)
        .then(response => response.json())
        .then(seasonsData => {
            const descriptionContainer = document.querySelector('.seasonsinfo');

            const seasonsContainer = document.createElement('div');
            seasonsContainer.classList.add('seasons-container');

            seasonsData.forEach(season => {
                const seasonDiv = document.createElement('div');
                seasonDiv.classList.add('season');

                seasonDiv.innerHTML = `
                    <h3>Season ${season.number}</h3>
                    <p>Episodes: ${season.episodeOrder || 'N/A'}</p>
                    <p>Premiered: ${season.premiereDate || 'N/A'}</p>
                    <p>Ended: ${season.endDate || 'N/A'}</p>
                    <img src="${season.image ? season.image.medium : seriesImage}" 
                    alt="Season ${season.number} poster" 
                    class="season-poster ${!season.image ? 'grayscale' : ''}">
                    `;

                seasonsContainer.appendChild(seasonDiv);
            });

            descriptionContainer.appendChild(seasonsContainer);
        })
        .catch(error => {
            console.error('Error fetching seasons data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Failed to load season information.';
            descriptionContainer.appendChild(errorMessage);
        });
});
