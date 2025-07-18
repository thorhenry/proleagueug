document.addEventListener('DOMContentLoaded', () => {
    window.generateSecondLegFixtures = function(firstLegFixtures, clubsData) {
        return firstLegFixtures
            .filter(fixture => fixture.matchday)
            .map(fixture => {
                // Calculate new date by adding 15 days to the first leg date
                const firstLegDate = new Date(fixture.date);
                const secondLegDate = new Date(firstLegDate);
                secondLegDate.setDate(secondLegDate.getDate() + 15);

                return {
                    matchday: fixture.matchday + 15,
                    leg: "Second",
                    home: fixture.away,
                    away: fixture.home,
                    date: secondLegDate.toISOString().split('T')[0],
                    time: fixture.time,
                    venue: clubsData.find(club => club.name === fixture.away)?.stadium || fixture.venue
                };
            });
    };
});