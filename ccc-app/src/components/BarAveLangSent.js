import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from "recharts";
import ChartTitle from "./ChartTitle";

export default function BarAveLangSent() {
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
        .catch(err => {
          console.log('======failed to fetch data=======');
          console.log(err);
      });
      }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <ChartTitle title="Language Mean Sentiment" />
            <BarChart
                width={300}
                height={300}
                data={langSentData}
                margin={{
                    top: 25,
                    right: 20,
                    left: 20,
                    bottom: 10
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="lang" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="ave" fill="#00BBBB" />
            </BarChart>
            
        </div>
  );
}

