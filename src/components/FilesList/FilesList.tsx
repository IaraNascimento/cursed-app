import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import FileSaver from "file-saver";

type FilesListProps = {
  email: string;
};

function FilesList(props: FilesListProps) {
  const [files, setFiles] = useState<Array<any>>([]);

  async function downloadFile(file: any) {
    const fileUrl = await getDownloadURL(file);
    FileSaver.saveAs(fileUrl, file.name, { autoBom: true });
  }

  useEffect(() => {
    const storage = getStorage();
    listAll(ref(storage, "/" + props.email)).then((result) => {
      console.log(result.items);
      setFiles(result.items as Array<any>);
    });
  }, []);
  return (
    <ul>
      {files?.map((file, index) => (
        <li key={index}>
          <span>{file.name}</span>
          <button onClick={() => downloadFile(file)}>visualizar</button>
        </li>
      ))}
    </ul>
  );
}

export default FilesList;
