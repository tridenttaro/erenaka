import { BreadCrumbs } from "../components/molecules";
import {
  CreateGroup,
  RequestToJoinGroup,
  ReceiveRequests,
} from "../components/organisms";

const GroupManager = () => {
  const browsePath = "/GroupManager";
  let truePath = `/GroupManager`;
  const bc_lists = [{ name: "GroupManager", path: [browsePath, truePath] }];

  return (
    <>
      <BreadCrumbs lists={bc_lists} />

      <ReceiveRequests />

      <CreateGroup />

      <RequestToJoinGroup />
    </>
  );
};

export default GroupManager;
