import axios from "axios";
import { NextPage } from "next";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { DeviceData, UploadKeys } from "../types/sendAnywhere";
import PrimaryButton from "../components/atoms/PrimaryButton";
import TextInput from "../components/atoms/TextInput";
import { getCreateKey, receiveFile, updateDevice } from "../lib/sendAny";

const Test: NextPage = () => {
  const [imageData, setImageData] = useState<File>();
  const [deviceData, setDeviceData] = useState<DeviceData>();
  const [uploadKeys, setUploadKeys] = useState<UploadKeys>();
  const [receiveKey, setReceiveKey] = useState<string>("");

  useEffect(() => {
    updateDevice(setDeviceData);
  }, []);

  const inputUploadKeys = useCallback(
    (keys: UploadKeys) => {
      setUploadKeys(keys);
    },
    [setUploadKeys]
  );
  const inputReceiveKey = useCallback(
    (event) => {
      setReceiveKey(event.target.value);
    },
    [setReceiveKey]
  );

  const memoReceiveFile = useCallback(() => {
    if (!deviceData || !deviceData.device_key || !receiveKey) return;
    const deviceKey = deviceData.device_key;
    receiveFile(receiveKey, deviceKey);
  }, [receiveKey, deviceData]);

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImageData(iconFile);
    // console.log("setImagedata: " + iconFile)
  };

  const createKey = () => {
    if (!imageData) return;

    const formData = new FormData();

    // 一意なデバイスキー
    const deviceKey = deviceData?.device_key as string;
    const size = (imageData.size as number).toString();
    formData.append("file0", imageData, imageData.name);

    console.log("formdata");
    console.log(formData);

    getCreateKey(
      imageData.name,
      size,
      deviceKey,
      formData,
      inputUploadKeys,
      imageData
    );

    // const zipcode = '9071801';
    // testApi(zipcode);
  };

  return (
    <>
      <h2>SEND FILE AREA</h2>
      <label>
        <input
          type="file"
          accept="image/*,.png,.jpg,.jpeg"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
        />
      </label>
      <p>{uploadKeys?.key ? uploadKeys.key : "No-Key"}</p>

      <PrimaryButton label={"SEND FILE"} onClick={createKey} />
      <br />
      <br />
      <PrimaryButton
        label={"WATCH response"}
        onClick={() => {
          console.log(deviceData);
          console.log(uploadKeys);
        }}
      />
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
        onChange={inputReceiveKey}
        rows={1}
        value={receiveKey}
        type={"text"}
      />

      <PrimaryButton label={"RECEIVE FILE"} onClick={memoReceiveFile} />
    </>
  );
};

export default Test;
