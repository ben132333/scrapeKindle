const fs = require('fs');

function importHighlights() {
    var highlights = JSON.parse(fs.readFileSync('highlights.json', 'utf8'));
    return highlights;
}

const highlights = importHighlights();
console.log('Total number of books highlighted in:', Object.keys(highlights).length);
console.log();

const bookHighlightCount = {};
for (const book in highlights) {
    bookHighlightCount[book] = highlights[book].length;
}

const sortedBookHighlightCount = Object.entries(bookHighlightCount).sort((a, b) => b[1] - a[1]);

console.log('Top 5 most highlighted books:');
const top5Highlights = sortedBookHighlightCount.slice(0, 5);
top5Highlights.forEach((book) => {
    console.log(`- ${book[0]}: ${book[1]}`);
});
console.log();

// Get random book and highlight
function getRandomInt(N) {
    return Math.floor(N * Math.random());
}

function getRandomBook(highlights) {
    const BookArray = Object.keys(highlights);
    const nrBooks = BookArray.length;
    const randomIndex = getRandomInt(nrBooks);

    return BookArray[randomIndex];
}

function getRandomHighlights(book) {
    const bookHighlights = highlights[book];
    const randomIndex = getRandomInt(bookHighlights.length);

    return highlights[book][randomIndex];
}

const book = getRandomBook(highlights);
console.log('Random book:', book);
console.log();

const randomHighlights = getRandomHighlights(book);
console.log('Random highlights:');
console.log(randomHighlights);
console.log();

/*
Ideas for future:
- query a random quote from Roam or Logsec
- query two random quotes, merge the two ideas in your own words. Save the result.
- Can I save the highlights on IPFS or Arweave and query them from there?
- Can I host the API on polygon so you get a random quote by sending a transaction?
*/