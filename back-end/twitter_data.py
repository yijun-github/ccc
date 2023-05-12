import json
from flask import Flask, jsonify
import couchdb

app = Flask(__name__)

couch = couchdb.Server('http://admin:1dTY1!PWM2@172.26.133.51:5984/')
db = couch['huge-twitter-v2']

"""
New South Wales
Victoria
Queensland
South Australia
Western Australia
Tasmania
Northern Territory
Australian Capital Territory
Other Territories
"""


#print(gcc_geo["features"][0]["properties"]['GCC_CODE21'])
"""
data["features"][0].keys(): ['type', 'geometry', 'properties']
for i in range(9):
    print(state_geo["features"][i]["properties"]["STE_NAME21"])
"""

#state_sentiment
with open('geoJSON files/states/STE_2021_AUST_GDA2020_Simplified.json', 'r') as file:
        state_geo = json.load(file)
@app.route('/state_sentiment')
def get_points():
    results = db.view('_design/sentiment/_view/state_sentiment', group=True)

    data = []
    all_state = []
    sum_sentiment = 0
    for row in results:
        if row.key[0] == None:
            continue
        if row.key[0] not in all_state:
            all_state.append(row.key[0])
        data.append(row)
        sum_sentiment += row.value

    data1 = {}
    for i in all_state:
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
    with open('json_output_state_sentiment.json', 'w') as f:
        json.dump(data1, f)

    for row in data1:
        for feature in state_geo['features']:
            if feature["properties"]["STE_NAME21"].lower() == row:
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]


    with open('geo_output_state_sentiment.json', 'w') as file:
        json.dump(state_geo, file)

    return jsonify(state_geo)

#gcc_sentiment
with open('geoJSON files/gcc/GCCSA_2021_AUST_GDA2020.json', 'r') as file2:
        gcc_geo = json.load(file2)
        
@app.route('/gcc_sentiment')
def get_points1():
    results = db.view('_design/sentiment/_view/sum_sent_gcc', group=True)
    results1 = db.view('_design/sentiment/_view/ave_sent_gcc', group=True)

    data = {}
    for row in results:
        for ii in results1:
            if ii.key == row.key:
                ave_sen = ii.value["sentiment"]
        new_item = {
            "Average sentiment": ave_sen,
            "Sum of Sentiment": row.value["sentiment"],
            "Total": row.value["count"],
        }
        data[row.key] = new_item

    with open('json_output_gcc_sentiment.json', 'w') as f:
        json.dump(data, f)

    for row in data:
        for feature in gcc_geo['features']:
            if feature["properties"]['GCC_CODE21'].lower() == row:
                for i in data[row]:
                    feature["properties"][i] = data[row][i]

    with open('geo_output_gcc_sentiment.json', 'w') as file22:
        json.dump(gcc_geo, file22)

    return jsonify(gcc_geo)

#postcode_sentiment
@app.route('/postcode_sentiment')
def get_points2():
    # Queries the view and returns data
    results = db.view('_design/sentiment/_view/war_postcode', group=True)
    results1 = db.view('_design/sentiment/_view/ave_sent_postcode', group=True)

    
    data = []
    all_postcode = []
    for row in results:
        if row.key[0] == None:
            continue
        if row.key[0] not in all_postcode:
            all_postcode.append(row.key[0])
        data.append(row)

    data1 = {}
    for i in all_postcode:
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
        for ii in results1:
            if ii.key == i:
                ave_sen = ii.value["sentiment"]
        new_item = {
            "Negative Proportion": neg/total,
            "Neutral Proportion": neu/total,
            "Positive Proportion": pos/total,
            "Average Sentiment": ave_sen,
            "Total": total,
        }
        data1[i] = new_item
        
    return jsonify(data1)

#Languages vs sentiment
@app.route('/twitter_languages_sentiment')
def get_data1():
    # Queries the view and returns data
    results = db.view('_design/sentiment/_view/war_sent_lang', group=True)
    results1 = db.view('_design/sentiment/_view/war_ave_sent_lang', group=True)
    
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
        for ii in results1:
            if ii.key == i:
                ave_sen = ii.value["sentiment"]
        
        new_item = {
            "Negative Proportion": neg/total,
            "Neutral Proportion": neu/total,
            "Positive Proportion": pos/total,
            "Average Sentiment": ave_sen,
            "Total": total,
        }
        data1[i] = new_item
        
    return jsonify(data1)

