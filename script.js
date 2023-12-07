const names = [
    "Kameron", "Wesley", "Rylen", "Brody", "Corbin", "Tavien", "Sawyer", "Daniel", "Michael", "Max",
    "Walker", "Darby", "Bryce", "Jimmy", "Matthew", "Nick", "Kyle", "Kolten", "Joey", "Parker",
    "Matthew Spignardo", "Grayson", "Robby", "Harrison", "Trey", "Matthew Yaun", "Cade", "Max Stafford",
    "Riley", "Roane", "Patrick", "Gannon", "Matthew Esse", "Marin", "Brighton", "Pierce Mullen", "Tyson"
];



let currentMatchupIndex = 0;
let matchups = shuffleAndPair(names);
let leaderboard = {};

function shuffleAndPair(names) {
    let shuffled = [...names];
    shuffled.sort(() => 0.5 - Math.random());
    let pairs = [];
    for (let i = 0; i < shuffled.length; i += 2) {
        if (shuffled[i + 1]) {
            pairs.push([shuffled[i], shuffled[i + 1]]);
        }
    }
    return pairs;
}

function calculateMatchDifficulty(contestant1, contestant2) {
    // Example difficulty calculation
    return Math.floor(Math.random() * 3) + 1; // Difficulty ranges from 1 to 3
}

function chooseWinner(winner, loser) {
    let difficulty = calculateMatchDifficulty(winner, loser);

    // Add points to the winner
    leaderboard[winner] = (leaderboard[winner] || 0) + difficulty;

    // Subtract a point from the loser if they have points
    if (leaderboard[loser]) {
        leaderboard[loser] -= 1;
    }

    // Move to the next matchup or generate new matchups
    currentMatchupIndex++;
    if (currentMatchupIndex >= matchups.length) {
        currentMatchupIndex = 0;
        matchups = shuffleAndPair(names);
    }

    displayMatchup();
    updateLeaderboardDisplay();
}

function handleTie(contestant1, contestant2) {
    // In case of a tie, you might want to give each contestant a point or no points
    // Here's an example where each contestant gets 1 point
    leaderboard[contestant1] = (leaderboard[contestant1] || 0) + 1;
    leaderboard[contestant2] = (leaderboard[contestant2] || 0) + 1;

    // Move to the next matchup or generate new matchups
    currentMatchupIndex++;
    if (currentMatchupIndex >= matchups.length) {
        currentMatchupIndex = 0;
        matchups = shuffleAndPair(names);
    }

    displayMatchup();
    updateLeaderboardDisplay();
}

function displayMatchup() {
    if (currentMatchupIndex < matchups.length) {
        let matchup = matchups[currentMatchupIndex];
        document.getElementById("matchupContainer").innerHTML = `
            <div>Who would win in a fight?</div>
            <button onclick="chooseWinner('${matchup[0]}', '${matchup[1]}')">${matchup[0]}</button>
            vs
            <button onclick="chooseWinner('${matchup[1]}', '${matchup[0]}')">${matchup[1]}</button>
            <button onclick="handleTie('${matchup[0]}', '${matchup[1]}')">Tie</button>
        `;
    } else {
        document.getElementById("matchupContainer").innerHTML = `<div>All matchups completed!</div>`;
    }
}


function updateLeaderboardDisplay() {
    let sortedLeaderboard = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
    let leaderboardHTML = "<h2>Leaderboard</h2>";
    sortedLeaderboard.forEach(([name, score]) => {
        leaderboardHTML += `<div>${name}: ${score} points</div>`;
    });
    document.getElementById("leaderboardContainer").innerHTML = leaderboardHTML;
}

// Initial setup
displayMatchup();
