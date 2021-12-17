import CreateGroup from "../components/organisms/CreateGroup";
import ReceiveRequests from "../components/organisms/ReceiveRequests";
import RequestToJoinGroup from "../components/organisms/RequestToJoinGroup";

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
