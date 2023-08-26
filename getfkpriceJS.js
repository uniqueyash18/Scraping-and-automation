const rp = require('request-promise');
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');
const { chromium } = require("playwright");
const flipkartUrl = 'https://www.flipkart.com/oneplus-11r-5g-sonic-black-128-gb/p/itmd8344a066fd54?pid=MOBGN3AF8GEAKKNA';
const botToken = '6094247030:AAGybodSZ0ZdtiCKDCzfsGKJM9CJzEF_Os0';
const chatId = '-1001174717490';
const targetPrice = 5000;

const sendTelegramNotification = (message) => {
  const bot = new TelegramBot(botToken);
  bot.sendMessage(chatId, message);
};

const scrapeFlipkart = async () => {
  const options = {
    url: flipkartUrl,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    }
  };

  try {
    const html = await rp(options);
    const $ = cheerio.load(html);
    const price = $('.aMaAEs .dyC4hf .CEmiEU ._16Jk6d').text().trim().replace('₹', '').replace(',', '');
    const stock = $('._16FRp0').text().trim();
    return { price, stock };
  } catch (error) {
    return { price: '1000000000', stock: 'Sold Out hai' };
  }
};
const buy = async(myurl) => {
  const browser = await chromium.launchPersistentContext("C:\\Users\\Yash\\AppData\\Local\\Google\\Chrome\\User Data",{
      executablePath:"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",headless: false});
  const page = await browser.newPage();
  await page.goto(myurl);
  await page.click('//*[@id="container"]/div/div[3]/div[1]/div[1]/div[2]/div/ul/li[2]/form/button');
    await page.click('//*[@id="to-payment"]/button')
    await page.click('//*[@id="container"]/div/div[2]/div/div[1]/div[4]/div/div/div[2]/div/label[1]/div[1]')
    await page.click('//*[@id="container"]/div/div[2]/div/div[1]/div[4]/div/div/div[2]/div/label[1]/div[2]/div/div/div[3]/label[1]/div[1]') 
    await page.click('//*[@id="container"]/div/div[2]/div/div[1]/div[4]/div/div/div[2]/div/label[1]/div[2]/div/div/div[3]/label[1]/div[2]/div/button') 
    await page.waitForTimeout(2000)
    sendTelegramNotification(page.url());
    console.log('paymetn done')
    await browser.close();
    trackFlipkartPrice()
}

const trackFlipkartPrice = async () => {
  while (true) {
    try {
      const { price, stock } = await scrapeFlipkart();
      console.log(price, stock);
      if (parseFloat(price) < targetPrice && stock !== 'Sold Out hai') {
        await buy(flipkartUrl)
        return
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
};

trackFlipkartPrice();
