import React,{useState} from 'react'
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import {Loader} from './index.js';

const {Text} = Typography;
const {Option} = Select;
const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'
function News({simplified}) {
  const  [newsCategory,setNewsCategory] = useState('Cryptocurrency');
  const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory: newsCategory,count: (simplified?6:50)});
  const {data: cryptosList} = useGetCryptosQuery(100);
  if(!cryptoNews?.value)  return <Loader/>;
  // console.log(cryptoNews);
  return (
    <Row gutter={[24,24]}>
      {!simplified &&(
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp = "children"
            onChange = {(value) => setNewsCategory(value)}
            filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptosList?.data?.coins.map((coin) => <Option key={coin.uuid} value={coin.name}>{coin.name}</Option>)}
          </Select>

        </Col>)}
      {cryptoNews.value.map((News,idx)=>(
        <Col xs={24} sm={12} lg={8} key={idx}>
          <Card hoverable className="news-card">
            <a href={News.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Typography.Text className="news-title">{News.name}</Typography.Text>
                <img src={News?.image?.thumbnail?.contentUrl || demoImage} alt='new' style={{ maxWidth:'100px',maxHeight:'100px'}}/>
              </div>
              <p>{News?.description.length>100?`${News.description.substring(0,100)} . . .`:News.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={News.provider[0]?.image?.thumbnail?.contentUrl || demoImage}/>
                  <Text className="provider-name">{News.provider[0]?.name}</Text>
                </div>
                <Text>{moment(News.datePublished).startOf('ss').fromNow()}</Text>  
              </div>
            </a>

          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News