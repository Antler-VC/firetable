import React, { useEffect, useState } from "react";
import { useSocket, useLastMessage } from "use-socketio";
import { useAppContext } from "contexts/appContext";
import { useFiretableContext } from "contexts/firetableContext";
const TableUsers = () => {
  const [connected, setConnected] = useState(false);
  const { data: tableUsers } = useLastMessage("tableUsers");
  const { socket, subscribe, unsubscribe } = useSocket("enterTable");
  const { userDoc } = useAppContext();
  const { tableState } = useFiretableContext();
  useEffect(() => {
    if (!connected && userDoc.state?.doc?.user) {
      console.log({ user: userDoc.state.doc.user });
      setConnected(true);
      socket.emit("enterTable", {
        ftUser: userDoc.state.doc.user,
        tablePath: tableState?.tablePath,
      });
    }
  }, [userDoc]);
  console.log({ tableUsers });
  return <></>;
};
export default TableUsers;
