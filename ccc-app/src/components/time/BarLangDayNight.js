/*
COMP90024 Project 2 2023
Contributer
Aobo Li              1172339
Pavith Samarakoon    1297058
Zhihao Liang         1367102
Jiqiang Chen         1171420
Yijun Liu            1132416
*/
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
  ResponsiveContainer,
  Brush
} from "recharts";
import ChartTitle from "../ChartTitle";
import { Container, Typography } from "@mui/material";

export default function BarLangDayNight({ data }) {
    
    // Assign ranks
    const [plotData, setPlotData] = useState(null)

    useEffect(() => {
        Object.keys(data).forEach((key, index) => {
          data[key].rank = index+1
        })
        setPlotData(data)
    }, [])

    return (
        <Container>
            <BarChart
                stackOffset="none"
                width={300}
                height={300}
                data={plotData}
                margin={{
                    top: 10,
                    right: 5,
                    left: 5,
                    bottom: 10
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="language" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Brush dataKey="rank" height={30} stroke="#8884d8" />
                <Bar dataKey="day" fill="#00BBBB" stackId="stack" />
                <Bar dataKey="night" fill="#DD00DD" stackId="stack" />
            </BarChart>
            <Typography variant="caption" align="center">Use bar to select range. Excludes English (en) and undefined (und)</Typography>
        </Container>
  );
}

