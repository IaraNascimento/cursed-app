import { useEffect, useState } from "react";
import { ref, getStorage, uploadBytesResumable } from "firebase/storage";
import { getDatabase, ref as refDb, onValue, set } from "firebase/database";
import "./FileUpload.scss";

type FileUploadProps = {
  userList: Array<string>;
  userID: string;
};

function FileUpload(props: FileUploadProps) {
  const [fileUploaded, setFileUploaded] = useState<any>(null);
  const [currentFile, setCurrentFile] = useState<any>(null);
  const [folder, setFolder] = useState<string>("");
  const [campaigns, setCampaigns] = useState<Array<any>>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");

  const db = getDatabase();

  function uploadFile(e: any) {
    setFileUploaded(e.target.files[0]);
  }

  useEffect(() => {
    const query = refDb(db, "campaigns");
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      setCampaigns(data.campaigns);
    });
  }, []);

  useEffect(() => {
    setFolder(props.userList[0]);
  }, [props.userList]);

  useEffect(() => {
    setSelectedCampaign(campaigns[0]);
  }, [campaigns]);

  useEffect(() => {
    if (!!fileUploaded) {
      const storage = getStorage();
      const userUploadRef = ref(
        storage,
        "/" + folder + "/" + fileUploaded.name
      );
      uploadBytesResumable(userUploadRef, fileUploaded);
      const query = refDb(db, "/files/" + props.userID);
      set(query, {
        files: [{ campaign: selectedCampaign, file: userUploadRef.name }],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUploaded]);

  return (
    <form className="fileUpload" onSubmit={(e) => e.preventDefault()}>
      {props.userList.length > 1 && (
        <div>
          <label htmlFor="email">Jogador:</label>
          <select name="email" onChange={(e) => setFolder(e.target.value)}>
            {props.userList.map((userEmail, index) => (
              <option key={index} value={userEmail}>
                {userEmail}
              </option>
            ))}
          </select>
        </div>
      )}
      {campaigns.length > 1 && (
        <div>
          <label htmlFor="campaign">Campanha:</label>
          <select
            name="campaign"
            onChange={(e) => setSelectedCampaign(e.target.value)}
          >
            {campaigns.map((campaign, index) => (
              <option key={index} value={campaign}>
                {campaign}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="file">Arquivo</label>
        <input name="file" type="file" onChange={(e) => setCurrentFile(e)} />
      </div>
      <button className="primary" onClick={() => uploadFile(currentFile)}>
        Subir Arquivo
      </button>
    </form>
  );
}

export default FileUpload;
