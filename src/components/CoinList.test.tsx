import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import CoinList from './CoinList';
import { render } from '../tests/test-utils';
import nock from 'nock';

test('renders delete react link',async () => {
  nock(/.*/).get('/api.coingecko.com/api/v3/coins/markets').query(true).reply(200,[{"id":"bitcoin","symbol":"btc","name":"Bitcoin","image":"https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579","current_price":17434.49,"market_cap":335779071152,"market_cap_rank":1,"fully_diluted_valuation":366137311462,"total_volume":22127197790,"high_24h":17507.77,"low_24h":17199.25,"price_change_24h":227.49,"price_change_percentage_24h":1.32206,"market_cap_change_24h":4487581881,"market_cap_change_percentage_24h":1.35457,"circulating_supply":19258787.0,"total_supply":21000000.0,"max_supply":21000000.0,"ath":69045,"ath_change_percentage":-74.75236,"ath_date":"2021-11-10T14:24:11.849Z","atl":67.81,"atl_change_percentage":25607.75581,"atl_date":"2013-07-06T00:00:00.000Z","roi":null,"last_updated":"2023-01-11T06:56:11.544Z"},{"id":"ethereum","symbol":"eth","name":"Ethereum","image":"https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880","current_price":1333.4,"market_cap":160697693770,"market_cap_rank":2,"fully_diluted_valuation":160697693770,"total_volume":6029536785,"high_24h":1342.62,"low_24h":1322.93,"price_change_24h":8.39,"price_change_percentage_24h":0.63315,"market_cap_change_24h":1062033160,"market_cap_change_percentage_24h":0.66529,"circulating_supply":120523405.953177,"total_supply":120523405.953177,"max_supply":null,"ath":4878.26,"ath_change_percentage":-72.65882,"ath_date":"2021-11-10T14:24:19.604Z","atl":0.432979,"atl_change_percentage":307945.96168,"atl_date":"2015-10-20T00:00:00.000Z","roi":{"times":101.25609048746121,"currency":"btc","percentage":10125.60904874612},"last_updated":"2023-01-11T06:56:07.640Z"},{"id":"ripple","symbol":"xrp","name":"XRP","image":"https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731","current_price":0.359279,"market_cap":18221889403,"market_cap_rank":6,"fully_diluted_valuation":35995072780,"total_volume":1187756287,"high_24h":0.366769,"low_24h":0.347461,"price_change_24h":0.01053915,"price_change_percentage_24h":3.02206,"market_cap_change_24h":567201296,"market_cap_change_percentage_24h":3.21275,"circulating_supply":50623288122.0,"total_supply":99989164463.0,"max_supply":100000000000.0,"ath":3.4,"ath_change_percentage":-89.32879,"ath_date":"2018-01-07T00:00:00.000Z","atl":0.00268621,"atl_change_percentage":13400.662,"atl_date":"2014-05-22T00:00:00.000Z","roi":null,"last_updated":"2023-01-11T06:56:09.439Z"}])
  render(<CoinList />);
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();
  expect(screen.getByText("Loading")).toBeInTheDocument();
  await waitFor(async ()=>{
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
    expect(await screen.findByTestId("delete-coinbitcoin")).toBeInTheDocument();
  })
});
