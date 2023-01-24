import React, { useContext, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useWatchList, WatchListContext } from "../context/watchListContext";
import { fetchCoinList } from "../helpers/apis/coin.api";
import Coin from "./Coin";

const CoinList = () => {
  const [coins, setCoins] = useState<any | null>([]);
  const [isLoading, setIsLoading] =useState<boolean>(false);
  const { watchList, deleteCoin } = useWatchList();
  const params = useMemo(()=>{
    return {
      vs_currency: "usd",
      ids: watchList.join(","),
    }
  },[watchList])

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const data = await  fetchCoinList(params);
      setCoins(data);
      setIsLoading(false);
    }
    fetchData();
  }, [params]); 

  const renderCoins = () => {
    return (
      <div data-testid="coin-list">
      <ul className="coinlist list-group mt-2">
        {coins && coins.map((coin: any) => {
          return <Coin data-testid={`coin-${coin.id}`} key={coin.id} coin={coin} 
          deleteCoin={deleteCoin} />;
        })}
      </ul>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  return <div>{renderCoins()}</div>;
};

export default CoinList;
