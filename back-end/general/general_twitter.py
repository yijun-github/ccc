import json
from flask import Flask, jsonify
import couchdb
from flask import Blueprint
import re

general_twitter_bp = Blueprint('general_twitter', __name__)

app = Flask(__name__)

couch = couchdb.Server('http://admin:1dTY1!PWM2@172.26.133.51:5984/')
db = couch['huge-twitter-v2']

with open('../Data/geoJSON_data/state.json', 'r') as f:
        sudo_state_geo = json.load(f)
with open('../Data/geoJSON_data/postcode.json', 'r') as f1:
        sudo_postcode_geo = json.load(f1)    
with open('../Data/geoJSON_data/suburb.json', 'r') as f2:
        sudo_suburb_geo = json.load(f2)   


# language hour
@general_twitter_bp.route('/general/twitter/language_hour')
def get_data():
    results = db.view('_design/general/_view/language_hour', group=True)

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
        new = {"day": 0, "night": 0}
        for j in data:
            if j.key[0] == i:
                if j.key[1] in ["22","23", "00", "01", "02", "03", "04", "05"]:
                     new["night"] += j.value
                else:
                     new["day"] += j.value
        data1[i] = new
    return jsonify(data1)

# state_hourly_tweet
@general_twitter_bp.route('/general/twitter/state_hourly_tweet')
def get_data2():
    results = db.view('_design/general/_view/state_hourly_tweet', group=True)

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
        new = {"day": 0, "night": 0}
        for j in data:
            if j.key[0] ==i:
                if j.key[1] in ["22","23", "00", "01", "02", "03", "04", "05"]:
                     new["night"] += j.value
                else:
                     new["day"] += j.value
        data1[i] = new
    
    new_item1 = {
            "day": None,
            "night": None
        }
    
    for feature in sudo_state_geo['features']:
        if feature["properties"]["STE_NAME21"].lower() not in all_state:
            for j in new_item1:
                feature["properties"][j] = new_item1[j]
        for row in data1:
            if feature["properties"]["STE_NAME21"].lower() == row:        
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]

    with open('geojson output/general_state.json', 'w') as file:
        json.dump(sudo_state_geo, file)
    with open('geojson output/general_state.json', 'r') as f:
        geo = json.load(f)
    return jsonify(geo)

# state_hourly_tweet
@general_twitter_bp.route('/general/twitter/suburb_hourly_tweet')
def get_data3():
    results = db.view('_design/general/_view/suburb_hourly_tweet', group=True)

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
        new = {"day": 0, "night": 0}
        for j in data:
            if j.key["suburb"].lower() == i:
                if j.value in ["22","23", "00", "01", "02", "03", "04", "05"]:
                     new["night"] += j.value
                else:
                     new["day"] += j.value
        data1[i] = new

    new_item1 = {
            "day": None,
            "night": None
        }
    for feature in sudo_suburb_geo['features']:
        suburb_name = feature["properties"]["SAL_NAME21"].lower()
        suburb_name = re.sub(r'\([^)]*\)', '', suburb_name)
        suburb_name = suburb_name.replace(" ", "")
        if suburb_name not in all_suburb:
            for j in new_item1:
                feature["properties"][j] = new_item1[j]
        for row in data1:
            if row in suburb_name:        
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]

    with open('geojson output/general_suburb.json', 'w') as file:
        json.dump(sudo_suburb_geo, file)
    with open('geojson output/general_suburb.json', 'r') as f:
        geo = json.load(f)

    ww=0
    for g in geo["features"]:
        if g["properties"]["day"] is not None:
            ww+=1
    print(ww)

    return jsonify(geo)
