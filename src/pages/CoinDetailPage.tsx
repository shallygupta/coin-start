import React from "react";
import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import HistoryChart from "../components/HistoryChart";
import { fetchCoinDetail } from "../helpers/apis/coin.api";

const CoinDetailPage = () => {
  const { cryptocurrency } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coin, setCoin] = useState();
  const params = {
    id: cryptocurrency,
    vs_currency: "usd",
    days: "1",
  };

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const data = await fetchCoinDetail(params);
      setCoin(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div data-testid="coin-detail-page">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div data-testid="coin-page">{cryptocurrency}</div>
      )}
    </div>
  );
};

export default CoinDetailPage;
