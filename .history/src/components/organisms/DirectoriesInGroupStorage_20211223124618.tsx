type Props = {
  groupId: string;
  directories: string[];
};

const DirectoriesInGroupStorage = (props: Props) => {
  const {groupId, directories} = props
  return (
    <>
      <h2>ディレクトリ一覧</h2>>
      {directories.length > 0 &&
        directories.map((dir) => (
          <DirectoriesInGroupStorage key={dir} dirName={dir} />
        ))}
    </>
  );
};

export default DirectoriesInGroupStorage;
