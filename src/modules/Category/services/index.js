import axiosInstance from "@/config/axios";

export const getAllCat = async () => {
  return axiosInstance.get("/category/getallcategory");
};

export const updateCat = async (id, values) => {
  return axiosInstance.put(`/category/updateCategory/${id}`, values);
};
export const addNewCat = async (values) => {
  return axiosInstance.post("/category/addcategory", values);
};

export const deleteCategory = async (id) => {
  return axiosInstance.delete(`/category/deletecategory/${id}`);
};
