import { GetServerSideProps } from "next";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { DirectoryList, ImageList } from "../../components/organisms";
import CreateDirectory from "../../components/organisms/CreateDirectory";
import getDirectories from "../../lib/firebase/groups/getDirectories";
import getImages from "../../lib/firebase/groups/getImages";
import { DirectoryData, GroupData, ImageData } from "../../types/other";
import { UploadImageToGroup } from "../../components/organisms";
import layout from "../../styles/layout.module.scss";
import Head from "next/head";
import { BreadCrumbs } from "../../components/molecules";
import { CircularProgress } from "@material-ui/core";
import getGroupsInfo from "../../lib/firebase/groups/getGroupsInfo";
import { AuthContext } from "../../components/organisms/AuthLayout";
import { UserState } from "../../types/auth";

const GroupDetail = () => {
  const context = useContext(AuthContext);
  const userState = context?.state as UserState;

  const browsePath = "/Profile";
  let truePath = `/Profile`;
  const bc_lists = [{ name: "Profile", path: [browsePath, truePath] }];

  return (
    <div className={layout.page}>
      <Head>
        <title>電子名刺 | プロフィール</title>
      </Head>

      <BreadCrumbs lists={bc_lists} />

      {groupsInfo && (
        <p>
          {groupsInfo[0].groupName} ({groupId})
        </p>
      )}

      {/* <Suspense fallback={<CircularProgress />}>
        <DirectoryList {...{ groupId, currentDirectory, directories }} />
      </Suspense> */}

      <Suspense fallback={<CircularProgress />}>
        <ImageList
          {...{
            groupId,
            currentDirectory,
            imageDataList,
            inputImages,
            updateImages,
          }}
        />
      </Suspense>

      {/* <CreateDirectory {...{ groupId, currentDirectory, updateDirectories }} /> */}
      <br />
      <hr />
      <br />
      <UploadImageToGroup {...{ groupId, currentDirectory, updateImages }} />
    </div>
  );
};

export default GroupDetail;
