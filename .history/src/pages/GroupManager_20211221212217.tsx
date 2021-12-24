import CreateGroup from "../components/organisms/CreateGroup";
import JoinedGroups from "../components/organisms/JoinedGroups";
import ReceiveRequests from "../components/organisms/ReceiveRequests";
import RequestToJoinGroup from "../components/organisms/RequestToJoinGroup";

const GroupManager = () => {
  return (
    <>
      <JoinedGroups />

      <CreateGroup />

      <RequestToJoinGroup />

      <ReceiveRequests />
    </>
  );
};

export default GroupManager;
