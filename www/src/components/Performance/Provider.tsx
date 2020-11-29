import React, { useState } from "react";

import {
  IPerformance,
  PERFORMANCE_EMPTY_STATE,
  performanceProps,
} from "./props";

import { parse as json2csv } from "json2csv";
import Dock from './Dock'
import PerformanceContext from "./Context";
interface IPerformanceProviderProps {
  children: React.ReactNode;
}
let store = {}
const PerformanceProvider: React.FC<IPerformanceProviderProps> = ({
  children,
}) => {

  const [profileIds,setProfileIds] = useState<string[]>([])
  const handleClear = () => {

    setProfileIds([])
  };
  const storeEntry = (data: any) =>{
    const {id,...props} = data
      if(profileIds.includes(data.id)&&store[id]){
        const newArray = [...store[id],props]
        store = {...store,[id]:newArray}
      }else{
        setProfileIds([...profileIds,id])
        store = {...store,[id]:[props]}
      } 

  }
  const exportPerformance =(ids:string[]) =>{
        console.log(store)

      const data = store
      const csv = json2csv(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      saveAs(blob, `export.csv`);
  }
  return (
    <PerformanceContext.Provider
      value={{
        handleClear,
        storeEntry,
        exportPerformance,
        profileIds:[],
      }}
    >
      {children}
      <Dock/>
    </PerformanceContext.Provider>
  );
};

export default PerformanceProvider;
