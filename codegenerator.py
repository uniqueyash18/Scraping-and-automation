from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import time

def fill_form(code, first_name, last_name, phone_number, email, state, age):
    # Replace 'your_form_url_here' with the URL of the form you want to fill
    form_url = 'https://williamlawsons.woohoo.in/claimreward'

    # Initialize Chrome browser with ChromeDriver
    driver = webdriver.Chrome(executable_path='C:\\Users\\Yash\\Desktop\\FLipkart Autobuy\\chromedriver.exe')

    # Open the form URL
    driver.get(form_url)

    # Locate the form elements and fill them with the data
    code_input_element = driver.find_element('id','couponcode')
    first_name_input = driver.find_element('id','FirstName')
    last_name_input = driver.find_element('id','LastName')
    phone_input = driver.find_element('id','mobilenumber')
    email_input = driver.find_element('id','Email')
    state_dropdown = driver.find_element('id','State')
    age_input = driver.find_element('id','txtDOB')
    checkbox = driver.find_element('id','termscondition')
    submit_button = driver.find_element('id','btnSendOTP')

    code_input_element.send_keys(code)
    first_name_input.send_keys(first_name)
    last_name_input.send_keys(last_name)
    phone_input.send_keys(phone_number)
    email_input.send_keys(email)
    state_dropdown.send_keys(state)
    age_input.send_keys(age)
    checkbox.click()
    time.sleep(1)
    submit_button.click()
    time.sleep(1)

    try:
        # Check if the popup indicating code is already used is present
        popup_element = driver.find_element('id','divAddComment')

        # If popup is present, close it and continue with the next code
        if popup_element.is_displayed():
            close_button = driver.find_element('id','btnCancel')
            close_button.click()

    except NoSuchElementException:
        # If the popup element is not found, wait for a few seconds to ensure the form is submitted
        print(code)
        time.sleep(5)

    # Close the browser
    driver.quit()

if __name__ == "__main__":
    # Assuming you have loaded the codes from the Excel file 'all_codes.xlsx' using pandas
    import pandas as pd
    data = pd.read_excel('all_codes.xlsx')
    all_codes = data['Codes'].tolist()

    # Sample data for other form fields (Modify this according to your use case)
    sample_first_name = 'Yash'
    sample_last_name = 'Chouhan'
    sample_phone_number = '8146789774'
    sample_email = 'yash18chouhan@gmail.com'
    sample_state = 'Telangana'
    sample_age = '21'
    for code in all_codes:
        fill_form(code, sample_first_name, sample_last_name, sample_phone_number, sample_email, sample_state, sample_age)
