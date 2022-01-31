import { CircularProgress } from "@material-ui/core";
import { Suspense } from "react";
import { BreadCrumbs } from "../components/molecules";
import {
  CreateGroup,
  RequestToJoinGroup,
  ReceiveRequests,
} from "../components/organisms";
import Head from "next/head";

const GroupManager = () => {
  const browsePath = "/GroupManager";
  let truePath = `/GroupManager`;
  const bc_lists = [{ name: "GroupManager", path: [browsePath, truePath] }];

  return (
    <>
      <Head>
        <title>電子名刺 | グループ管理</title>
      </Head>

      <BreadCrumbs lists={bc_lists} />

      <Suspense fallback={<CircularProgress />}>
        <ReceiveRequests />
      </Suspense>

      <CreateGroup />
      <hr />
      <RequestToJoinGroup />
    </>
  );
};

export default GroupManager;
