"use client";
import { getAllUsers, getDetailUser } from "@/modules/Users/services";
import { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "@/firebase";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [usersDetail, setUsersDetail] = useState([]);
  const { id } = useParams();
  const getUsers = async () => {
    const { data } = await getAllUsers();
    setUsers(data);
  };

  const getDetail = async (id) => {
    const { data } = await getDetailUser(id);
    setUsersDetail(data);
  };

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    getDetail(id);
  }, [id]);
  return (
    <userContext.Provider value={{ users, usersDetail, getUsers, getDetail }}>
      {children}
    </userContext.Provider>
  );
}
export const useUserContext = () => {
  return useContext(userContext);
};
