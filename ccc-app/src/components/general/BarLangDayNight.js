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
    
    // Remove english and undefined, and assign ranks
    var plotData = data.slice(2)
    Object.keys(plotData).forEach((key, index) => {
      plotData[key].rank = index+1
    })

    return (
        <Container>
            <ChartTitle title="Day/Night Tweets (sort Total)" />
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
            <Typography variant="caption" align="center">Excludes English (en) and undefined (und)</Typography>
        </Container>
  );
}

