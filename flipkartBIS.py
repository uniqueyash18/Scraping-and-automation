import requests
from lxml import etree

def scrape_flipkart(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = requests.get(url, headers=headers)
    html = response.text
    tree = etree.HTML(html)
    try:
        price = tree.xpath('//*[@id="container"]/div/div[3]/div[1]/div[2]/div[2]/div/div[3]/div[1]/div/div[1]')[0].text.strip().replace("₹",'').replace(",",'')
        stock=tree.xpath('//*[@id="container"]/div/div[3]/div[1]/div[2]/div[3]/div[1]')[0].text.strip()
    except:
        price=1000000000
        stock='Sold Out hai'
    return price,stock
flipkart_url = 'https://www.flipkart.com/vivo-v23e-sunshine-gold-128-gb/p/itmf065ae9f180ed?pid=MOBGQQCJU4BDZHYJ&sattr[]=size&st=size?affid=rohanpouri&affExtParam1=ENKR20230422A397674215&affExtParam2=ENKR20230422A397674215'
bot_token = '6094247030:AAGybodSZ0ZdtiCKDCzfsGKJM9CJzEF_Os0'
chat_id = '-1001174717490'
def send_telegram_notification(bot_token, chat_id, message):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    params = {
        "chat_id": chat_id,
        "text": message
    }
    response = requests.post(url, params=params)
    
while True:
     flipkart_price,stock_status = scrape_flipkart(flipkart_url)
     print(flipkart_price,stock_status)
     if float(flipkart_price)<5000 and stock_status !='Sold Out':
        send_telegram_notification(bot_token, chat_id,flipkart_url+ "\n price : Rs" +flipkart_price)   



