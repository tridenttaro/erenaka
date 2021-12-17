type Props = {};

const CreateGroup = (props: Props) => {
  return (
    <>
      <h2>Create Group</h2>
      <TextInput
        fullWidth={false}
        label={"Group Name"}
        multiline={false}
        required={true}
        onChange={inputGroupName}
        rows={1}
        value={groupName}
        type={"text"}
      />
      <PrimaryButton
        label={"Create GROUP"}
        onClick={() => createGroup_callback()}
      />
    </>
  );
};

export default CreateGroup;
