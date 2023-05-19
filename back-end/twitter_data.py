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
"""
for i in sudo_suburb_geo["features"]:
    print(i["properties"]["SAL_NAME21"])
"""

# sentiment: RUwar
@app.route('/sentiment/RUwar')
def get_data14():
    results = db.view('_design/sentiment/_view/RUwar', group=True)

    data = {}
    for row in results:
        data[row.key] = row.value
    return jsonify(data)

# sentiment: proportion of sentiment by state
@app.route('/sentiment/state_sentiment')
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

# sentiment: gcc_sentiment        
@app.route('/sentiment/gcc_sentiment')
def get_points1():
    results = db.view('_design/sentiment/_view/sum_sent_gcc', group=True)
    results1 = db.view('_design/sentiment/_view/ave_sent_gcc', group=True)

    data = {}
    gcc_sentiment_output = {"type": "FeatureCollection","features": []}
    for row in results:
        for ii in results1:
            if ii.key == row.key:
                ave_sen = ii.value["sentiment"]
        new_item = {
            "Average Sentiment": ave_sen,
            "Sum of Sentiment": row.value["sentiment"],
            "Total": row.value["count"],
        }
        data[row.key] = new_item

    with open('json_output_gcc_sentiment.json', 'w') as f:
        json.dump(data, f)

    for feature in gcc_geo['features']:
        for row in data:
            if feature["properties"]['GCC_CODE21'].lower() == row.lower():
                for i in data[row]:
                    feature["properties"][i] = data[row][i]
                gcc_sentiment_output["features"].append(feature)

    with open('geo_output_gcc_sentiment.json', 'w') as file22:
        json.dump(gcc_sentiment_output, file22)

    return jsonify(gcc_sentiment_output)

# sentiment: postcode_sentiment
@app.route('/sentiment/postcode_sentiment')
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
    

# sentiment: Languages vs sentiment
@app.route('/sentiment/twitter_languages_sentiment')
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

# sentiment: war_monthly_state_proportion
@app.route('/sentiment/war_monthly_state_proportion')
def get_data15():
    results = db.view('_design/sentiment/_view/war_monthly_state_proportion', group=True)

    data = []
    all_month = []
    for row in results:
        if row.key[0] == None:
            continue
        if row.key[0] not in all_month:
            all_month.append(row.key[0])
        data.append(row)

    data1 = {}
    for i in all_month:
        dic = {}
        all_state = []
        for jj in data:
            if jj.key[0] ==i:
                if jj.key[1] == None:
                    continue
                if jj.key[1] not in all_state:
                    all_state.append(jj.key[1])
        
        for g in all_state:
            new = {"Negative":0,"Neutral":0, "Positive":0}
            for j in data:
                if j.key[1] == None:
                    continue
                if j.key[0] == i and j.key[1] == g:
                    new[j.key[2]] += j.value
            dic[g] = new

        data1[i] = dic

    return jsonify(data1)

# sentiment: magnitude of sentiment by state
@app.route('/sentiment/mag_sentiment_state')
def get_data3():
    results = db.view('_design/sentiment/_view/mag_sent_lan_state', group=True)

    data = []
    all_state = []
    output = {"type": "FeatureCollection","features": []}
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

    with open('json_output_mag_sentiment_state.json', 'w') as f:
        json.dump(data1, f)

    for feature in state_geo['features']:
        for row in data1:
            if feature["properties"]["STE_NAME21"].lower() == row:

                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]
                output["features"].append(feature)

    with open('geo_output_state_sentiment.json', 'w') as file:
        json.dump(output, file)

    return jsonify(output)

# sentiment: magnitude of sentiment by postode
@app.route('/sentiment/mag_sentiment_postcode')
def get_data4():
    results = db.view('_design/sentiment/_view/mag_sent_lan_postcode', group=True)

    data = []
    all_postcode = []
    output = {"type": "FeatureCollection","features": []}
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

    with open('json_output_mag_sentiment_postcode.json', 'w') as f:
        json.dump(data1, f)

    for row in data1:
        for feature in postcode_geo['features']:
            if row == feature["properties"]['POA_CODE21']:
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]
                output["features"].append(feature)

    with open('geo_output_mag_sentiment_postcode.json', 'w') as file33:
        json.dump(output, file33)

    return jsonify(output)

# sentiment: suburb_sentiment
@app.route('/sentiment/suburb_sentiment')
def get_data17():
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

# general: tweet_lang_hourRange
@app.route('/general/tweet_lang_hourRange')
def get_data10():
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

    with open('json_output_tweet_lang_hourRange.json', 'w') as f:
        json.dump(data1, f)

    return jsonify(data1)

# general: tweet_lang_state
@app.route('/general/tweet_lang_state')
def get_data5():
    results = db.view('_design/general/_view/tweet_lang_state', group=True)

    data = []
    all_state = []
    output = {"type": "FeatureCollection","features": []}
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

    with open('json_output_tweet_lang_state.json', 'w') as f:
        json.dump(data1, f)

    for feature in state_geo['features']:
        for row in data1:
            if feature["properties"]["STE_NAME21"].lower() == row:
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]
                output["features"].append(feature)

    with open('geo_output_tweet_lang_state.json', 'w') as file:
        json.dump(output, file)

    return jsonify(output)

