import axiosInstance from "@/config/axios";

export const getListVocabulary = async () => {
  return axiosInstance.get("/vocabulary/getvocabulary");
};

export const addNewVocabulary = async (values) => {
  return axiosInstance.post("/vocabulary/addvocabulary", values);
};

export const updateVoca = async (id, values) => {
  return axiosInstance.put(`/vocabulary/updatevocabulary/${id}`, values);
};

export const deleteVoca = async (id) => {
  return axiosInstance.delete(`/vocabulary/deletevocabulary/${id}`);
};
