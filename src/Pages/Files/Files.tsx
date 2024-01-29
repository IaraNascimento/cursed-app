import { useEffect, useState } from "react";
import FileUpload from "../../components/FileUpload/FileUpload";
import FilesList from "../../components/FilesList/FilesList";
import { getStorage, listAll, ref } from "firebase/storage";

function Files() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const userEmail = JSON.parse(localStorage.getItem("user") as string).email;
  const [users, setUsers] = useState<Array<string>>([userEmail]);
  const storage = getStorage();

  useEffect(() => {
    listAll(ref(storage, "/admin")).then((result: any) => {
      result.items.forEach(function (item: any) {
        if (item.name === userEmail) {
          setIsAdmin(true);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (isAdmin) {
      listAll(ref(storage, "/")).then((result) => {
        const userList = result.prefixes.map((user) => user.name);
        setUsers(userList);
      });
    }
  }, [isAdmin]);

  return (
    <>
      <FileUpload userList={users} />
      {users.map((user) => (
        <div key={user}>
          <h2>{user}</h2>
          <FilesList email={user} />
        </div>
      ))}
    </>
  );
}

export default Files;
