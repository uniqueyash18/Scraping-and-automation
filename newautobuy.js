const axios = require('axios');
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');
const { chromium } = require("playwright");
const flipkartUrl = 'https://www.flipkart.com/oneplus-nord-ce-3-lite-5g-chromatic-gray-128-gb/p/itm2cd5a4e659035?pid=MOBGZJ42KHUZZKMN&affid=adminnxtify&affExtParam1=EPTG2145609';
const botToken = '6094247030:AAGybodSZ0ZdtiCKDCzfsGKJM9CJzEF_Os0';
const chatId = '-1001174717490';
const targetPrice = 5000;

const sendTelegramNotification = (message) => {
  const bot = new TelegramBot(botToken);
  bot.sendMessage(chatId, message);
};

const scrapeFlipkart = async () => {
  try {
    const response = await axios.get(flipkartUrl);
    const $ = cheerio.load(response.data);
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
    // await page.click('//*[@id="container"]/div/div[2]/div/div[1]/div[4]/div/div/div[2]/div/label[1]/div[2]/div/div/div[3]/label[1]/div[1]') 
    // await page.click('//*[@id="container"]/div/div[2]/div/div[1]/div[4]/div/div/div[2]/div/label[1]/div[2]/div/div/div[3]/label[1]/div[2]/div/button') 
    // await page.waitForTimeout(2000)
    // sendTelegramNotification(page.url());
    // console.log('paymetn done')
    await browser.close();
    trackFlipkartPrice()
}

const trackFlipkartPrice = async () => {
  while (true) {
    try {
      const { price, stock } = await scrapeFlipkart();
      console.log(price, stock);
      if (parseFloat(price) < targetPrice && stock != 'Sold Out') {
        await buy(flipkartUrl)
        return
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
};

trackFlipkartPrice();
