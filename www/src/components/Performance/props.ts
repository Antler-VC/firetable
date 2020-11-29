export type performanceProps = any;
export interface IPerformance {
  handleClear: () => void;
  storeEntry:(data:any)=> void;
  exportPerformance:(profileIds)=>void;
  profileIds:string[]
}
export const PERFORMANCE_EMPTY_STATE = {
  store: undefined,
  handleClear: () => {},
  storeEntry: () => {},
  exportPerformance: () => {},
  profileIds:[]
};
