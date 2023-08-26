const puppeteer = require('puppeteer');

(async () => {
  const userDataDir = "C:\\Users\\Yash\\AppData\\Local\\Google\\Chrome\\User Data";
  const executablePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

  // Launch Chrome with user data directory and headless: false
  const browser = await puppeteer.launch({
    executablePath,
    userDataDir,
    headless: false
  });

  // Create a new page
  const page = await browser.newPage();

  // Navigate to your desired URL
  const myurl = "https://google.com"; // Replace this with your URL
  await page.goto(myurl);

  // Add any further actions you want to perform on the page

  // Don't close the browser immediately, keep it open for interaction
  // await browser.close();
})();
