import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <div>
        {/* <Link href="/Todo">
          <a>TodoTodo</a>
        </Link> */}

        <Link href="/Test">
          <a>TestTest</a>
        </Link>

        <Link href="/SignUp">
          <a>SignUpSignUp</a>
        </Link>
      </div>
    </>
  );
};

export default Home;
