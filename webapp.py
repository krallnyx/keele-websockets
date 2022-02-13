from flask import Flask, render_template
import csv
import itertools
 
app = Flask(__name__)
 

@app.route('/')
def index():
    return 'Welcome to CSC40088 Fundamentals of Comp Sci'


@app.route('/advanced')
def display_data_d3():
    return render_template("advanced.html")


@app.route('/creative')
def display_creative_data_d3():
    return render_template("creative.html")


@app.route('/basic')
def display_data():
    with open('static/data/Kaggle_TwitterUSAirlineSentiment.csv', encoding='utf-8-sig') as csv_file:
        data = csv.reader(csv_file, delimiter=',')
        first_line = True
        tweetData = []
        for row in itertools.islice(data, 41):
            if not first_line:
                tweetData.append({
                    "id": row[0],
                    "airline_sentiment": row[1],
                    "airline_sentiment_confidence": row[2],
                    "airline": row[4],
                    "text": row[6],
                })
            else:
                first_line = False
        sorted_tweetData = sorted(tweetData, key=lambda i: i['airline_sentiment_confidence'])
        return render_template("basic.html", tweetData=sorted_tweetData)


app.run(host='0.0.0.0', port=8080)

