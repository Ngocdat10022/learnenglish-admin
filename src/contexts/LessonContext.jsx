"use client";
import { deleteLesson, getAllListLesson } from "@/modules/Lessons/service";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useVocabularyContext } from "./vocaContext";

const lessonContext = createContext();
export default function LessonContextProvider({ children }) {
  // const { getVocabulary } = useVocabularyContext();
  const [listLesson, setListLesson] = useState([]);
  const getListLesson = async () => {
    try {
      const { data } = await getAllListLesson();
      setListLesson(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const deleteLes = async (id) => {
    try {
      Swal.fire({
        title: "Do you want to delete this Lesson?",
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
          const { data } = await deleteLesson(id);
          toast.success(`${data}`);
          getListLesson();
          // getVocabulary();
        }
      });
    } catch (error) {
      toast.error(`${error?.data?.message}`);
    }
  };

  useEffect(() => {
    getListLesson();
  }, []);

  return (
    <lessonContext.Provider value={{ listLesson, getListLesson, deleteLes }}>
      {children}
    </lessonContext.Provider>
  );
}

export const useLessonContext = () => {
  return useContext(lessonContext);
};
