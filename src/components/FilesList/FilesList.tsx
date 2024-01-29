import { useEffect, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
} from "firebase/storage";
import FileSaver from "file-saver";
import { getDatabase, ref as refDb, onValue } from "firebase/database";

type FilesListProps = {
  email: string;
  userID: string;
};

function FilesList(props: FilesListProps) {
  const [files, setFiles] = useState<Array<any>>([]);
  const [fileCampaignRelations, setFileCampaignRelations] = useState<
    Array<any>
  >([]);
  const storage = getStorage();
  const db = getDatabase();

  async function downloadFile(file: any) {
    const fileUrl = await getDownloadURL(file);
    FileSaver.saveAs(fileUrl, file.name, { autoBom: true });
  }

  function deleteFile(file: any) {
    const deleteRef = ref(storage, "/" + props.email + "/" + file.name);
    deleteObject(deleteRef);
  }

  useEffect(() => {
    listAll(ref(storage, "/" + props.email)).then((result) => {
      setFiles(result.items as Array<any>);
    });

    const query = refDb(db, "/files/" + props.userID);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      setFileCampaignRelations(data.files);
    });
  }, []);

  function findFileCampaignRelation(fileName: any) {
    let campaign = "";
    fileCampaignRelations.forEach((relation) => {
      if (relation.file === fileName) campaign = relation.campaign;
    });
    return campaign;
  }

  return (
    <ul>
      {files?.map((file, index) => (
        <li key={index}>
          <span>{file.name}</span>
          <button onClick={() => downloadFile(file)}>visualizar</button>
          <button onClick={() => deleteFile(file)}>excluir</button>
          <span>{findFileCampaignRelation(file.name)}</span>
        </li>
      ))}
    </ul>
  );
}

export default FilesList;
