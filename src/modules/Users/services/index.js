import axiosInstance from "@/config/axios";

export const getAllUsers = async () => {
  return axiosInstance.get("/user/getallusers");
};

export const addNewUser = async (values) => {
  return axiosInstance.post("/user/adduser", values);
};

export const getDetailUser = async (id) => {
  return axiosInstance.get(`/user/getdetailuser/${id}`);
};

export const updateUser = async (values) => {
  return axiosInstance.put("/user/update", values);
};

export const deleteUser = async (id) => {
  return axiosInstance.delete(`/user/delete/${id}`);
};
