export const initializeHomePage = (data) => {
    // Helper function to format dates
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Latest News Section
    const renderLatestNews = (news) => {
        if (!news || news.length === 0) {
            return '<p>No news available</p>';
        }

        return news.slice(0, 3).map(item => `
            <div class="news-item">
                <div class="news-image">
                    <img src="${item.image || 'images/default-news.jpg'}" alt="${item.title}">
                </div>
                <div class="news-content">
                    <h3>${item.title}</h3>
                    <p class="news-date">${formatDate(item.date)}</p>
                    <p class="news-excerpt">${item.content.substring(0, 150)}...</p>
                    <a href="#" class="read-more">Read More</a>
                </div>
            </div>
        `).join('');
    };

    // Next Matches Section
    const renderNextMatches = (fixtures, clubs) => {
        if (!fixtures || fixtures.length === 0) {
            return '<p>No upcoming matches</p>';
        }

        return fixtures.slice(0, 3).map(match => {
            const homeClub = clubs.find(club => club.name === match.home);
            const awayClub = clubs.find(club => club.name === match.away);
            
            return `
                <div class="match-card">
                    <div class="match-date">${formatDate(match.date)}</div>
                    <div class="match-teams">
                        <div class="team home">
                            <img src="${homeClub?.logo}" alt="${match.home}" class="team-logo">
                            <span class="team-name">${match.home}</span>
                        </div>
                        <div class="match-info">
                            <span class="vs">VS</span>
                            <span class="match-time">${match.time || '15:00'}</span>
                            <span class="match-day">Matchday ${match.matchday}</span>
                        </div>
                        <div class="team away">
                            <img src="${awayClub?.logo}" alt="${match.away}" class="team-logo">
                            <span class="team-name">${match.away}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    };

    // League Stats Section
    const renderLeagueStats = (results) => {
        const totalGoals = results.reduce((sum, match) => 
            sum + (match.homeScore || 0) + (match.awayScore || 0), 0);
        
        const matchesPlayed = results.filter(match => 
            match.homeScore !== null && match.awayScore !== null).length;

        return `
            <div class="stats-container">
                <div class="stat-card">
                    <span class="stat-number">${matchesPlayed}</span>
                    <span class="stat-label">Matches Played</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${totalGoals}</span>
                    <span class="stat-label">Goals Scored</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${(totalGoals/matchesPlayed || 0).toFixed(1)}</span>
                    <span class="stat-label">Goals per Match</span>
                </div>
            </div>
        `;
    };

    return {
        renderLatestNews,
        renderNextMatches,
        renderLeagueStats
    };
};