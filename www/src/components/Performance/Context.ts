import React, { useContext } from "react";
import { IPerformance, PERFORMANCE_EMPTY_STATE } from "./props";
const PerformanceContext = React.createContext<IPerformance>(
  PERFORMANCE_EMPTY_STATE
);
export default PerformanceContext;

export const usePerformance = () => useContext(PerformanceContext);
