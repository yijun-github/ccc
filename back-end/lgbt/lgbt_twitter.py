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


with open('geoJSON files/states/STE_2021_AUST_GDA2020_Simplified.json', 'r') as file:
        state_geo = json.load(file)
with open('geoJSON files/gcc/GCCSA_2021_AUST_GDA2020.json', 'r') as file2:
        gcc_geo = json.load(file2)
with open('geoJSON files/postcode/POA_2021_AUST_GDA2020_Medium.json', 'r') as file3:
        postcode_geo = json.load(file3)
with open('geoJSON files/suburbs/SAL_2021_AUST_GDA94_Small.json', 'r') as file4:
        suburb_geo = json.load(file4)

#  monthly_state_sentiment
@app.route('/lgbt/twitter/sentiment_state_monthly')
def get_data5():
    results = db.view('_design/sentiment/_view/war_monthly_state_proportion', group=True)

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
                "pos": pos,
                "neu": neu,
                "neg": neg,
                "total": total,
                "neg%": neg/total,
                "neu%": neu/total,
                "pos%": pos/total,
                "ave_sen": sen/3,
                "ave_mag": mag/3
            }
            data1[month] = new_item

        data2[i] = data1
    return data2

    with open('back-end/json output/json_output_monthly_state_sentiment_war.json', 'w') as f:
        json.dump(data1, f)

    new_item1 = {
            "neg_sen": None,
            "pos_sen": None,
            "neu_sen": None,
            "total": None,
            "ave_sen": None,
            "ave_mag": None,
            "neg%": None,
            "pos%": None,
            "neu%": None
        }
    
    for feature in sudo_state_geo['features']:
        if feature["properties"]["STE_NAME21"].lower() not in all_state:
            for j in new_item1:
                feature["properties"][j] = new_item1[j]
        for row in data2:
            if feature["properties"]["STE_NAME21"].lower() == row:
                for i in data2[row]:
                    feature["properties"][i] = data2[row][i]

    with open('back-end/geojson output/geo_output_monthly_state_sentiment_war.json', 'w') as file:
        json.dump(sudo_state_geo, file)
    with open('back-end/geojson output/geo_output_monthly_state_sentiment_war.json', 'r') as f:
        geo = json.load(f)
    return jsonify(geo)

# suburb_sentiment
@app.route('/lgbt/suburb_sentiment')
def get_data18():
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
        sen = 0
        mag = 0
        for j in data:
            if j.key["suburb"].lower() == i:
                total += j.value["count"]
                mag += j.value["average_magnitude"]
                sen += j.value["sentiment"]
                if j.key["sentiment_category"] == "positive":
                    pos += j.value["count"]
                if j.key["sentiment_category"] == "negative":
                    neg += j.value["count"]
                if j.key["sentiment_category"] == "neutral":
                    neu += j.value["count"]

        new_item = {
            "neg_sen": neg,
            "pos_sen": pos,
            "neu_sen": neu,
            "total": total,
            "ave_sen": sen/3,
            "ave_mag": mag/3,
            "neg%": neg/total,
            "pos%": pos/total,
            "neu%": neu/total
        }
        data1[i] = new_item


    with open('back-end/json output/json_output_suburb_sentiment_lgbt.json', 'w') as f:
        json.dump(data1, f)

    new_item1 = {
            "neg_sen": None,
            "pos_sen": None,
            "neu_sen": None,
            "total": None,
            "ave_sen": None,
            "ave_mag": None,
            "neg%": None,
            "pos%": None,
            "neu%": None
        }
    for feature in suburb_geo['features']:
        if feature["properties"]["SAL_NAME21"].lower() not in all_suburb:
            for j in new_item1:
                feature["properties"][j] = new_item1[j]
        for row in data1:
            if row in feature["properties"]["SAL_NAME21"].lower():
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]


    with open('back-end/geojson output/geo_output_suburb_sentiment_lgbt.json', 'w') as file:
        json.dump(suburb_geo, file)
    with open('back-end/geojson output/geo_output_suburb_sentiment_lgbt.json', 'r') as f:
        geo = json.load(f)
    return jsonify(geo)
if __name__ == '__main__':
    app.run(debug=True) 