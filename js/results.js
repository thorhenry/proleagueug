document.addEventListener('DOMContentLoaded', () => {
    window.displayResults = function(fixtures, clubs) {
        const today = new Date();

        // Filter matches that have been played (date has passed)
        const playedMatches = fixtures.filter(fixture => new Date(fixture.date) < today);

        // Group matches by matchday
        const groupedResults = playedMatches.reduce((acc, match) => {
            if (!acc[match.matchday]) {
                acc[match.matchday] = [];
            }
            acc[match.matchday].push(match);
            return acc;
        }, {});

        // Create HTML for grouped results with score input functionality
        const resultsHTML = Object.entries(groupedResults)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([matchday, matches]) => {
                const matchResults = matches.map(match => {
                    const homeClub = clubs.find(club => club.name === match.home);
                    const awayClub = clubs.find(club => club.name === match.away);
                    const matchId = `match-${match.matchday}-${match.home}-${match.away}`.replace(/\s+/g, '-');
                    
                    return `
                        <div class="result-card" data-match-id="${matchId}">
                            <div class="result-date">${match.date}</div>
                            <div class="result-teams">
                                <div class="team home">
                                    <img src="${homeClub?.logo}" alt="${match.home}" class="team-logo">
                                    <span class="team-name">${match.home}</span>
                                    <input type="number" class="score-input home-score" min="0" max="99" 
                                           value="${match.homeScore || ''}" placeholder="-">
                                </div>
                                <div class="score-divider">-</div>
                                <div class="team away">
                                    <input type="number" class="score-input away-score" min="0" max="99" 
                                           value="${match.awayScore || ''}" placeholder="-">
                                    <span class="team-name">${match.away}</span>
                                    <img src="${awayClub?.logo}" alt="${match.away}" class="team-logo">
                                </div>
                            </div>
                            <div class="match-details">
                                <span class="venue"><i class="fas fa-map-marker-alt"></i> ${match.venue}</span>
                                <button class="save-result" onclick="saveMatchResult('${matchId}')">Save Result</button>
                            </div>
                        </div>
                    `;
                }).join('');

                return `
                    <div class="matchday-group">
                        <h3 class="matchday-title">Matchday ${matchday}</h3>
                        <div class="matchday-results">
                            ${matchResults}
                        </div>
                    </div>
                `;
            }).join('');

        return `
            <div class="page-header">
                <h2>EFL Uganda Results</h2>
                <p class="subtitle">Season 2025/26</p>
            </div>
            <div class="results-container">
                ${resultsHTML || '<p class="no-results">No matches played yet</p>'}
            </div>
        `;
    };

    // Function to save match results
    window.saveMatchResult = function(matchId) {
        const matchCard = document.querySelector(`[data-match-id="${matchId}"]`);
        const homeScore = matchCard.querySelector('.home-score').value;
        const awayScore = matchCard.querySelector('.away-score').value;

        if (homeScore === '' || awayScore === '') {
            alert('Please enter both scores');
            return;
        }

        // Here you would typically save to your database
        console.log('Match Result Saved:', {
            matchId,
            homeScore: parseInt(homeScore),
            awayScore: parseInt(awayScore)
        });

        // Visual feedback
        const saveButton = matchCard.querySelector('.save-result');
        saveButton.textContent = 'Saved!';
        setTimeout(() => {
            saveButton.textContent = 'Save Result';
        }, 2000);
    };
});