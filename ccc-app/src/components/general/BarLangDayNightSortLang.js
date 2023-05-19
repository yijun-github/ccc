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
import { Container } from "@mui/material";

export default function BarLangDayNightSortLang({ data }) {
    
    // Remove english and undefined, and assign ranks
    var plotData = data.slice(2)
    plotData.sort((a, b) => a.language.localeCompare(b.language))

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
                <Brush dataKey="language" height={30} stroke="#8884d8" />
                <Bar dataKey="day" fill="#00BBBB" stackId="stack" />
                <Bar dataKey="night" fill="#DD00DD" stackId="stack" />
            </BarChart>
            
        </Container>
  );
}

