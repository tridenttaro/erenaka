type Props = {
  groupName: string;
};
const createGroup = (props: Props) => {
  const { groupName } = props;

  if (groupName == "") {
    alert("必須項目が未入力です");
    return false;
  }
};

export default createGroup;
