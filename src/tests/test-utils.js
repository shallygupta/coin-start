import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WatchListContextProvider } from '../context/watchListContext';
import {QueryClient, QueryClientProvider} from "react-query";
import { rest } from "msw";
import * as React from "react";

export const handlers = [
  rest.get("https://api.coingecko.com/api/v3/coins/markets", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{"id":"bitcoin","symbol":"btc","name":"Bitcoins","image":"https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579","current_price":17237.12,"market_cap":331904395029,"market_cap_rank":1,"fully_diluted_valuation":361928407346,"total_volume":21952268656,"high_24h":17390.34,"low_24h":17166.32,"price_change_24h":-11.197104863062123,"price_change_percentage_24h":-0.06492,"market_cap_change_24h":-85494787.96691895,"market_cap_change_percentage_24h":-0.02575,"circulating_supply":19257931.0,"total_supply":21000000.0,"max_supply":21000000.0,"ath":69045,"ath_change_percentage":-75.03902,"ath_date":"2021-11-10T14:24:11.849Z","atl":67.81,"atl_change_percentage":25315.87472,"atl_date":"2013-07-06T00:00:00.000Z","roi":null,"last_updated":"2023-01-10T12:43:11.200Z"},{"id":"ethereum","symbol":"eth","name":"Ethereum","image":"https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880","current_price":1327.07,"market_cap":159880151032,"market_cap_rank":2,"fully_diluted_valuation":159880151032,"total_volume":6716101903,"high_24h":1343.81,"low_24h":1317.42,"price_change_24h":6.87,"price_change_percentage_24h":0.52048,"market_cap_change_24h":901856291,"market_cap_change_percentage_24h":0.56728,"circulating_supply":120523864.310711,"total_supply":120523864.310711,"max_supply":null,"ath":4878.26,"ath_change_percentage":-72.8146,"ath_date":"2021-11-10T14:24:19.604Z","atl":0.432979,"atl_change_percentage":306190.90456,"atl_date":"2015-10-20T00:00:00.000Z","roi":{"times":101.94700041831983,"currency":"btc","percentage":10194.700041831982},"last_updated":"2023-01-10T12:43:03.844Z"},{"id":"ripple","symbol":"xrp","name":"XRP","image":"https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731","current_price":0.348802,"market_cap":17650730035,"market_cap_rank":6,"fully_diluted_valuation":34866818593,"total_volume":1209832130,"high_24h":0.357431,"low_24h":0.345405,"price_change_24h":-0.003194567361005152,"price_change_percentage_24h":-0.90756,"market_cap_change_24h":-151057197.30220032,"market_cap_change_percentage_24h":-0.84855,"circulating_supply":50623288122.0,"total_supply":99989164463.0,"max_supply":100000000000.0,"ath":3.4,"ath_change_percentage":-89.74362,"ath_date":"2018-01-07T00:00:00.000Z","atl":0.00268621,"atl_change_percentage":12875.8469,"atl_date":"2014-05-22T00:00:00.000Z","roi":null,"last_updated":"2023-01-10T12:43:04.680Z"}])
    );
  }),
  rest.post("*/users", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "Chuck Norris",
      })
    );
  }),
];
const queryClient =  new QueryClient({
    defaultOptions:{
        queries:{
          refetchOnWindowFocus : false,
    
          retry: false
        }
      }
})
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
        <WatchListContextProvider>{ui}</WatchListContextProvider>
    </QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
           <WatchListContextProvider>{rerenderUi}</WatchListContextProvider>
        </QueryClientProvider>
      ),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={testQueryClient}>
     <WatchListContextProvider>{children}</WatchListContextProvider>
    </QueryClientProvider>
  );
}

///
const wrapperWithProviders= (options) =>{
    const additionalResults = {
    };
    const providers = [({children})=>(
        <QueryClientProvider client={queryClient} >
        <WatchListContextProvider>{children}</WatchListContextProvider>
        </QueryClientProvider>
    ),
];
 
    const wrapper = providers.reduce((AccumulatedProvider, Provider)=>
    ({children})=>(
        <AccumulatedProvider>
            <Provider>{children}</Provider>
        </AccumulatedProvider>
    ))
    return [wrapper, additionalResults]
}

const customRender = (ui, options={router:false})=>{
    const [wrapper, additionalResults] = wrapperWithProviders(options);
    const renderResult = render(ui,{
        wrapper,
        ...options
    });
    return {
        ...renderResult,
        ...additionalResults
    }
}

export {customRender as render}