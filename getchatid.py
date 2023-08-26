# from telethon.sync import TelegramClient

# # Replace 'YOUR_API_ID' and 'YOUR_API_HASH' with the credentials obtained from Telegram.
# api_id = '16884803'
# api_hash = '88f9750705005a2de3df3c50ee6052ad'

# # Replace 'YOUR_PHONE_NUMBER' with your phone number, including the country code.
# phone_number = '+918146789775'

# async def get_chat_id():
#     async with TelegramClient('session_name', api_id, api_hash) as client:
#         result = await client.get_entity('uniqueyash2001')
#         print(f"Chat ID: {result.id}")

# import asyncio
# asyncio.run(get_chat_id())


# ////
from telethon.sync import TelegramClient

# Replace 'YOUR_API_ID' and 'YOUR_API_HASH' with the credentials obtained from Telegram.
api_id = '16884803'
api_hash = '88f9750705005a2de3df3c50ee6052ad'

# Replace 'YOUR_PHONE_NUMBER' with your phone number, including the country code.
phone_number = '+918146789775'

async def get_group_id(group_title):
    async with TelegramClient('session_name', api_id, api_hash) as client:
        try:
            async for dialog in client.iter_dialogs():
                if dialog.is_group and dialog.title == group_title:
                    print(f"Group ID: {dialog.id}")
                    return
            print("Group not found.")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == '__main__':
    # Replace 'YOUR_GROUP_TITLE' with the title of the group you want to get the ID for.
    YOUR_GROUP_TITLE = 'Deals Dunia'
    import asyncio
    asyncio.run(get_group_id(YOUR_GROUP_TITLE))
