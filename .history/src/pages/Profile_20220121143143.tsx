import { useContext, useState } from "react";
import Head from "next/head";
import { UserState } from "../types/auth";
import { AuthContext } from "../components/organisms/AuthLayout";
import { BreadCrumbs } from "../components/molecules";
import { makeStyles } from "@material-ui/core";

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
        {/* <div className={classes.detail}> */}
        <h2 className="u-text__headline">{userState.uid}</h2>
        <p className={classes.price}>{userState.username}</p>
        <div className="module-spacer--small" />

        <div className="module-spacer--small" />
      </div>
      {/* </div> */}
    </div>
  );
};

export default GroupDetail;
