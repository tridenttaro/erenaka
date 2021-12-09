import axios from "axios";
import { NextPage } from "next";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { DeviceData, UploadKeys } from "../types/sendAnywhere";
import PrimaryButton from "../components/atoms/PrimaryButton";
import TextInput from "../components/atoms/TextInput";
import { getCreateKey, receiveFile, updateDevice } from "../lib/sendAny";

const SendReceiveImage: NextPage = () => {
  const [imageData, setImageData] = useState<File>();

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImageData(iconFile);
    // console.log("setImagedata: " + iconFile)
  };

  return (
    <>
      <h2>SEND FILE</h2>
      <label>
        <input
          type="file"
          accept="image/*,.png,.jpg,.jpeg"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
        />
      </label>

      <PrimaryButton label={"SEND FILE"} onClick={} />
      <br />
      <br />
      <PrimaryButton label={"TEST"} onClick={() => {}} />
      <br />
      <br />
      <hr />
      <br />
      <br />

      <h2>RECEIVE FILE AREA</h2>

      <TextInput
        fullWidth={false}
        label={"key"}
        multiline={false}
        required={true}
        onChange={}
        rows={1}
        value={}
        type={"text"}
      />

      <PrimaryButton label={"RECEIVE FILE"} onClick={} />
    </>
  );
};

export default SendReceiveImage;
