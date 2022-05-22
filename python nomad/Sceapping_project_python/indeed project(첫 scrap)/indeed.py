#requests = 파이썬에서 요청을 만드는 기능을 모아둠
import requests
from bs4 import BeautifulSoup  #beautifulsoup가져오기

Limit = 50
url = f"https://kr.indeed.com/jobs?q=python&limit={Limit}"


def get_last_pages():
    result = requests.get(url)
    soup = BeautifulSoup(result.text, "html.parser")
    pagination = soup.find("div", {"class": "pagination"})
    links = pagination.find_all('a')
    pages = []
    for link in links[:-1]:
        pages.append(int(link.find("span").string))

    max_page = pages[-1]
    return max_page


def extract_job(html):
    jobtitle = html.find("h2", {'class': "jobTitle"})
    title = jobtitle.find("span", title=True).text  #일자리명을 찾음
    company = html.find("span", {"class": "companyName"})  #soup형태
    company_anchor = company.find("a")
    if company_anchor is not None:
        company = (str(company_anchor.string))  #str형태
    else:
        company = (str(company.string))
        #변수에다가 새로운 값을 넣을 수 있다. 위의 company가 그 예시. 처음(soup) -> 나중(str)
    location = html.find("div", {"class": "companyLocation"}).text
    job_id = html["data-jk"]
    return {
        'title': title,
        'company': company,
        'location': location,
        "link": f"https://kr.indeed.com/채용보기?jk={job_id}"
    }


def extract_jobs(last_page):
    jobs = []
    for page in range(last_page):
        print(f"Scrapping indeed page {page}")
        result = requests.get(f"{url}&start={page*Limit}")
        soup = BeautifulSoup(
            result.text,
            "html.parser")  #beautifulsoup(추출원본, 구조분석을 할 형태(html,py 등))
        results = soup.find_all("a", {"class": "fs-unmask"})  #각 한개의 일자리 칸을 나타냄
        for result in results:
            job = extract_job(result)
            jobs.append(job)  #리스트에 dictionary추가 가능
    return jobs


def get_jobs():
    last_page = get_last_pages()
    jobs = extract_jobs(last_page)
    return jobs
