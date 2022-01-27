import { useCallback, useEffect, useState } from "react";
import getDirectories from "../../lib/firebase/groups/getDirectories";
import { DirectoryData } from "../../types/other";
import { DirectoryCard } from "../molecules";

type Props = {
  groupId: string;
  currentDirectory: string[];
};

const DirectoryList = ({ groupId, currentDirectory }: Props) => {
  const [directories, setDirectories] = useState<DirectoryData[]>([]);

  useEffect(() => {
    getDirectories({ groupId, currentDirectory, setDirectories });
  }, [groupId, currentDirectory]);

  const updateDirectories = useCallback(() => {
    getDirectories({ groupId, currentDirectory, setDirectories });
  }, [groupId, currentDirectory]);

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

      <CreateDirectory {...{ groupId, currentDirectory, updateDirectories }} />
    </section>
  );
};

export default DirectoryList;
