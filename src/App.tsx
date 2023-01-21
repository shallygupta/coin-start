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
       <QueryClientProvider client={querClient}>
     
      <WatchListContextProvider>
      <BrowserRouter>
        <Routes>
        <Route  path='/' element  = {<CoinSummarPage/>}></Route>
        <Route  path='/coins/:cryptocurrency' element  = {<CoinDetailPage/>}></Route>

        </Routes>
      </BrowserRouter>
      
      </WatchListContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
