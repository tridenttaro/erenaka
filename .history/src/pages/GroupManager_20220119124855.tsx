import { BreadCrumbs } from "../components/molecules";
import {
  CreateGroup,
  RequestToJoinGroup,
  ReceiveRequests,
} from "../components/organisms";

const GroupManager = () => {
  return (
    <>
      <BreadCrumbs />

      <ReceiveRequests />

      <CreateGroup />

      <RequestToJoinGroup />
    </>
  );
};

export default GroupManager;
