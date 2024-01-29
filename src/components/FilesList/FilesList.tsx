import { useEffect, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
} from "firebase/storage";
import FileSaver from "file-saver";

type FilesListProps = {
  email: string;
};

function FilesList(props: FilesListProps) {
  const [files, setFiles] = useState<Array<any>>([]);
  const storage = getStorage();

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
  }, []);

  return (
    <ul>
      {files?.map((file, index) => (
        <li key={index}>
          <span>{file.name}</span>
          <button onClick={() => downloadFile(file)}>visualizar</button>
          <button onClick={() => deleteFile(file)}>excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default FilesList;
