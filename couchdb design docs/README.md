Contributor
COMP90024 Project 2 2023
Aobo Li              1172339
Pavith Samarakoon    1297058
Zhihao Liang         1367102
Jiqiang Chen         1171420
Yijun Liu            1132416

To Put design docs into couchdb, follow the steps below
curl -X PUT http://{username}:{password}@{localhost}/{database}/_design/{design_doc_name} -d @{filename}.json
