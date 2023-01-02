import React from 'react'
import {Line} from 'react-chartjs-2';
import {Row, Col, Typography} from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);

function Linechart({coinHistory,currentPrice,coinName}) {
    const coinPrice = [];
    const coinTimeStamp =[];
    let d=Math.floor((coinHistory?.data?.history.length-1)/100);
    // console.log(coinHistory?.data?.history.length-1 + '  '+d );
    for(let i=0;i<coinHistory?.data?.history.length-1;i+=d){
        coinPrice.push(coinHistory.data.history[i].price);
        coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp*1000).toLocaleString());
    }
    const data={
        labels: coinTimeStamp,
        datasets:[
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: 'rgb(0, 113, 189)',
                borderColor: 'rgba(0, 113, 189,0.5)',
            },
        ],
    };
    const options={
        scales: {
            y:{
                beginAtZero: true,
            },
        },
        elements: {
            point:{
                radius: 0
            }
        },
    };
  return (
    <>
        <Row className="chart-header">
            <Typography.Title level={2} className="chart-title">{coinName} Price Chart</Typography.Title>
            <Col className="price-container">
                <Typography.Title level={5} className="price-change">{coinHistory?.data?.change}%</Typography.Title>
                <Typography.Title level={5} className="current-price">Current {coinName} Price: ${currentPrice}</Typography.Title>
            </Col>
        </Row>
        <Line data={data} options={options}/>
    </>
  )
}

export default Linechart