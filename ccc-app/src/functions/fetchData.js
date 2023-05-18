{/* fetch JSON files */}
export function getData(url, setData) {
    fetch(url, { 
      header:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setData(data)
      console.log(data)
      console.log(`Fetch ${url} complete`)
    })
    .catch(err => {
      console.log('======failed to fetch data=======');
      console.log(err);
    });
}

{/* Fetch total war sentiment */}
export function getRUwarData(url, setData) {
    fetch(url, {
        mode: 'cors',
        header:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((data) => Object.keys(data).map(key => ({"sentiment_type": key, "count": data[key]})))
    .then((data) => {setData(data)})
    .catch(err => {
        console.log('======failed to fetch data=======');
        console.log(err);
    })
  }
