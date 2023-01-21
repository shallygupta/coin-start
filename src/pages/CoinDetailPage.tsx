import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import HistoryChart from '../components/HistoryChart';
import { fetchCoinDetail } from '../helpers/apis/coin.api';

const CoinDetailPage = () => {
  const {cryptocurrency} = useParams();
  console.log(cryptocurrency);
  const param= {
    id : cryptocurrency,
    vs_currency: "usd",
    days : "1"
  }
  const {isLoading, data}=useQuery("coinDetail",()=>{
    return fetchCoinDetail(param);
  });

  if(isLoading){
    return <div>Loading ...</div>

  }
  return (
    <div><HistoryChart/></div>
  )
}

export default CoinDetailPage