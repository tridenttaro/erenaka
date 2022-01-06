import type { NextPage } from "next";
import Head from "next/head";
import layout from "../styles/layout.module.css";
import signOutAction from "../lib/firebase/auth/signOutAction";
import { useContext, useCallback } from "react";
import { AuthContext } from "../components/organisms/AuthLayout";
import { SignedOut } from "../types/auth";
import { JoinedGroups } from "../components/organisms";

const Home: NextPage = () => {
  // signOut
  const context = useContext(AuthContext);
  const signedOut = context?.signedOut as SignedOut;
  const signOutActionCallback = useCallback(() => {
    signOutAction({ signedOut });
  }, [signedOut]);

  return (
    <div>
      <Head>
        <title>電子名刺</title>
        <meta name="description" content="電子名刺サービス" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div>
        <h2 className={layout.center}>タイトル</h2>

        <JoinedGroups />

        {/* <div className={styles.grid}>
          <Link href="/Test">
            <a className={styles.card}>TestTest</a>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
