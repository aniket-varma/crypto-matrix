import React,{useState} from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi.js';
import {Typography,Row,Col,Select,Button,Input,Space,Card} from 'antd';
import {Loader} from './index.js';
import { useGetCryptoRateQuery } from '../services/cryptoRateApi.js';
import FormItemInput from 'antd/es/form/FormItemInput.js';
import { convertLegacyProps } from 'antd/es/button/button.js';

const {Option} = Select;
function Converter() {
  const {data,isFetching} = useGetCryptosQuery(100);
  const [from,setFrom] = useState("BTC");
  const [fromInput,setFromInput] = useState(0);
  const [to,setTo] = useState("BTC");
  const [toInput,setToInput] = useState(0);
  const {data:rate,isFetching: flag} = useGetCryptoRateQuery({from,to});
  if(isFetching || flag)  return <Loader/>;
  // console.log(from +" "+ to)
  // console.log(rate["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
  const exchangeRate = rate["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
  const selectAfterP =(
    <Select
      showSearch
      className="select-news"
      optionFilterProp = "children"
      onChange = {(value) => setFrom(value)}
      filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      defaultValue ={from}
    >
      {data?.data?.coins.map((coin) => <Option key={coin.uuid} value={coin.symbol}>{coin.symbol}</Option>)}
    </Select>
  )
  const selectAfterS =(
    <Select
      showSearch
      className="select-news"
      optionFilterProp = "children"
      onChange = {(value) => setTo(value)}
      filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      defaultValue ={to}
    >
      {data?.data?.coins.map((coin) => <Option key={coin.uuid} value={coin.symbol}>{coin.symbol}</Option>)}
    </Select>
  )
  let convert = () => {
    let value = parseFloat(fromInput)*parseFloat(exchangeRate);
    // console.log(value + "  "+rate["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
    setToInput(value);
  }
  return (
    <Col span={18}>
      <Row><Typography.Title className="exchange-heading headcolor">Cryptocurrency Converter</Typography.Title></Row>
      <div className="converter-container">
        <Card>
          <Space direction="vertical">
            <Row>
              <Typography.Title level={5}>Primary Currency</Typography.Title>
              <Input addonAfter={selectAfterP} defaultValue={fromInput} onChange={(e)=>setFromInput(e.target.value)}/>
            </Row>
            <Row>
              <Typography.Title level={5}>Secondary Currency</Typography.Title>
              <Input addonAfter={selectAfterS} value={toInput} disabled={true}/>
            </Row>
            <div className="exchange-rate-container">
              <Button size="medium" className="converter-button" onClick={convert}>Convert</Button>
              <Typography.Title level={5}>1 ({from}) = {exchangeRate} ({to})</Typography.Title>
            </div>
          </Space>
        </Card>
      </div>
    </Col>

  )
}

export default Converter;