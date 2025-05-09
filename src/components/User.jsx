import { useEffect, useState } from "react";
import { findUser } from "../axios/auth/login";
import { useParams } from "react-router";

export default function User() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    findUser(id)
      .then((rs) => setData(rs))
      .catch((error) => console.error(error));
  }, [id]);
  return (
    <div>
      <h1>User</h1>
    </div>
  );
}
