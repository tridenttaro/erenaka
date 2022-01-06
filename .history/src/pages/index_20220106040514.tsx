import type { NextPage } from "next";
import Head from "next/head";
import layout from "../styles/layout.module.scss";
import Link from "next/link";
import { useContext, useCallback } from "react";
import { AuthContext } from "../components/organisms/AuthLayout";
import { SignedOut } from "../types/auth";
import { JoinedGroups } from "../components/organisms";

const Home: NextPage = () => {
  const context = useContext(AuthContext);
  const signedOut = context?.signedOut as SignedOut;

  return (
    <div>
      <Head>
        <title>電子名刺 | トップページ</title>
      </Head>

      <div>
        <h2 className={layout.center}>電子名刺</h2>

        <JoinedGroups />

        <Link href="/group/[...GroupDetail]" as="/group/ADuCNKOgb7dWJ0gpYRwv">
          <a>TestTest</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
