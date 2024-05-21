"use client";
import { deleteVoca, getListVocabulary } from "@/modules/Vocabulary/service";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const vocaContext = createContext();
export default function VocaontextProvider({ children }) {
  const [vocabulary, setVocabulary] = useState([]);
  const getVocabulary = async () => {
    try {
      const { data } = await getListVocabulary();
      setVocabulary(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const deleteVocabulary = async (id) => {
    try {
      Swal.fire({
        title: "Do you want to delete this Vocabulary?",
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
          console.log("running delete");
          const { data } = await deleteVoca(id);
          toast.success(`${data}`);
          getVocabulary();
        }
      });
    } catch (error) {
      toast.error(`${error?.data?.message}`);
    }
  };

  useEffect(() => {
    getVocabulary();
  }, []);

  return (
    <vocaContext.Provider
      value={{ vocabulary, getVocabulary, deleteVocabulary }}
    >
      {children}
    </vocaContext.Provider>
  );
}

export const useVocabularyContext = () => {
  return useContext(vocaContext);
};
