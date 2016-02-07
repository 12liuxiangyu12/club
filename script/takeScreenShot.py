from selenium import webdriver
import urllib
import json
import platform
from time import sleep
import traceback

api_no_pic = "http://localhost:5555/api/v1/getNoPicWeb"
api_insert_pic = "http://localhost:5555/api/v1/setPicForWeb?"
web_list = urllib.urlopen(api_no_pic)
web_list = json.load(web_list)
insert_list = []

def take_screen_shot(insert_list):
    if not insert_list:
        return
    if 'Linux' in platform.platform():
        from pyvirtualdisplay import Display
        display = Display(visible=0, size=(800, 800))
        display.start()
    driver = webdriver.Chrome()
    driver.maximize_window()
    for id,url in insert_list:
        try:
            driver.get(url)
            path = '/images/' + str(id) + ".png"
            sleep(5)
            driver.save_screenshot("../public" + path)
            insert_url = api_insert_pic + "id=" + str(id) + "&path=" + path
            urllib.urlopen(insert_url)
        except Exception, e:
            exstr = traceback.format_exc()
            print exstr
            print Exception
        finally:
            pass
    driver.quit()
    if 'Linux' in platform.platform():
        display.stop()

for web in web_list:
    print web
    id = web.get('id')
    url = web.get('url')
    if not id or not url:
        continue
    print id,url
    insert_list.append((id, url))
take_screen_shot(insert_list)
#driver = webdriver.Chrome()
#url = "http://www.baidu.com"
#driver.maximize_window()
#driver.get(url)
#driver.save_screenshot("./test.png")
#driver.close()
