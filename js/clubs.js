function initializeClubsPage() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'clubSearch';
    searchInput.placeholder = 'Search clubs by name, location, or manager...';
    searchInput.className = 'club-search';

    const sortSelect = document.createElement('select');
    sortSelect.id = 'sortClubs';
    sortSelect.className = 'club-sort';
    
    const sortOptions = [
        { value: 'name-asc', text: 'Name (A-Z)' },
        { value: 'name-desc', text: 'Name (Z-A)' },
        { value: 'location', text: 'Location' },
        { value: 'founded-new', text: 'Newest First' },
        { value: 'founded-old', text: 'Oldest First' }
    ];

    sortOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        sortSelect.appendChild(optionElement);
    });

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'clubs-controls';
    controlsContainer.appendChild(searchInput);
    controlsContainer.appendChild(sortSelect);

    // Insert controls after the subtitle
    const subtitle = document.querySelector('.subtitle');
    subtitle.parentNode.insertBefore(controlsContainer, subtitle.nextSibling);

    function filterAndSortClubs() {
        const searchTerm = searchInput.value.toLowerCase();
        const sortValue = sortSelect.value;
        const clubsContainer = document.querySelector('.clubs-container');
        const clubs = Array.from(clubsContainer.children);

        // Filter clubs
        clubs.forEach(club => {
            const clubName = club.querySelector('.club-name').textContent.toLowerCase();
            const clubLocation = club.querySelector('.club-info span:last-child').textContent.toLowerCase();
            const clubManager = club.querySelector('.club-info span:first-child').textContent.toLowerCase();
            
            const matches = clubName.includes(searchTerm) || 
                          clubLocation.includes(searchTerm) || 
                          clubManager.includes(searchTerm);
            
            club.style.display = matches ? 'block' : 'none';
        });

        // Sort visible clubs
        const visibleClubs = clubs.filter(club => club.style.display !== 'none');
        visibleClubs.sort((a, b) => {
            const nameA = a.querySelector('.club-name').textContent;
            const nameB = b.querySelector('.club-name').textContent;
            const foundedA = a.querySelector('.club-info span:nth-child(3)').textContent;
            const foundedB = b.querySelector('.club-info span:nth-child(3)').textContent;
            const locationA = a.querySelector('.club-info span:last-child').textContent;
            const locationB = b.querySelector('.club-info span:last-child').textContent;

            switch(sortValue) {
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                case 'name-desc':
                    return nameB.localeCompare(nameA);
                case 'location':
                    return locationA.localeCompare(locationB);
                case 'founded-new':
                    return foundedB.localeCompare(foundedA);
                case 'founded-old':
                    return foundedA.localeCompare(foundedB);
                default:
                    return 0;
            }
        });

        // Update DOM
        clubsContainer.innerHTML = '';
        visibleClubs.forEach(club => clubsContainer.appendChild(club));
    }

    // Add event listeners
    searchInput.addEventListener('input', filterAndSortClubs);
    sortSelect.addEventListener('change', filterAndSortClubs);

    // Add no results message
    const observer = new MutationObserver(() => {
        const clubsContainer = document.querySelector('.clubs-container');
        const visibleClubs = Array.from(clubsContainer.children)
            .filter(club => club.style.display !== 'none');

        const noResults = document.querySelector('.no-results');
        if (visibleClubs.length === 0) {
            if (!noResults) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.textContent = 'No clubs found matching your search';
                clubsContainer.appendChild(message);
            }
        } else if (noResults) {
            noResults.remove();
        }
    });

    observer.observe(document.querySelector('.clubs-container'), {
        childList: true,
        subtree: true,
        attributes: true
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#clubs' || document.querySelector('.nav-links a.active')?.dataset.page === 'clubs') {
        initializeClubsPage();
    }
});

// Initialize when switching to clubs page
document.addEventListener('click', (e) => {
    if (e.target.matches('.nav-links a[data-page="clubs"]')) {
        setTimeout(initializeClubsPage, 100);
    }
});