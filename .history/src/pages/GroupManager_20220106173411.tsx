import {
  CreateGroup,
  RequestToJoinGroup,
  ReceiveRequests,
} from "../components/organisms";

const GroupManager = () => {
  return (
    <>
      <ReceiveRequests />

      <CreateGroup />

      <RequestToJoinGroup />
    </>
  );
};

export default GroupManager;
