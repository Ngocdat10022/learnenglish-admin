import axiosInstance from "@/config/axios";

export const getAllListLesson = async () => {
  return axiosInstance.get("/lessons/getlessons");
};
export const addNewLessons = async (values) => {
  return axiosInstance.post("/lessons/addlessons", values);
};

// export const getDetailLesson = async (id) => {
//   return axiosInstance.get(`/user/getdetailuser/${id}`);
// };

export const updateLesson = async (id, values) => {
  return axiosInstance.put(`/lessons/updatelessons/${id}`, values);
};

export const deleteLesson = async (id) => {
  return axiosInstance.delete(`/lessons/deleteLessons/${id}`);
};
