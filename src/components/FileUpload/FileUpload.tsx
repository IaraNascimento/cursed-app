import { ref, getStorage, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";

type FileUploadProps = {
  email: string;
};

function FileUpload(props: FileUploadProps) {
  const [fileUploaded, setFileUploaded] = useState<any>(null);

  function uploadFile(e: any) {
    setFileUploaded(e.target.files[0]);
  }

  useEffect(() => {
    if (!!fileUploaded) {
      const storage = getStorage();
      const userUploadRef = ref(
        storage,
        "/" + props.email + "/" + fileUploaded.name
      );
      uploadBytesResumable(userUploadRef, fileUploaded).then((snapshot) =>
        console.log(snapshot)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUploaded]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type="file" onChange={(e) => uploadFile(e)} />
    </form>
  );
}

export default FileUpload;
