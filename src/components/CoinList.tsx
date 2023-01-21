import React, { useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useWatchList, WatchListContext } from "../context/watchListContext";
import { fetchCoinList } from "../helpers/apis/coin.api";
import Coin from "./Coin";

const CoinList = () => {
  const [coins, setCoins] = useState<any | null>([]);
  const { watchList, deleteCoin } = useWatchList();
  const queryClient = useQueryClient();
  console.log("watchList : " + watchList);
  const params = {
    vs_currency: "usd",
    ids: watchList.join(","),
  };
  const { isLoading, data, refetch } = useQuery(["coinList"], () => {
    return fetchCoinList(params);
  });
  useEffect(()=>{
    setCoins(data);
  },[data])
  useEffect(() => {
    if(watchList.length > 0){
      refetch();
    }else{
     setCoins([]);
  }}, [watchList]);
  const renderCoins = () => {
    return (
      <ul className="coinlist list-group mt-2">
        {coins && coins.map((coin: any) => {
          return <Coin key={coin.id} coin={coin} deleteCoin={deleteCoin} />;
        })}
      </ul>
    );
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  return <div>{renderCoins()}</div>;
};

export default CoinList;
