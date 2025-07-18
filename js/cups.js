export const initializeCupsPage = (data) => {
    const renderCups = () => {
        return `
            <div class="cups-container">
                <div class="cups-header">
                    <h2>EFL Cups & Tournaments</h2>
                    <p>Discover our exciting cup competitions</p>
                </div>
                <div class="cups-grid">
                    <div class="cup-card">
                        <img src="images/cups/efl-cup.jpg" alt="EFL Cup" class="cup-image">
                        <div class="cup-content">
                            <h3 class="cup-title">EFL Cup</h3>
                            <p class="cup-info">The premier knockout competition featuring all EFL teams.</p>
                            <span class="cup-status status-upcoming">Coming Soon</span>
                        </div>
                    </div>
                    <div class="cup-card">
                        <img src="images/cups/super-cup.jpg" alt="Super Cup" class="cup-image">
                        <div class="cup-content">
                            <h3 class="cup-title">EFL Super Cup</h3>
                            <p class="cup-info">Annual match between league champions and cup winners.</p>
                            <span class="cup-status status-upcoming">Coming Soon</span>
                        </div>
                    </div>
                    <div class="cup-card">
                        <img src="images/cups/charity-shield.jpg" alt="Community Shield" class="cup-image">
                        <div class="cup-content">
                            <h3 class="cup-title">Community Shield</h3>
                            <p class="cup-info">Season opener featuring last season's top teams.</p>
                            <span class="cup-status status-upcoming">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    return {
        renderCups
    };
};