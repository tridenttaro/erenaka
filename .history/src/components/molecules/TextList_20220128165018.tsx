import TextInput from "../atoms/TextInput";

type props = {
  list: string[];
};

const TextList = (props: props) => {
  const tdlist: string[] = props.list;
  return (
    <>
      {tdlist.length > 0 &&
        tdlist.map((value, index) => (
          <>
            <TextInput
              key={index}
              fullWidth={false}
              label={"list"}
              multiline={false}
              required={true}
              rows={1}
              value={value}
              type={"text"}
            />
            <br />
          </>
        ))}
    </>
  );
};

export default TextList;
