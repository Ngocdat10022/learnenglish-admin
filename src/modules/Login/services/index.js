import axiosInstance from "@/config/axios";

export const loginAccount = async (values) => {
  return axiosInstance.post("/admin/loginAdmin", values);
};