# magnitude of sentiment by state
@app.route('/mag_sentiment_state')
def get_data3():
    results = db.view('_design/sentiment/_view/mag_sent_lan_state', group=True)

    data = []
    all_state = []
    for row in results:
        if row.key["state"] == None:
            continue
        if row.key["state"] not in all_state:
            all_state.append(row.key["state"])
        data.append(row)

    data1 = {}
    for i in all_state:
        dic = {}
        for j in data:
            if j.key["state"] == i:
                new_item0 = {
                    "Count": j.value["count"],
                    "Sentiment": j.value["sentiment"],
                    "Average Magnitude": j.value["average_magnitude"],
                }
                dic[j.key["language"]] = new_item0

        data1[i] = dic
    return jsonify(data1)

# magnitude of sentiment by postode
@app.route('/mag_sentiment_postcode')
def get_data4():
    results = db.view('_design/sentiment/_view/mag_sent_lan_postcode', group=True)

    data = []
    all_postcode = []
    for row in results:
        if row.key["postcode"] == None:
            continue
        if row.key["postcode"] not in all_postcode:
            all_postcode.append(row.key["postcode"])
        data.append(row)

    data1 = {}
    for i in all_postcode:
        dic = {}
        for j in data:
            if j.key["postcode"] == i:
                new_item0 = {
                    "Count": j.value["count"],
                    "Sentiment": j.value["sentiment"],
                    "Average Magnitude": j.value["average_magnitude"],
                }
                dic[j.key["language"]] = new_item0

        data1[i] = dic
    return jsonify(data1)

# general: tweet_lang_state
@app.route('/tweet_lang_state')
def get_data5():
    results = db.view('_design/general/_view/tweet_lang_state', group=True)

    data = []
    all_state = []
    for row in results:
        if row.key["state"] == None:
            continue
        if row.key["state"] not in all_state:
            all_state.append(row.key["state"])
        data.append(row)

    data1 = {}
    for i in all_state:
        dic = {}
        all_lang = []
        for jj in data:
            if jj.key["state"] ==i:
                if jj.key["language"] not in all_lang:
                    all_lang.append(jj.key["language"])
        
        for g in all_lang:
            new = {"day":0,"night":0}
            for j in data:
                if j.key["state"] == i and j.key["language"] == g:
                    new[j.key["hourRange"]] += j.value
            dic[g] = new

        data1[i] = dic
    return jsonify(data1)

# lgbt_sent_postcode
@app.route('/lgbt_sent_postcode')
def get_points6():
    # Queries the view and returns data
    results = db.view('_design/lgbt/_view/lgbt_sent_postcode', group=True)
 
    data = []
    all_postcode = []
    for row in results:
        if row.key[0] == None:
            continue
        if row.key[0] not in all_postcode:
            all_postcode.append(row.key[0])
        data.append(row)

    data1 = {}
    for i in all_postcode:
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
            "Negative Proportion": neg/total,
            "Neutral Proportion": neu/total,
            "Positive Proportion": pos/total,
            "Total": total,
        }
        data1[i] = new_item
        
    return jsonify(data1)

# mag_sent_lan_postcode
@app.route('/mag_sentiment_postcode')
def get_data7():
    results = db.view('_design/lgbt/_view/mag_sent_lan_postcode', group=True)

    data = []
    all_postcode = []
    for row in results:
        if row.key["postcode"] == None:
            continue
        if row.key["postcode"] not in all_postcode:
            all_postcode.append(row.key["postcode"])
        data.append(row)

    data1 = {}
    for i in all_postcode:
        dic = {}
        for j in data:
            if j.key["postcode"] == i:
                new_item0 = {
                    "Count": j.value["count"],
                    "Sentiment": j.value["sentiment"],
                    "Average Magnitude": j.value["average_magnitude"],
                }
                dic[j.key["language"]] = new_item0

        data1[i] = dic
    return jsonify(data1)

if __name__ == '__main__':
    app.run(debug=True) 