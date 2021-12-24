type Props = {
  dirName: string;
};

const DirectoryCard = (props: Props) => {
  return (
    <>
      <p>{props.dirName}</p>
    </>
  );
};

export default DirectoryCard;
