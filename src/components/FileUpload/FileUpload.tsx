import { ref, getStorage, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";

type FileUploadProps = {
  userList: Array<string>;
};

function FileUpload(props: FileUploadProps) {
  const [fileUploaded, setFileUploaded] = useState<any>(null);
  const [folder, setFolder] = useState<string>("");

  function uploadFile(e: any) {
    setFileUploaded(e.target.files[0]);
  }

  useEffect(() => {
    setFolder(props.userList[0]);
  }, [props.userList]);

  useEffect(() => {
    if (!!fileUploaded) {
      const storage = getStorage();
      const userUploadRef = ref(
        storage,
        "/" + folder + "/" + fileUploaded.name
      );
      uploadBytesResumable(userUploadRef, fileUploaded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUploaded]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type="file" onChange={(e) => uploadFile(e)} />
      {props.userList.length > 1 && (
        <select onChange={(e) => setFolder(e.target.value)}>
          {props.userList.map((userEmail, index) => (
            <option key={index} value={userEmail}>
              {userEmail}
            </option>
          ))}
        </select>
      )}
    </form>
  );
}

export default FileUpload;
