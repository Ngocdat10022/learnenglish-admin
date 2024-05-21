"use client";
import { deleteCategory, getAllCat } from "@/modules/Category/services";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const catContext = createContext();
export default function CatContextProvider({ children }) {
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const { data } = await getAllCat();
      setCategory(data);
    } catch (error) {}
  };

  const deleteCat = async (id) => {
    try {
      Swal.fire({
        title: "Do you want to delete this category?",
        background: "#053576",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#053576",
        cancelButtonColor: "#053576",
        cancelButtonText: "Cancel",
        confirmButtonText: "Delete",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await deleteCategory(id);
          toast.success(`${data}`);
          getCategory();
        }
      });
    } catch (error) {
      toast.error(`${error?.data?.message}`);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <catContext.Provider value={{ category, getCategory, deleteCat }}>
      {children}
    </catContext.Provider>
  );
}

export const useCatContext = () => {
  return useContext(catContext);
};
