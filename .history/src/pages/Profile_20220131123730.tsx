import { useContext, useState } from "react";
import Head from "next/head";
import { UserState } from "../types/auth";
import { AuthContext } from "../components/organisms/AuthLayout";
import { BreadCrumbs } from "../components/molecules";
import { makeStyles } from "@material-ui/core";
import { TextDetail } from "../components/atoms";
import { JoinedGroups } from "../components/organisms";

const useStyles = makeStyles((theme) => ({
  detail: {
    textAlign: "left",
    padding: "auto 50px",
    [theme.breakpoints.down("sm")]: {
      margin: "20px auto 16px auto",
      height: "auto",
      width: "90%",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "10px auto 0 auto",
      height: "auto",
      width: "65%",
    },
    backgroundColor: "lightYellow",
    wordBreak: "break-word",
  },
  price: {
    fontSize: 36,
  },
}));

const GroupDetail = () => {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const userState = context?.state as UserState;

  const browsePath = "/Profile";
  let truePath = `/Profile`;
  const bc_lists = [{ name: "Profile", path: [browsePath, truePath] }];

  return (
    <div>
      <Head>
        <title>電子名刺 | プロフィール</title>
      </Head>

      <BreadCrumbs lists={bc_lists} />

      <div className="p-grid__row">
        <div className={classes.detail}>
          <div className="module-spacer--small" />
          <TextDetail label="ユーザー名" value={userState.username} />
          <div className="module-spacer--small" />
          <TextDetail label="ユーザーID" value={userState.uid} />
          <div className="module-spacer--small" />

          <JoinedGroups />

          <div className="module-spacer--small" />
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
