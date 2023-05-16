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
import { Container } from "@mui/material";

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
        .catch(err => {
          console.log('======failed to data=======');
          console.log(err);
      });
      }

    useEffect(() => {
        getData()
    }, [])


    return (
        <Container>
            <ChartTitle title="Positive and Negative Sentiment by Language" />
            <BarChart
                stackOffset="sign"
                width={300}
                height={300}
                data={langSentData}
                margin={{
                    top: 10,
                    right: 5,
                    left: 5,
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
            
        </Container>
  );
}

