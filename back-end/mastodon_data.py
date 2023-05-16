from flask import Flask, jsonify
import couchdb
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

# connecting CouchDB
couch = couchdb.Server('http://admin:1dTY1!PWM2@172.26.133.51:5984/')
db = couch['mastodon_data_v2']
db2 = couch['mastodon_data_v3']

#Languages vs sentiment 
@app.route('/mastondon_languages_sentiment')
def get_data():
    # Queries the view and returns data
    results = db.view('_design/sentiment/_view/sentiment_language_RUwar', group=True)
    
    data = []
    all_language = []
    sum_sentiment = 0
    for row in results:
        if row.key[0] == None:
            continue
        if row.key[0] not in all_language:
            all_language.append(row.key[0])
        data.append(row)
        sum_sentiment += row.value

    data1 = {}
    for i in all_language:
        neg = 0
        pos = 0
        neu = 0
        total = 0
        for j in data:
            if j.key[0] == i:
                total += j.value
                if j.key[1] == "Positive":
                    pos += j.value
                if j.key[1] == "Negative":
                    neg += j.value
                if j.key[1] == "Neutral":
                    neu += j.value

        if [neg, pos, neu].index(max([neg, pos, neu])) == 0:
            sen = -total/sum_sentiment
        else:
            sen = total/sum_sentiment
        new_item = {
            "Negative Proportion": neg/total,
            "Neutral Proportion": neu/total,
            "Positive Proportion": pos/total,
            "Average Sentiment": sen,
            "Total": total,
        }
        data1[i] = new_item
        
    return jsonify(data1)

# RUwar_sentiment
@app.route('/mastondon_RUwar_sentiment')
def get_data5():
    results = db.view('_design/sentiment/_view/RUwar', group=True)

    data = {}
    for row in results:
        data[row.key] = row.value
    return jsonify(data)

# mag_sen_lang
@app.route('/mastondon_mag_sen_lang')
def get_data1():
    results = db2.view('_design/war_sentiment/_view/magnitude_sentiment_lang', group=True)
    data = {}
    for row in results:
        if row.key["language"] == None:
            continue
        new = {}
        for i in row.value:
            new[i] = row.value[i]

        data[row.key["language"]] = new
        
    return jsonify(data)

# post_hour_count
@app.route('/mastondon_post_hour_count')
def get_data2():
    results = db2.view('_design/war_sentiment/_view/post_hour_count', group=True)
    data = []
    all_language = []
    for row in results:
        if row.key["language"] == None:
            continue
        if row.key["language"] not in all_language:
            all_language.append(row.key["language"])
        data.append(row)

    data1 = {}
    for i in all_language:
        new = {}
        for j in data:
            if j.key["language"] == i:
                new[j.key["hourRange"]] = j.value
        data1[i] = new        
    return jsonify(data1)

# night_post_count
@app.route('/mastondon_night_post_count')
def get_data3():
    results = db2.view('_design/war_sentiment/_view/night_post_count', group=True)
    data = []
    all_language = []
    for row in results:
        if row.key["language"] == None:
            continue
        if row.key["language"] not in all_language:
            all_language.append(row.key["language"])
        data.append(row)

    data1 = {}
    for i in all_language:
        new = {}
        for j in data:
            if j.key["language"] == i:
                new[j.key["hourRange"]] = j.value
        data1[i] = new        
    return jsonify(data1)

# proportion_sentiment
@app.route('/mastondon_proportion_sentiment')
def get_data4():
    results = db2.view('_design/war_sentiment/_view/proportion_sentiment', group=True)

    data = {}
    for row in results:
        data[row.key] = row.value
    return jsonify(data)
if __name__ == '__main__':
    app.run(debug=True) 
