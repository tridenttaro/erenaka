import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { PrimaryButton, QrReaderCustom } from "../components/atoms";
import useChangePage from "../hooks/useChangePage";
import downloadFile from "../lib/firebase/downloadFile";

const QrReaderReceiveFile: NextPage = () => {
  const [changePage] = useChangePage();

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
          changePage({ path: "/DownloadFile", query: { input: data } });
        }
      }
    },
    [changePage]
  );

  return (
    <>
      <PrimaryButton
        label={"戻る"}
        onClick={() => changePage({ path: "/DownloadFile" })}
      />
      <br />
      <QrReaderCustom handleScan={qrReaderHandleScan} />
    </>
  );
};

export default QrReaderReceiveFile;
