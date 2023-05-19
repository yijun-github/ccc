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

# general: language hour
@app.route('/general/twitter/language_hour')
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
        new = {}
        for j in data:
            if j.key[0] == i:
                new[j.key[1]] = j.value
        data1[i] = new
    return jsonify(data1)

# general: state_hourly_tweet
@app.route('/general/twitter/state_hourly_tweet')
def get_data2():
    results = db.view('_design/general/_view/state_hourly_tweet', group=True)

    data = []
    all_state = []
    output = {"type": "FeatureCollection","features": []}
    for row in results:
        if row.key[0] == None:
            continue
        if row.key[0] not in all_state:
            all_state.append(row.key[0])
        data.append(row)

    data1 = {}
    for i in all_state:
        dic = {}
        for j in data:
            if j.key[0] ==i:
                dic[j.key[1]]=j.value
        data1[i] = dic

    for feature in state_geo['features']:
        for row in data1:
            if feature["properties"]["STE_NAME21"].lower() == row:
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]
                output["features"].append(feature)

    with open('back-end/geojson output/geo_output_state_hourly_tweet_war.json', 'w') as file:
        json.dump(output, file)

    return jsonify(output)

# general: tweet_lang_hourRange
@app.route('/general/tweet_lang_hourRange')
def get_data3():
    results = db.view('_design/general/_view/tweet_postcode', group=True)

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
        new = {"day":0,"night":0}
        for j in data:
            if j.key["language"] == i:
                new[j.key["hourRange"]] += j.value
        data1[i] = new

    return jsonify(data1)

if __name__ == '__main__':
    app.run(debug=True) 