from flask import Flask, jsonify
import couchdb
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
# connecting CouchDB
couch = couchdb.Server('http://admin:1dTY1!PWM2@172.26.133.51:5984/')
db = couch['mastodon_data_v3']
db2 = couch['mastodon_data_v2']

# proportion_sentiment
@app.route('/war/mastondon/proportion_sentiment')
def get_data():
    results = db.view('_design/war_sentiment/_view/proportion_sentiment', group=True)
    data = {}
    for row in results:
        data[row.key] = row.value
    return jsonify(data)

# proportion_sentiment_lang
@app.route('/war/mastondon/mag_sen_lang')
def get_data2():
    results = db2.view('_design/sentiment/_view/sentiment_language_RUwar', group=True)
    results2 = db.view('_design/war_sentiment/_view/magnitude_sentiment_lang', group=True)
    
    data = []
    all_language = []
    for row in results:
        if row.key[0] == None:
            continue
        if row.key[0] not in all_language:
            all_language.append(row.key[0])
        data.append(row)

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
        new_item = {
            "neg_sen": neg,
            "pos_sen": pos,
            "neu_sen": neu,
            "total": total,
            "neg%": neg/total,
            "pos%": pos/total,
            "neu%": neu/total
        }
        data1[i] = new_item

    for j in data1:
        for row in results2:
            if j == row.key["language"]:
                data1[j]["ave_sen"] = row.value["sentiment"]
                data1[j]["ave_mag"] = row.value["average_magnitude"]
        
    return jsonify(data1)


if __name__ == '__main__':
    app.run(debug=True) 