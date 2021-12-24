import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react";
import { PrimaryButton, QrReaderCustom } from "../components/atoms";

const QrReaderReceiveFile: NextPage = () => {
  const router = useRouter();

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
          // 読み取った値が正常である
          router.push({ pathname: "/DownloadFile", query: { input: data } });
        }
      }
    },
    [router]
  );

  return (
    <>
      <PrimaryButton
        label={"戻る"}
        onClick={() => router.push("/DownloadFile")}
      />
      <br />
      <QrReaderCustom handleScan={qrReaderHandleScan} />
    </>
  );
};

export default QrReaderReceiveFile;
