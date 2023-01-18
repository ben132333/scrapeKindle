const fs = require('fs');

function importHighlights() {
    var highlights = JSON.parse(fs.readFileSync('highlights.json', 'utf8'));
    return highlights;
}

const highlights = importHighlights();
const bookHighlightCount = {};
for (const book in highlights) {
    bookHighlightCount[book] = highlights[book].length;
}

const sortedBookHighlightCount = Object.entries(bookHighlightCount).sort((a, b) => b[1] - a[1]);

const top5Highlights = sortedBookHighlightCount.slice(0, 5);
top5Highlights.forEach((book) => {
    console.log(`${book[0]}: ${book[1]}`);
});
