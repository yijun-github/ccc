import json
from flask import Flask, jsonify
import couchdb
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

couch = couchdb.Server('http://admin:1dTY1!PWM2@172.26.133.51:5984/')
db = couch['huge-twitter-v2']

with open('Data/geoJSON_data/state.json', 'r') as f:
        sudo_state_geo = json.load(f)
with open('Data/geoJSON_data/postcode.json', 'r') as f1:
        sudo_postcode_geo = json.load(f1)    
with open('Data/geoJSON_data/suburb.json', 'r') as f2:
        sudo_suburb_geo = json.load(f2)    

# state sentiment
@app.route('/lgbt/twitter/state_sentiment')
def get_points():
    results = db.view('_design/lgbt/_view/sentiment_state_monthly', group=True)

    data = []
    all_state = []
    for row in results:
        if row.key[1] == None:
            continue
        if row.key[1] not in all_state:
            all_state.append(row.key[1])
        data.append(row)

    data1 = {}
    data2 = {}
    for i in all_state:
        all_month = []
        for j in data:
            if j.key[1] ==i:
                if j.key[0] not in all_month:
                    all_month.append(j.key[0])
        
        for month in all_month:
            neg = 0
            pos = 0
            neu = 0
            total = 0
            mag = 0
            for j in data:
                if j.key[0] == month and j.key[1] == i:
                    total += j.value["count"]
                    mag += j.value["average_magnitude"]
                    if j.key[2] == "positive":
                        pos += j.value["count"]
                    if j.key[2] == "negative":
                        neg += j.value["count"]
                    if j.key[2] == "neutral":
                        neu += j.value["count"]
            new_item = {
                "total": total,
                "neg": neg,
                "neu": neu,
                "pos": pos,
                "ave_mag": mag/3
            }
            data1[month] = new_item

        data2[i] = data1
    return data2
    data3 = {}
    for state in all_state:
        t = 0
        neuu = 0
        poss = 0
        negg = 0
        magg = 0 
        month_num = 0
        for month in data2[state]:
            month_num += 1
            t += month["total"]
            neu_pro += month["neu"]
            neg_pro += month["neg"]
            pos_pro += month["pos"]
            magg += month["lgbt_ave_mag"]
        new_item1 = {
                "lgbt_total": t,
                "lgbt_neg%": negg/t,
                "lgbt_neu%": neuu/t,
                "lgbt_pos%": poss/t,
                "lgbt_ave_mag": magg
        }
        data3[state] = new_item1
    return data3
     

#  monthly_state_sentiment
@app.route('/lgbt/twitter/monthly_state_sentiment')
def get_points2():
    results = db.view('_design/lgbt/_view/sentiment_state_monthly', group=True)

    data = []
    all_state = []
    for row in results:
        if row.key[1] == None:
            continue
        if row.key[1] not in all_state:
            all_state.append(row.key[1])
        data.append(row)

    data1 = {}
    data2 = {}
    for i in all_state:
        all_month = []
        for j in data:
            if j.key[1] ==i:
                if j.key[0] not in all_month:
                    all_month.append(j.key[0])
        
        for month in all_month:
            neg = 0
            pos = 0
            neu = 0
            total = 0
            sen = 0
            mag = 0
            for j in data:
                if j.key[0] == month and j.key[1] == i:
                    total += j.value["count"]
                    sen += j.value["sentiment"]
                    mag += j.value["average_magnitude"]
                    if j.key[2] == "positive":
                        pos += j.value["count"]
                    if j.key[2] == "negative":
                        neg += j.value["count"]
                    if j.key[2] == "neutral":
                        neu += j.value["count"]
            new_item = {
                "total": total,
                "neg%": neg/total,
                "neu%": neu/total,
                "pos%": pos/total,
                "ave_mag": mag/3
            }
            data1[month] = new_item

        data2[i] = data1
    return data2


# suburb_sentiment
@app.route('/lgbt/twitter/suburb_sentiment')
def get_points3():
    results = db.view('_design/lgbt/_view/suburb_sentiment', group=True)

    data = []
    all_suburb = []
    for row in results:
        if row.key["suburb"] == None:
            continue
        if row.key["suburb"] not in all_suburb:
            all_suburb.append(row.key["suburb"].lower())
        data.append(row)

    data1 = {}
    for i in all_suburb:
        neg = 0
        pos = 0
        neu = 0
        total = 0
        mag = 0
        for j in data:
            if j.key["suburb"].lower() == i:
                total += j.value["count"]
                mag += j.value["average_magnitude"]
                if j.key["sentiment_category"] == "positive":
                    pos += j.value["count"]
                if j.key["sentiment_category"] == "negative":
                    neg += j.value["count"]
                if j.key["sentiment_category"] == "neutral":
                    neu += j.value["count"]

        new_item = {
            "lgbt_total": total,
            "lgbt_ave_mag": mag/3,
            "lgbt_neg%": neg/total,
            "lgbt_pos%": pos/total,
            "lgbt_neu%": neu/total
        }
        data1[i] = new_item

    new_item1 = {
            "lgbt_total": None,
            "lgbt_ave_mag": None,
            "lgbt_neg%": None,
            "lgbt_pos%": None,
            "lgbt_neu%": None
        }
    for feature in sudo_suburb_geo['features']:
        if feature["properties"]["SAL_NAME21"].lower() not in all_suburb:
            for j in new_item1:
                feature["properties"][j] = new_item1[j]
        for row in data1:
            if row in feature["properties"]["SAL_NAME21"].lower():
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]


    with open('back-end/geojson output/lgbt_suburb.json', 'w') as file:
        json.dump(sudo_suburb_geo, file)
    with open('back-end/geojson output/lgbt_suburb.json', 'r') as f:
        geo = json.load(f)
    return jsonify(geo)

# sentiment_language
@app.route('/lgbt/twitter/sentiment_language')
def get_points4():
    results = db.view('_design/lgbt/_view/sentiment_language', group=True)
    
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
        mag = 0
        for j in data:
            if j.key[0] == i:
                total += j.value["count"]
                mag += j.value["average_magnitude"]
                if j.key[1] == "positive":
                    pos += j.value["count"]
                if j.key[1] == "negative":
                    neg += j.value["count"]
                if j.key[1] == "neutral":
                    neu += j.value["count"]
        
        new_item = {
            "pos": pos,
            "neu": neu,
            "neg": neg,
            "total": total,
            "neg%": neg/total,
            "neu%": neu/total,
            "pos%": pos/total,
            "ave_mag": mag/3
            
        }
        data1[i] = new_item
    return jsonify(data1)

if __name__ == '__main__':
    app.run(debug=True) 