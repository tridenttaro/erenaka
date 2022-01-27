import { DirectoryData } from "../../types/other";
import { DirectoryCard } from "../molecules";

type Props = {
  groupId: string;
  currentDirectory: string[];
  directories: DirectoryData[];
};

const DirectoryList = ({ groupId, currentDirectory, directories }: Props) => {
  const  = props;

  const [directories, setDirectories] = useState<DirectoryData[]>([]);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {directories.length > 0 &&
          directories.map((dir) => (
            <DirectoryCard
              key={dir.directoryName}
              groupId={groupId}
              currentDirectory={currentDirectory}
              dirInfo={dir}
            />
          ))}
      </div>
    </section>
  );
};

export default DirectoryList;
