import TextInput from "../atoms/TextInput";

type props = {
  tdlist: string[];
};

const TextsList = (props: props) => {
  const tdlist: string[] = props.tdlist;
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

export default TextsList;
