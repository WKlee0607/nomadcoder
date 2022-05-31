import os
import requests


def restart():
    answer = str(input("Do you want to start over? y/n ")).lower()
    if answer == "y" or answer == "n":
        if answer == "n":
            print("k.bye!")
            return
        elif answer == "y":
            main()
    else:
        print("That's not a valid answer")
        restart()


def main():
    os.system('clear')
    print(
        "Welcome to IsItDown.py!\nPlease write a URL or URLs you want to check. (separated by comma)"
    )
    urls = str(input()).lower().split(",")  #리스트 형태로 저장됨
    for url in urls:
        url.strip()
        if "." not in url:
            print(url, "is not a valid URL.")
        else:
            if "http" not in url:
                url = f"http://{url}"
            try:
                request = requests.get(url)
                if request.status_code == 200:
                    print(url, "is up!")
                else:
                    print(url, "is down!")
            except:
                print(url, "is down!")
    restart()


main()
