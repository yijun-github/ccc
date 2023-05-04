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

export default function StackedBarLangSent() {
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


    return (
        <div>
            <h3>Positive and Negative Sentiment by Language</h3>
            <BarChart
                stackOffset="sign"
                width={400}
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
                <Bar dataKey="pos" fill="#00BBBB" stackId="stack" />
                <Bar dataKey="neg" fill="#DD00DD" stackId="stack" />
            </BarChart>
            
        </div>
  );
}

