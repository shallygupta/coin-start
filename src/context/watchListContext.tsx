import { createContext, useContext, useState } from "react";

type DeleteCoin = (coin:any)=>void

export const WatchListContext = createContext<
  { watchList: string[] , deleteCoin : DeleteCoin} | undefined
>(undefined);

export const WatchListContextProvider = ({ children }: any) => {
  const [watchList, setWatchList] = useState(["bitcoin", "ethereum", "ripple"]);
  const deleteCoin = (coin:any)=>{
    const list = watchList.filter(id=>{return id!==coin});
    setWatchList(list);

  }
  return (
    <WatchListContext.Provider value={{ watchList , deleteCoin}}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = ()=>{
    const context = useContext(WatchListContext);
    if(!context){
        throw new Error ("");
    }
    return context;

}