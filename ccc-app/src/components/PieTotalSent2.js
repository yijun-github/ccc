import React, { useCallback, useState, useEffect } from 'react';
import { PieChart, Pie, Sector } from "recharts";
import ChartTitle from './ChartTitle';

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
            {payload.sentiment_type}
            </text>
            <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
            />
            <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
            {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default function PieTotalSent2() {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
      (_, index) => {
        setActiveIndex(index);
      },
      [setActiveIndex]
    );

    const [RUwar, setRUwar] = useState([])
    const [Mastsent, setMastSent] = useState([])

    function getData(url, setData) {
      console.log("Fetching Data Test")
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

    useEffect(() => {
        getData('http://45.113.234.176:5000/sentiment/RUwar', setRUwar)
        {/*getData('http://45.113.234.176:5000/mastondon_RUwar_sentiment', setMastSent)*/}
    }, [])
  
    return (
      <>
        <ChartTitle title="Overall Twitter Sentiment" />
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={RUwar}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#1e81b0"
            dataKey="count"
            onMouseEnter={onPieEnter}
          />
      </PieChart>
      </>
    );
  }
