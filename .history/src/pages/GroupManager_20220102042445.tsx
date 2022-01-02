import {
  CreateGroup,
  RequestToJoinGroup,
  ReceiveRequests,
} from "../components/organisms";

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
