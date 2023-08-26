const { chromium } = require("playwright");

 const buy = async() => {
  const browser = await chromium.launchPersistentContext(
    "C:\\Users\\Yash\\AppData\\Local\\Google\\Chrome\\User Data",
    {
      executablePath:
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      headless: false,
    }
  );
  const page = await browser.newPage();

  await page.goto(
    "https://www.flipkart.com/supernova-inc-slim-men-light-blue-jeans/p/itm0462b269ee3cf?pid=JEAGYTZNHDZKYQRR&lid=LSTJEAGYTZNHDZKYQRRSCQNFF&marketplace=FLIPKART&store=clo%2Fvua&srno=b_1_1&otracker=browse&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_2_L1_view-all&fm=organic&iid=en_OP7QrBoJ_D9bzFuplsrhrigVcVBjrGe34XOuj-SmFre7vRy7rh-O7D8glFZXCZqTeeSxNbo3s9YWJTEUMqASJA%3D%3D&ppt=hp&ppn=homepage&ssid=ax53j18h8g0000001687980193737"
  );
  await page.click('//*[@id="swatch-0-size"]/a');
  await page.click('//*[@id="container"]/div/div[3]/div[1]/div[1]/div[2]/div/ul/li[2]/form/button');
  await page.click('//*[@id="CNTCT8C187543FB38467C93E983839"]/button');
  await page.click('//*[@id="to-payment"]/button') 
  // await browser.close();
}
buy()