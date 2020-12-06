import React, { Profiler as ReactProfiler } from "react";
import { usePerformance } from "./index";
function round(num, dec) {
  const [sv, ev] = num.toString().split("e");
  return Number(
    Number(Math.round(parseFloat(sv + "e" + dec)) + "e-" + dec) +
      "e" +
      (ev || 0)
  );
}

const Profiler = ({
  id,
  phase,
  children,
}: {
  id: string;
  phase?: "mount" | "update";
  children: JSX.Element;
}) => {
  const performanceContext = usePerformance();
  function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    renderPhase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) {
    if (phase) {
      if (phase === renderPhase)
        performanceContext.storeEntry({
          id,
          actualDuration: round(actualDuration, 7),
          baseDuration: round(baseDuration, 5),
          commitTime: round(commitTime, 5),
        });
    } else
      performanceContext.storeEntry({
        id,
        actualDuration: round(actualDuration, 7),
        baseDuration: round(baseDuration, 5),
        commitTime: round(commitTime, 5),
      });
  }
  return (
    <ReactProfiler id={id} onRender={onRenderCallback}>
      {children}
    </ReactProfiler>
  );
};
export default Profiler;
