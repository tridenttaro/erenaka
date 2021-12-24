import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { PrimaryButton } from "../components/atoms";
import signOutAction from "../lib/firebase/signOutAction";
// signOut
import { useContext, useCallback } from "react";
import { AuthContext } from "../components/organisms/Auth";
import { SignedOut } from "../types/auth";

const Home: NextPage = () => {
  // signOut
  const context = useContext(AuthContext);
  const signedOut = context?.signedOut as SignedOut;
  const signOutActionCallback = useCallback(() => {
    signOutAction({ signedOut });
  }, [signedOut]);

  return (
    <div className={styles.container}>
      <Head>
        <title>電子名刺</title>
        <meta name="description" content="電子名刺サービス" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>タイトル</h2>

        <div className={styles.grid}>
          <Link href="/Test">
            <a className={styles.card}>TestTest</a>
          </Link>

          <Link href="/SignUp" passHref>
            <a className={styles.card}>SignUp</a>
          </Link>

          <Link href="/SignIn" passHref>
            <a className={styles.card}>SignIn</a>
          </Link>

          <Link href="/UploadFileToTemp" passHref>
            <a className={styles.card}>名刺交換(送信)</a>
          </Link>

          <Link href="/DownloadFile" passHref>
            <a className={styles.card}>名刺交換(受信)</a>
          </Link>

          <Link href="/GroupManager" passHref>
            <a className={styles.card}>GroupManager</a>
          </Link>

          <PrimaryButton
            label={"サインアウトする"}
            onClick={() => signOutActionCallback()}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
