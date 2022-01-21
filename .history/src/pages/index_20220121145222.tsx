import type { NextPage } from "next";
import Head from "next/head";
import layout from "../styles/layout.module.scss";
import Link from "next/link";
import { useContext, useCallback } from "react";
import { AuthContext } from "../components/organisms/AuthLayout";
import { SignedOut } from "../types/auth";
import { JoinedGroups } from "../components/organisms";
import { BreadCrumbs } from "../components/molecules";

const Home: NextPage = () => {
  const context = useContext(AuthContext);
  const signedOut = context?.signedOut as SignedOut;

  //
  const browsePath = "/group/[...GroupDetail]";
  let truePath = "/group/ADuCNKOgb7dWJ0gpYRwv";

  return (
    <div>
      <Head>
        <title>電子名刺 | トップページ(グループ選択)</title>
      </Head>

      <BreadCrumbs />

      <div>
        <h2 className={layout.center}>エレナカ</h2>

        <JoinedGroups />

        {/* <Link href={browsePath} as={truePath}>
          <a>TestTest</a>
        </Link> */}
      </div>
    </div>
  );
};

export default Home;
