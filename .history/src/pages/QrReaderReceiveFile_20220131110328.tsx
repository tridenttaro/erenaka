import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react";
import { PrimaryButton, QrReaderCustom } from "../components/atoms";
import Head from "next/head";

const QrReaderReceiveFile: NextPage = () => {
  const router = useRouter();

  const [returnPage, setReturnPage] = useState<string>();

  useEffect(() => {
    if (router.query.input != undefined && router.query.input != "{}") {
      const q = router.query.input as string;
      if (q === "group") {
        setReturnPage("/GroupManager");
      } else if (q === "image") {
        setReturnPage("/DownloadFile");
      } else {
        setReturnPage("/");
      }
    }
  }, [router]);

  const qrReaderHandleScan = useCallback(
    (data) => {
      console.log(data);
      if (data === "" || isNaN(parseInt(data, 10))) {
        return;
      } else {
        const keyNum = parseInt(data, 10);
        if (keyNum < 0 || keyNum > 99999) {
          return;
        } else {
          if (returnPage && returnPage !== "") {
            // 読み取った値が正常である
            router.push({ pathname: returnPage, query: { input: data } });
          }
        }
      }
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>電子名刺 | QR読み込み</title>
      </Head>

      <PrimaryButton label={"戻る"} onClick={() => router.push(returnPage)} />
      <br />
      <div className="module-spacer--small" />

      <QrReaderCustom handleScan={qrReaderHandleScan} />
    </>
  );
};

export default QrReaderReceiveFile;
