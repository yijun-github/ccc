import React, { useState, useEffect } from "react";
import CustomBar from "./CustomBar.js";

export default function CreateBar() {

    const [langSentData, setLangSentData] = useState([])

    const getData = () => {
        fetch('http://localhost:3001/langSent', {
          header:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then((res) => res.json())
        .then((data) => {setLangSentData(data)})
      }

    useEffect(() => {
        getData()
    }, [])

    return(
        <CustomBar data={langSentData} xAxis="lang" barKeys={["pos","neg"]} 
                  barColor={["#00BBBB","#BB00BB"]} stackID="stack" />
    )
}