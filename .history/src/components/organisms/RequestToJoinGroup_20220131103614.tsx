import { useCallback, useContext, useEffect, useState } from "react";
import requestJoinGroup from "../../lib/firebase/groups/requestToJoinGroup";
import { AuthContext } from "./AuthLayout";
import { UserState } from "../../types/auth";
import { PrimaryButton, TextInput } from "../atoms";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

type Props = {};

const RequestToJoinGroup = () => {
  const [groupId, setGroupId] = useState("");
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  const router = useRouter();

  useEffect(() => {
    if (router.query.input != undefined && router.query.input != "{}") {
      setGroupId(router.query.input as string);
    }
  }, [router]);

  const inputGroupId = useCallback(
    (event) => {
      setGroupId(event.target.value);
    },
    [setGroupId]
  );

  const requestToJoinGroupCallback = useCallback(() => {
    requestJoinGroup({
      userState: contextUserState,
      groupId,
      setGroupId,
    });
  }, [contextUserState, groupId, setGroupId]);
  return (
    <>
      <h2>グループへの参加</h2>
      <TextInput
        fullWidth={false}
        label={"Group Id"}
        multiline={false}
        required={true}
        onChange={inputGroupId}
        rows={1}
        value={groupId}
        type={"text"}
      />
      <PrimaryButton
        label={"REQUEST JOIN GROUP"}
        onClick={requestToJoinGroupCallback}
      />
      <br />
      <br />
      <Link href="/QrReaderReceiveFile" passHref>
        {/* <a className={styles.card}>UploadFile</a> */}
        <a>QRコードで読み取る</a>
      </Link>
    </>
  );
};

export default RequestToJoinGroup;
