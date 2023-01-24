import React from 'react'
import AddCoin from '../components/AddCoin'
import CoinList from '../components/CoinList2'

const CoinSummarPage = () => {
  return (
    <div data-testid="coin-page"><AddCoin/>
    <CoinList/>
    </div>
  )
}

export default CoinSummarPage