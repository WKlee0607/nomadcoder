from flask import Flask, render_template, request, redirect, send_file
from stakoverflow import get_jobs
from wework import wework_get_jobs
from export import save_to_file

app = Flask("NeatRobusArchitect")

db = {}


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/report")
def report():
    word = request.args.get('word')
    if word:
        word = word.lower()
        existingJobs = db.get(word)
        if existingJobs:
            jobs = existingJobs
        else:
            jobs = get_jobs(word) + wework_get_jobs(word)
            db[word] = jobs  #db안에다가 넣어주는 것임
    return render_template("report.html",
                           SearchingBy=word,
                           resultNumber=len(jobs),
                           jobs=jobs)


@app.route("/export")
def export():
    try:
        word = request.args.get('word')
        if not word:
            raise Exception()
        word = word.lower()
        jobs = db.get(word)
        if not jobs:
            raise Exception()
        save_to_file(jobs)
        return send_file("jobs.csv")
    except:
        return redirect("/")


app.run(host="0.0.0.0")
