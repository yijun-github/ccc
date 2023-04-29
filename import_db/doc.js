const doc = {
    "_id": "0823f8946bf857d45565a10c24adb4a0",
    "_rev": "1-4306840188c50519c3e711200512cbc3",
    "id": "1491890674089660416",
    "author_id": "1335789898586996736",
    "created_at": "2022-02-10T21:43:49.000Z",
    "lang": "en",
    "text": "@arnahunas @IGN I hope I got this right\n\nHard AF by Ty Frankel\n\nHere's a link to it:\nhttps://t.co/DdFm5NxeYQ",
    "sentiment": 0.045454545454545456,
    "geo": {},
    "tokens": "hope|got|this|right|Hard|Frankel|Here|link|nazi"
}
function emit(key, value) {
    console.log(key, value);
}
function f(doc) {
    let tokens = doc.tokens.split('|');
    tokens = tokens.map((token) => token.toLowerCase());
    const relatedWords = ["russia", "ukraine", "nato", "putin", "ukr", "nazi", "crimea", "russo-ukrainian", "bakhmut", "wagner", "belgorod", "zhytomyr", "kherson", "dnipro", "nato", "donetsk", "zelensky"];
    const isRelated = tokens.some((token) => relatedWords.includes(token));
    if (tokens.length > 0 && isRelated) {
        console.log('related', doc);
        emit(toke, doc)
    }
}
function count_freq(doc) {
    let tokens = doc.tokens.split('|');
    tokens = tokens.map((token) => token.toLowerCase());
    const relatedWords = ["russia", "ukraine", "nato", "putin", "ukr",
        "nazi", "crimea", "russo-ukrainian", "bakhmut", "wagner", "belgorod",
        "zhytomyr", "kherson", "dnipro", "nato", "donetsk", "zelensky"];
    const isRelated = tokens.some((token) => relatedWords.includes(token));
    if (isRelated) {
        for (let token of tokens) {
            emit(token, 1);
        }
    }

}
function getWithGeo(doc) {
    let tokens = doc.tokens.split('|');
    tokens = tokens.map((token) => token.toLowerCase());
    const relatedWords = ["russia", "ukraine", "nato", "putin", "ukr",
        "nazi", "crimea", "russo-ukrainian", "bakhmut", "wagner", "belgorod",
        "zhytomyr", "kherson", "dnipro", "nato", "donetsk", "zelensky"];
    const isRelated = tokens.some((token) => relatedWords.includes(token));
    if (isRelated) {
        for (let token of tokens) {
            emit(token, 1);
        }
    }

}

count_freq(doc)
