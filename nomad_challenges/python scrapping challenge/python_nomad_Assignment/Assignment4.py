#원본
import requests
import os

wel = "Welcome to IsItDown.py!\nplease write a URL or URLs you want to check. (separated by comma)"
print(wel)


#list_url에 다듬어서 넣어주기
def check_url():
    list_url = []
    url = input()
    url_list = str(url).split(",")  # str변환 ,로 다 나눠줌 -> 리스트화
    for i in range(len(url_list)):
        url_lower = url_list[i].strip().lower()  # 빈공간 제거, 소문자 출력
        if "http" not in url_lower:  #http 더하기
            list_url.append("http://" + str(url_lower)) # 리스트에 추가
        else:
            list_url.append(url_lower)  #리스트에 추가

    for i in list_url:
        try:
            req_result = requests.get(i)
            req_code = req_result.status_code
            if req_code == 200:
                print(f"{i} is up!")
        except:
            print(f"{i} is down!")

    while "the answer is invalid":
        reply = input("Do you want to start over? (y/n) :").lower().strip()
        if reply == "y":
            os.system('clear')
            print(wel)
            return check_url()

        elif reply == "n":
            print("k.bye")
            break
        else:
            print("That is not a valid answer")
            continue


check_url()

#노트
