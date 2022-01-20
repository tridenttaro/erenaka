
import useContext, useState } from "react";

import layout from "../../styles/layout.module.scss";
import Head from "next/head";

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


 
    </div>
  );
};

export default GroupDetail;
