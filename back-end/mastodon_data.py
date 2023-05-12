from flask import Flask, jsonify
import couchdb
import json

app = Flask(__name__)

# connecting CouchDB
couch = couchdb.Server('http://admin:1dTY1!PWM2@172.26.133.51:5984/')
db = couch['mastodon_data_v2']

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
if __name__ == '__main__':
    app.run(debug=True) 
