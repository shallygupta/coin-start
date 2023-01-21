import axios from "axios";
import { ErrorResponse, FetchError } from "../../api.types/error";

export const coinsApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins",
});

export const fetchCoinList = async (params: any): Promise<any> => {
  try {
    const { data } = await coinsApi.get(
      "/markets?order=market_cap_desc&per_page=100&page=1&sparkline=false",
      {
        params: params,
      }
    );
    return data;
  } catch (error) {
    return Promise.reject(error as FetchError<ErrorResponse>);
  }
};

export const fetchCoinDetail = async (params: any): Promise<any> => {
  try {
    const [day, week, year]  = await Promise.all([
      coinsApi.get(`/${params.id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "1",
        },
      }),
      coinsApi.get(`/${params.id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "7",
        },
      }),
      coinsApi.get(`/${params.id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "365",
        },
      }),
    ]);
    const data ={day, week, year};
    return data;
  } catch (error) {
    return Promise.reject(error as FetchError<ErrorResponse>);
  }
};
