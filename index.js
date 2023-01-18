const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config()

const bookHighlights = {};

(async () => {
  async function getHighlights(page) {
    const highlights = await page.evaluate(() => {
      const grabHighlights = document.querySelectorAll('.kp-notebook-highlight-yellow');
      let highlightsText = [];
      grabHighlights.forEach((highlightElement) => {
        highlightsText.push(highlightElement.innerText);
      });

      return highlightsText;
    });

    return highlights;
  }

  const waitSeconds = (s) => new Promise((resolve) => setTimeout(resolve, 1000*s));

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Step 1: log in
  await page.goto('https://read.amazon.com/kp/notebook');

  await page.type('#ap_email', process.env.EMAIL); 
  await page.type('#ap_password', process.env.EMAIL_PASSWORD);
  await page.click('#signInSubmit');
  await page.waitForNavigation();

  await waitSeconds(10);

  // Step 2: scrape highlights
  const bookElements = await page.$$("#library-section div.kp-notebook-library-each-book");

  for (let i = 0; i < bookElements.length; i++) {
    await bookElements[i].click();

    await waitSeconds(10);

    let title = await bookElements[i].$eval('h2.kp-notebook-searchable', el => el.innerText);
    const highlights = await getHighlights(page);
    
    console.log(`${i+1}/${bookElements.length}: ${title} - scraped ${highlights.length} highlights.`);
    bookHighlights[title] = highlights;
  }

  // Step 3: Store highlights locally
  console.log(bookHighlights);
  fs.writeFileSync('highlights.json', JSON.stringify(bookHighlights, null, 2));

  // Next: store in Google Drive
  // https://developers.google.com/drive/api/v3/quickstart/nodejs


  await browser.close();
})();
