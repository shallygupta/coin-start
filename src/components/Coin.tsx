import React from 'react'
import { Link } from 'react-router-dom'
import { GiCancel} from 'react-icons/gi';
const Coin = ({coin, deleteCoin} :any) => {
  return (
    <Link to={`/coins/${coin.id}`} className='td-none'>
        <li className='coinlist-item'>
            <img className='coinlist-image' src={coin.image} alt="" />
            <span>{coin.current_price}</span>
            <span className={coin.price_change_percentage_24h > 0 ? 'color-green':'color-red'}>{coin.price_change_percentage_24h}</span>
            <GiCancel data-testid={`delete-coin-${coin.id}`}  onClick={(e)=>{e.preventDefault();deleteCoin(coin.id)}}/>
        </li>
    </Link>
  )
}

export default Coin