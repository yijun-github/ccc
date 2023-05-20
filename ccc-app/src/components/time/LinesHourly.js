import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";
import ChartTitle from "../ChartTitle";


export default function LinesHourly({ data }) {

    var hourData = []

    function round(x, nDecimal) {
      return (Math.round((x + Number.EPSILON) * (10**nDecimal)) / (10**nDecimal))
    }

    Object.keys(data).forEach(state => {
        Object.keys(data[state]).forEach(month => {
            if (monthData[month] == undefined) {monthData[month] = {}}
            monthData[month][state] = round((data[state][month]['pos%'] - data[state][month]['neg%'])*100, 3)
        })
    })

    monthData = Object.keys(monthData).map(month => {
        monthData[month].month = month
        return(monthData[month])
    })

    monthData.sort((a, b) => a.month.localeCompare(b.month))

    const colors = ['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#e6ab02','#a6761d','#666666']

    return(
      <>
        <ChartTitle title="Difference in positive-negative sentiment percentage" />
        <LineChart width={700} height={300} data={monthData}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ReferenceLine y={0} stroke="black" />
            <Tooltip />
            <Legend />
            {
              Object.keys(data).map((state, index) => (
                <Line type="natural" dataKey={state} stroke={colors[index]} />
              ))
            }
        </LineChart>
      </>
    )
}