import TextInput from "../atoms/TextInput";

type props = {
  label: string;
  list: string[];
};

const TextList = (props: props) => {
  const { label, list } = props;
  return (
    <>
      <p>{label}</p>
      {list.length > 0 &&
        list.map((value, index) => (
          <>
            <TextInput
              key={index}
              fullWidth={false}
              label={""}
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
