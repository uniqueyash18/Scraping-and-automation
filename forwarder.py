from telethon import TelegramClient, events

# Replace 'YOUR_API_ID' and 'YOUR_API_HASH' with the credentials obtained from Telegram.
api_id = '16884803'
api_hash = '88f9750705005a2de3df3c50ee6052ad'

# Replace 'YOUR_PHONE_NUMBER' with your phone number, including the country code.
phone_number = '+918146789775'

# Create a TelegramClient object
client = TelegramClient('session_name', api_id, api_hash)

async def forward_to_private_chat(event):
    your_private_chat_id = '505243940'
    await event.message.forward_to(your_private_chat_id)

@client.on(events.NewMessage(incoming=True, chats='Deals Dunia'))
async def handle_new_message(event):
    await forward_to_private_chat(event)

async def main():
    # Start the client
    await client.start(phone_number)
    await client.run_until_disconnected()

if __name__ == '__main__':
    client.loop.run_until_complete(main())