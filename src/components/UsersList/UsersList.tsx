import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDatabase, ref as refDb, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";
import "./UsersList.scss";

function UsersList() {
  const [users, setUsers] = useState<Array<any>>([]);
  const db = getDatabase();
  const query = refDb(db, "users");

  useEffect(() => {
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      const userArray: any[] = [];
      Object.keys(data).forEach((value) => {
        userArray.push({
          id: value,
          role: data[value].role,
          email: data[value].email,
          name: data[value].name,
        });
      });
      setUsers(userArray);
    });
  }, []);

  function deleteUser(user: string) {
    const currentUsers = users;
    const index = currentUsers.indexOf(user);
    currentUsers.splice(index, 1);
    set(query, { users: currentUsers });
  }

  return (
    <table>
      <tbody>
        {users?.map((user, index) => (
          <tr key={index}>
            <td>
              <span>{user.name}</span>
            </td>
            <td>
              <span>{user.email}</span>
            </td>
            <td>
              <span>{user.role}</span>
            </td>
            <td className="action-col-2">
              <button className="secondary" onClick={() => deleteUser(user)}>
                <FontAwesomeIcon icon={icon({ name: "trash" })} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default UsersList;
