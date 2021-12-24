import {
  JoinedGroups,
  CreateGroup,
  RequestToJoinGroup,
  ReceiveRequests,
} from "../components/organisms/";

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
