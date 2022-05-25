import requests
from bs4 import BeautifulSoup

#pg=페이지


def get_last_page(url):
    result = requests.get(url)
    soup = BeautifulSoup(result.text, "html.parser")
    pages = soup.find("div", {"class": "s-pagination"}).find_all("a")
    last_page = pages[-2].get_text().strip()
    return int(last_page)


def extract_job(html):
    title = html.find("div", {
        "class": "fl1"
    }).find("h2", {
        "class": "mb4"
    }).find("a", {
        "class": "s-link"
    }).string.strip()

    location, company = html.find("div", {
        "class": "ff-row-wrap"
    }).find_all("div", {"class": "fc-black-500"}, recursive=False)
    location = location.get_text(strip=True).strip("\n").strip(
        " \r")  #\r도 \n과 마찬가지로 한 줄 띄어쓰기임
    company = company.text
    job_id = html.find("a", {"class": "s-link"})["href"]
    return {
        'title': title,
        'company': company,
        'location': location,
        "apply_link": f"https://stackoverflow.com/{job_id}"
    }


def extract_jobs(last_page, url):
    jobs = []
    for page in range(last_page):
        print(f"Scrapping S0: page: {page}")
        result = requests.get(f"{url}&pg={page+1}")
        soup = BeautifulSoup(result.text, "html.parser")
        results = soup.find_all("div", {"class": "-company"})
        for result in results:
            job = extract_job(result)
            jobs.append(job)
    return jobs
    #result = result.find("div", {"class": "dismiss-trigger"})


def get_jobs(word):
    url = f"https://stackoverflow.com/jobs/companies?q={word}"
    last_page = get_last_page(url)
    jobs = extract_jobs(last_page, url)
    return jobs
