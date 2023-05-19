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

# war: state sentiment
@app.route('/war/twitter/state_sentiment')
def get_points():
    results = db.view('_design/sentiment/_view/sentiment_state', group=True)

    data = []
    all_state = []
    for row in results:
        if row.key[0] == None:
            continue
        if row.key[0] not in all_state:
            all_state.append(row.key[0])
        data.append(row)

    data1 = {}
    for i in all_state:
        neg = 0
        pos = 0
        neu = 0
        total = 0
        mag = 0
        sen = 0
        for j in data:
            if j.key[0] == i:
                total += j.value["count"]
                mag += j.value["average_magnitude"]
                sen += j.value["sentiment"]
                if j.key[1] == "positive":
                    pos += j.value["count"]
                if j.key[1] == "negative":
                    neg += j.value["count"]
                if j.key[1] == "neutral":
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

    with open('back-end/json output/json_output_state_sentiment_war.json', 'w') as f:
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
        for row in data1:
            if feature["properties"]["STE_NAME21"].lower() == row:
                
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]


    with open('back-end/geojson output/geo_output_state_sentiment_war.json', 'w') as file:
        json.dump(sudo_state_geo, file)
    with open('back-end/geojson output/geo_output_state_sentiment_war.json', 'r') as f:
        geo = json.load(f)
    return jsonify(geo)

# war: postcode sentiment
@app.route('/war/twitter/postcode_sentiment')
def get_points2():
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
            "neg_sen": neg,
            "neu_sen": neu,
            "pos_sen": pos,
            "neg%": neg/total,
            "neu%": neu/total,
            "pos%": pos/total,
            "ave_sen": ave_sen,
            "total": total,
        }
        data1[i] = new_item

    with open('back-end/json output/json_output_postcode_sentiment.json', 'w') as f:
        json.dump(data1, f)

    new_item1 = {
            "neg_sen": None,
            "pos_sen": None,
            "neu_sen": None,
            "total": None,
            "ave_sen": None,
            "neg%": None,
            "pos%": None,
            "neu%": None
        }
    
    for feature in sudo_postcode_geo['features']:
        if feature["properties"]["POA_NAME21"].lower() not in all_postcode:
            for j in new_item1:
                feature["properties"][j] = new_item1[j]
        for row in data1:
            if feature["properties"]["POA_NAME21"].lower() == row:
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]

    with open('back-end/geojson output/geo_output_postcode_sentiment.json', 'w') as file:
        json.dump(sudo_postcode_geo, file)
    with open('back-end/geojson output/geo_output_postcode_sentiment.json', 'r') as f:
        geo = json.load(f)
    return jsonify(geo)

# war: suburb sentiment
@app.route('/war/twitter/suburb_sentiment')
def get_points3():
    results = db.view('_design/sentiment/_view/suburb_sentiment', group=True)

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


    with open('back-end/json output/json_output_suburb_sentiment.json', 'w') as f:
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
    for feature in sudo_suburb_geo['features']:
        if feature["properties"]["SAL_NAME21"].lower() not in all_suburb:
            for j in new_item1:
                feature["properties"][j] = new_item1[j]
        for row in data1:
            if row in feature["properties"]["SAL_NAME21"].lower():
                
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]


    with open('back-end/geojson output/geo_output_suburb_sentiment.json', 'w') as file:
        json.dump(sudo_suburb_geo, file)
    with open('back-end/geojson output/geo_output_suburb_sentiment.json', 'r') as f:
        geo = json.load(f)
    return jsonify(geo)

    
if __name__ == '__main__':
    app.run(debug=True) 