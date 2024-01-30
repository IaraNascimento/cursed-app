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
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FilesList.scss";

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
    <table>
      <tr>
        <th>Arquivo</th>
        <th>Campanha</th>
        <th>Ações</th>
      </tr>
      {files?.map((file, index) => (
        <tr key={index}>
          <td>{file.name}</td>
          <td>{findFileCampaignRelation(file.name)}</td>
          <td className="action-col">
            <button className="secondary" onClick={() => downloadFile(file)}>
              <FontAwesomeIcon icon={icon({ name: "eye" })} />
            </button>
            <button className="secondary" onClick={() => deleteFile(file)}>
              <FontAwesomeIcon icon={icon({ name: "trash" })} />
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
}

export default FilesList;
