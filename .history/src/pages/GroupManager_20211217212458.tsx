import { useCallback, useContext, useEffect, useState } from "react";
import CreateGroup from "../components/organisms/CreateGroup";
import ReceiveRequests from "../components/organisms/ReceiveRequests";
import RequestToJoinGroup from "../components/organisms/RequestToJoinGroup";
import createGroup from "../lib/firebase/createGroup";
import receiveRequests from "../lib/firebase/receiveRequests";
import requestJoinGroup from "../lib/firebase/requestToJoinGroup";
import { JoinedGroup, UserState } from "../types/firebase";
import { AuthContext } from "./Auth";

const GroupManager = () => {
  return (
    <>
      <CreateGroup />

      <RequestToJoinGroup />

      <ReceiveRequests />
    </>
  );
};

export default GroupManager;
