import json
import couchdb
import re
import time

start = time.time()

couch = couchdb.Server('http://admin:1231@127.0.0.1:5984/')
db_name = "twitter_data"
if db_name not in couch:
    db = couch.create(db_name)
else:
    db = couch[db_name]
    
    
def is_valid_json(json_str):
    try:
        json.loads(json_str)
        return True
    except ValueError:
        return False
        
def check_geo(text):
    try:
        text["doc"]["includes"]
        return True
    except:
        return False
        

        
        
months = dict()
loca_count = 0
with open("/Users/aobo/Downloads/xaa.json", "r") as jsonfile:
    
    i = 0
    for row in jsonfile:
        data = row[:-2]
        # check if valid json format
        if is_valid_json(data):
            data = json.loads(data)
            
            content = re.sub(r'\n', ' ', data["doc"]["data"]["text"])
            #content = soup.get_text()
            
            # ignore empty content:
            if len(content) == 0:
                continue
                
            date = data["doc"]["data"]["created_at"].split("T")[0][:-3]
            
            months[date] = months.get(date, 0) + 1
            
                
            # otherwise process data
            id = data["doc"]["data"]["author_id"]
            # check whether data is Russian Ukriane war related
            keywords = ['russian', 'ukraine', 'war']
            num_keywords = 0
            
            # get word tokens
            tokens = " ".join(data["value"]["tokens"].split("|"))
            tags = " ".join(data["value"]["tags"].split("|"))
            
            
            for keyword in keywords:
                if re.search(keyword, tokens, re.IGNORECASE):
                    num_keywords += 1
            if num_keywords>=2:
                RUwar = True
            else:
                num_keywords = 0
                for keyword in keywords:
                    if re.search(keyword, tags, re.IGNORECASE):
                        num_keywords += 1
                RUwar = num_keywords >= 2
            
            
            
            language = data["doc"]["data"]["lang"]
            
            location = False
            if check_geo(data):
                location = data["doc"]["includes"]["places"][0]["full_name"]
                loca_count += 1
            # Process the data as desired
            processed_data = {
                'id': id,
                'content': content,
                'language': language,
                'location': location,
                'sentiment': data["doc"]["data"]["sentiment"],
                'date': date,
                'RUwar': RUwar
            }
                
            
            db.save(processed_data)
            
            
print(months, loca_count)
print(time.time()-start)

