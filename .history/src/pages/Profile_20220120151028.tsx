import { useContext, useState } from "react";
import layout from "../../styles/layout.module.scss";
import Head from "next/head";
import { UserState } from "../types/auth";
import { AuthContext } from "../components/organisms/AuthLayout";
import { BreadCrumbs } from "../components/molecules";

const useStyles = makeStyles((theme) => ({
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
      height: "auto",
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: "auto",
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
}));

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
