import FileUpload from "../../components/FileUpload/FileUpload";
import FilesList from "../../components/FilesList/FilesList";

function Files() {
  const userEmail = JSON.parse(localStorage.getItem("user") as string).email;

  return (
    <>
      <FileUpload email={userEmail} />
      <FilesList email={userEmail} />
    </>
  );
}

export default Files;
