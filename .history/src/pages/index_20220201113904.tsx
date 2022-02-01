import type { NextPage } from "next";
import Head from "next/head";
import layout from "../styles/layout.module.scss";
import Link from "next/link";
import { useContext, useCallback } from "react";
import { AuthContext } from "../components/organisms/AuthLayout";
import { JoinedGroups } from "../components/organisms";
import { BreadCrumbs } from "../components/molecules";

const Home: NextPage = () => {
  const context = useContext(AuthContext);

  return (
    <div>
      <Head>
        <title>電子名刺 | トップページ(グループ選択)</title>
      </Head>

      <BreadCrumbs />

      <div>
        <h2 className={layout.center}>エレネカ</h2>

        <JoinedGroups />

        {/* <Link href={browsePath} as={truePath}>
          <a>TestTest</a>
        </Link> */}
      </div>
    </div>
  );
};

export default Home;
