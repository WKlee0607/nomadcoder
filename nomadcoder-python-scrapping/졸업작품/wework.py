"""

https://remoteok.io/remote-dev+python-jobs
"""
import requests
import csv
from bs4 import BeautifulSoup


def write_company(jobs):
    file = open(f"wework_remote.csv", mode="w")
    writer = csv.writer(file)
    writer.writerow(["title", "company", "link"])
    for job in jobs:
        print(job.values())
        writer.writerow((list(job.values())))
    return


def wework_get_jobs(word):
    jobs = []
    url = f"https://weworkremotely.com/remote-jobs/search?term={word}"
    result = requests.get(url)
    soup = BeautifulSoup(result.text, "html.parser")
    job_container = soup.find("div", {
        "class": "content"
    }).find("div", {
        "id": "job_list"
    }).find_all("section", {"class": "jobs"})
    for section in job_container:
        lis = section.find("ul").find_all("li")
        for li in lis:
            link = li.find_all("a")
            for lin in link:

                if "/remote-jobs" in lin["href"] or "/listings" in lin["href"]:
                    link = lin["href"]
                    link = f"https://weworkremotely.com{link}"
                    title = lin.find("span", {"class": "title"})
                    if title:
                        title = title.text
                    company = lin.find("span", {"class": "company"})
                    if company:
                        company = company.text
                    job = {"title": title, "company": company, "link": link}

                    jobs.append(job)
    return jobs
