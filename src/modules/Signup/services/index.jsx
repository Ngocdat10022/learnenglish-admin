import axiosInstance from "@/config/axios";

export const signupAccount = async (values) => {
  return axiosInstance.post("/admin/registerAdmin", values);
};
