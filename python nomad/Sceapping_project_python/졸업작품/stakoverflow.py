import requests
from bs4 import BeautifulSoup


def last_pages(stackover_url):
    result = requests.get(stackover_url)
    soup = BeautifulSoup(result.text, "html.parser")
    stackover_pagination = soup.find("div", {
        "class": "container"
    }).find("div", {
        "id": "content"
    }).find("div", {"class": "s-pagination"})
    a_pagination = stackover_pagination.find_all(
        "a", {"class": "s-pagination--item"})
    pages = []
    for last_page in a_pagination[:-1]:
        pages.append(int(last_page.find("span").string))
    max_page = pages[-1]
    return max_page


def extract_job(result):
    company = result.find("h2", {
        "class": "mb4"
    }).find("a", {"class", "s-link"}).text
    link = result.find("h2", {
        "class": "mb4"
    }).find("a", {"class", "s-link"})["href"]
    title = result.find("div", "ff-row-wrap").find_all("div")[1]
    for a in title:
        title = a.text
    return {
        "title": title,
        "company": company,
        "link": f"https://stackoverflow.com{link}"
    }


def extract_jobs(last_page, stackover_url):
    jobs = []
    for page in range(last_page):
        result = requests.get(f"{stackover_url}&pg={page+1}")
        soup = BeautifulSoup(result.text, "html.parser")
        company_list = soup.find("div", {
            "id": "content"
        }).find("div", {"class": "company-list"})
        results = company_list.find_all("div", {"class": "-company"})
        for result in results:
            job = extract_job(result)
            jobs.append(job)
    return jobs


def get_jobs(word):
    stackover_url = f"https://stackoverflow.com/jobs/companies?q={word}"
    last_page = last_pages(stackover_url)
    jobs = extract_jobs(last_page, stackover_url)
    return jobs
