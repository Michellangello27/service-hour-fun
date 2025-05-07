import { useEffect, useState } from "react";
import { users } from "../axios/auth/login";

export default function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    users()
      .then((rs) => setData(rs))
      .catch((error) => console.log(error));
  }, []);
  console.log(data);

  return (
    <div>
      <h1>Users</h1>
    </div>
  );
}
