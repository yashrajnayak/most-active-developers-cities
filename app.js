async function fetchDevelopersData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/yashrajnayak/most-active-developers-india/main/data/github-data.json');
        const data = await response.json();
        // Extract the user array and map to the required format
        return data.user.map(user => ({
            ...user.profile,
            login: user.login,
            rank: user.rank
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function isCityMatch(location, cityType) {
    const cityMatches = {
        'bengaluru': ['bengaluru', 'bangalore'],
        'delhi-ncr': ['delhi', 'new delhi', 'noida', 'ghaziabad', 'gurgaon', 'gurugram'],
        'hyderabad': ['hyderabad'],
        'mumbai': ['mumbai', 'navi mumbai', 'thane']
    };

    if (!location) return false;
    const normalizedLocation = location.toLowerCase();
    return cityMatches[cityType].some(city => normalizedLocation.includes(city));
}

function createDeveloperCard(developer) {
    return `
        <a href="${developer.html_url}" target="_blank" class="developer-card-link">
            <div class="developer-card">
                <div class="developer-info">
                    <div class="developer-avatar">
                        <img src="${developer.avatar_url}" alt="${developer.login}">
                    </div>
                    <div class="developer-details">
                        <div class="developer-name-section">
                            <h3>${developer.name || developer.login}</h3>
                            <span class="username">@${developer.login}</span>
                        </div>
                        ${developer.bio ? `<p class="developer-bio">${developer.bio}</p>` : ''}
                    </div>
                </div>
                <div class="developer-stats">
                    <div class="stat-item">
                        <span class="stat-value">${developer.followers.toLocaleString()}</span>
                        <span class="stat-label">Followers</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${developer.total_stars.toLocaleString()}</span>
                        <span class="stat-label">Total Stars</span>
                    </div>
                </div>
            </div>
        </a>
    `;
}

function getUrlParameter() {
    const params = new URLSearchParams(window.location.search);
    const city = params.get('city');
    
    // Map delhi to delhi-ncr
    if (city === 'delhi') {
        return 'delhi-ncr';
    }
    
    const validCities = ['bengaluru', 'delhi-ncr', 'hyderabad', 'mumbai'];
    return validCities.includes(city) ? city : null;
}

function updateHeader(city) {
    const header = document.querySelector('header h1');
    
    if (city) {
        let cityName = city;
        if (city === 'delhi-ncr') {
            cityName = 'Delhi NCR';
        } else {
            cityName = city.charAt(0).toUpperCase() + city.slice(1);
        }
        header.textContent = `Most Active Developers in ${cityName} on GitHub`;
    } else {
        header.textContent = `Most Active Developers on GitHub in India`;
    }
}

function displayDevelopersByCity(developers) {
    const cities = ['bengaluru', 'delhi-ncr', 'hyderabad', 'mumbai'];
    const selectedCity = getUrlParameter();
    
    cities.forEach(city => {
        const section = document.querySelector(`#${city}`);
        if (selectedCity && city !== selectedCity) {
            section.style.display = 'none';
            return;
        }
        
        const cityDevelopers = developers.filter(dev => isCityMatch(dev.location, city));
        const container = section.querySelector('.developers-list');
        
        if (cityDevelopers.length > 0) {
            container.innerHTML = cityDevelopers
                .map(developer => createDeveloperCard(developer))
                .join('');
        } else {
            container.innerHTML = '<p>No developers found in this city.</p>';
        }
        
        // Hide city name in section header if it's the selected city
        if (selectedCity) {
            const cityHeader = section.querySelector('h2');
            cityHeader.style.display = 'none';
        }
    });
}

async function initialize() {
    const developers = await fetchDevelopersData();
    const selectedCity = getUrlParameter();
    updateHeader(selectedCity);
    displayDevelopersByCity(developers);
}

document.addEventListener('DOMContentLoaded', initialize);
