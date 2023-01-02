import React,{useState} from 'react'
import HTMLReactParser from 'html-react-parser';
import {useParams} from 'react-router-dom';
import millify from 'millify';
import {Row, Col, Typography,Select} from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, NumberOutlined, ThunderboltOutlined, TrophyOutlined, CheckOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery,useGetCryptoHistoryQuery } from '../services/cryptoApi';
import {Loader} from './index.js';
import Linechart from './Linechart';
const {Title, Text} = Typography;
const {Option} = Select;
function Cryptodetails() {
  const {coinId} = useParams();
  const [timePeriod,setTimePeriod ] = useState('7d');
  const {data,isFetching } = useGetCryptoDetailsQuery(coinId);
  const {data: coinHistory} = useGetCryptoHistoryQuery({coinId,timePeriod})
  if(isFetching) return <Loader/>;
  const cryptoDetails =  data?.data?.coin;
  console.log(coinId);
  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];


  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>
      <Select
      defaultValue="7d" 
      className="select-timeperiod"
      placeholder="Select Time Period"
      onChange={(value) => setTimePeriod(value)}>
        {time.map(date=><Option key={date}>{date}</Option>)}
      </Select>
      <Linechart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>An Overview showing these stats of {cryptoDetails.name}</p>
          </Col>
          {stats.map(({title,value,icon}) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>

          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>An Overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({title,value,icon}) => (
            <Col className="coin-stats"key={title} >
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>

          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Col className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
            
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Col>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link)=>(
            <Row className="coin-link" key={link.name}>
              <Title level={3} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>

            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default Cryptodetails