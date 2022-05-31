from flask import Flask, render_template, request, redirect, send_file
from scrapper import get_jobs
from exporter import save_to_file

app = Flask("NeatRobusArchitect")

db = {}


@app.route("/")  #@는 데코레이터. 바로 아래에 있는 함수만을 봄. 즉 바로 밑 함수만을 처리함
def home():
    return render_template("potato.html")


@app.route("/report")
def report():
    word = request.args.get(
        'word'
    )  #이 word는 url에서 가져온 것임. /다음에 나오는게 argument임. 그리고 이 word가 jobs에 있는지 확인하는 거임 이 명령문은.

    # word: input의 name임 이걸 가져온단거임. URL창에
    if word:
        word = word.lower()
        existingJobs = db.get(word)
        if existingJobs:
            jobs = existingJobs
        else:
            jobs = get_jobs(word)
            db[word] = jobs
    else:
        return redirect("/")
    return render_template("report.html",
                           SearchingBy=word,
                           resultNumber=len(jobs),
                           jobs=jobs)  #여기서의 job등 모든 것은 template에 있는html로 보내줌


@app.route("/export")
def export():
    try:
        word = request.args.get('word')
        if not word:
            raise Exception()  #Exception즉, 오류를 발생시킨다는 뜻 ->그렇게 되면 except로 감
            word = word.lower()
        jobs = db.get(word)
        if not jobs:
            raise Exception()
        save_to_file(jobs)
        return send_file("jobs.csv")
    except:
        return redirect("/")


app.run(host="0.0.0.0")
