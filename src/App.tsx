import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoinSummarPage from './pages/CoinSummarPage';
import { QueryClient , QueryClientProvider } from 'react-query';
import { WatchListContextProvider } from './context/watchListContext';
import CoinDetailPage from './pages/CoinDetailPage';

const querClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus : false,

      retry: false
    }
  }
})
function App() {
  return (
    <div className="App">
      
      <WatchListContextProvider>
      
        <Routes>
        <Route  path='/' element  = {<CoinSummarPage/>}></Route>
        <Route  path='/coins/:cryptocurrency' element  = {<CoinDetailPage/>}></Route>

        </Routes>
      
      
      </WatchListContextProvider>
      
    </div>
  );
}

export default App;