# general: tweet_lang_postcode
@app.route('/general/tweet_lang_postcode')
def get_data16():
    results = db.view('_design/general/_view/tweet_lang_postcode', group=True)

    data = []
    all_postcode = []
    output = {"type": "FeatureCollection","features": []}
    for row in results:
        if row.key["postcode"] == None:
            continue
        if row.key["postcode"] not in all_postcode:
            all_postcode.append(row.key["postcode"])
        data.append(row)

    data1 = {}
    for i in all_postcode:
        dic = {}
        all_lang = []
        for jj in data:
            if jj.key["postcode"] ==i:
                if jj.key["language"] not in all_lang:
                    all_lang.append(jj.key["language"])
        
        for g in all_lang:
            new = {}
            for j in data:
                if j.key["postcode"] == i and j.key["language"] == g:
                    new[j.key["hourRange"]] = j.value
            dic[g] = new

        data1[i] = dic
    
    with open('json_output_tweet_lang_postcode.json', 'w') as f:
        json.dump(data1, f)

    for feature in postcode_geo['features']:
        for row in data1:
            if feature["properties"]['POA_CODE21'].lower() == row:
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]
                output["features"].append(feature)

    with open('geo_output_tweet_lang_postcode.json', 'w') as file:
        json.dump(output, file)

    

    return jsonify(output)

# lgbt: suburb_sentiment
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
# lgbt: lgbt_sent_postcode
@app.route('/lgbt/lgbt_sent_postcode')
def get_points6():
    # Queries the view and returns data
    results = db.view('_design/lgbt/_view/lgbt_sent_postcode', group=True)
 
    data = []
    all_postcode = []
    output = {"type": "FeatureCollection","features": []}
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
    with open('json_output_lgbt_postcode.json', 'w') as f:
        json.dump(data1, f)

    for row in data1:
        for feature in postcode_geo['features']:
            if row == feature["properties"]['POA_CODE21']:
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]
                output["features"].append(feature)

    with open('geo_output_lgbt_postcode.json', 'w') as file33:
        json.dump(output, file33)
        
    return jsonify(output)

# lgbt: mag_sent_lan_postcode
@app.route('/lgbt/mag_sentiment_lan_postcode')
def get_data7():
    results = db.view('_design/lgbt/_view/mag_sent_lan_postcode', group=True)

    data = []
    all_postcode = []
    output = {"type": "FeatureCollection","features": []}
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

    with open('json_output_mag_sentiment_lan_postcode.json', 'w') as f:
        json.dump(data1, f)

    for row in data1:
        for feature in postcode_geo['features']:
            if row == feature["properties"]['POA_CODE21']:
                for i in data1[row]:
                    feature["properties"][i] = data1[row][i]
                output["features"].append(feature)

    with open('geo_output_mag_sentiment_lan_postcode.json', 'w') as file33:
        json.dump(output, file33)
        
    return jsonify(output)
# lgbt: monthly_state
@app.route('/lgbt/monthly_state')
def get_data12():
    results = db.view('_design/lgbt/_view/lgbt_monthly_state', group=True)

    data = []
    all_month = []
    for row in results:
        if row.key[0] == None:
            continue
        if row.key[0] not in all_month:
            all_month.append(row.key[0])
        data.append(row)

    data1 = {}
    for i in all_month:
        dic = {}
        all_state = []
        for jj in data:
            if jj.key[0] ==i:
                if jj.key[1] == None:
                    continue
                if jj.key[1] not in all_state:
                    all_state.append(jj.key[1])
        
        for g in all_state:
            new = {"Negative":0,"Neutral":0, "Positive":0}
            for j in data:
                if j.key[1] == None:
                    continue
                if j.key[0] == i and j.key[1] == g:
                    new[j.key[2]] += j.value
            dic[g] = new

        data1[i] = dic

    return jsonify(data1)

# lgbt: monthly_state_mag
@app.route('/lgbt/monthly_state_mag')
def get_data13():
    results = db.view('_design/lgbt/_view/lgbt_monthly_state_mag', group=True)

    data = []
    all_month = []
    for row in results:
        if row.key["month"] not in all_month:
            all_month.append(row.key["month"])
        data.append(row)

    data1 = {}
    for i in all_month:
        dic = {}
        all_state = []
        for jj in data:
            if jj.key["month"] ==i:
                if jj.key["state"] == None:
                    continue
                if jj.key["state"] not in all_state:
                    all_state.append(jj.key["state"])
        
        for g in all_state:
            new = {}
            for j in data:
                if j.key["state"] == None:
                    continue
                if j.key["month"] == i and j.key["state"] == g:
                    for t in j.value:
                        new[t] = j.value[t]
            dic[g] = new

        data1[i] = dic
    return jsonify(data1)


if __name__ == '__main__':
    app.run(debug=True) 