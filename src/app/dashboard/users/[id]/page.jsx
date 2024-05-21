"use client";
import ButtonCustoms from "@/components/Button";
import FieldInput from "@/components/FieldInput";
import UploadImage from "@/components/UploadImage";
import { useUserContext } from "@/contexts/userContext";
import useUploaImage from "@/hooks/useUploadImage";
import { deleteUser, updateUser } from "@/modules/Users/services";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function DetailUser() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { usersDetail, getDetail } = useUserContext();
  const { handleChangeImage, image, loading: loadingImage } = useUploaImage();
  const router = useRouter();
  const schema = yup
    .object({
      email: yup.string().required(),
      username: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: usersDetail?.email,
      username: usersDetail?.userName,
    },
    resolver: yupResolver(schema),
  });
  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      const { data } = await updateUser({
        ...values,
        avatar: image || usersDetail?.avatar,
        userId: usersDetail?.userIdPK,
      });
      toast.success(`${data}`);
      getDetail(usersDetail?.userIdPK);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(`${error?.data?.message}`);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      Swal.fire({
        title: "Do you want to delete this user?",
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
          const { data } = await deleteUser(id);
          toast.success(`${data}`);
          if (data) router.push("/dashboard/users");
        }
      });
    } catch (error) {
      toast.error(`${error?.data?.message}`);
    }
  };
  return (
    <div className="flex gap-[100px] items-center px-[100px]">
      {/* <h3 className="text-mainColor text-[48px] font-black mb-3 whitespace-nowrap">
        Edit User
      </h3> */}
      <div className="flex items-center gap-[100px] w-full mt-[100px] ">
        <div className="flex flex-col w-[30%] items-center gap-5">
          <UploadImage
            image={image || usersDetail?.avatar}
            onClick={handleChangeImage}
          />
          <ButtonCustoms
            name="Update avatar Profile"
            className="w-full rounded-md"
          />
        </div>
        <div className="w-70%">
          <form onSubmit={handleSubmit(handleUpdate)} className="w-full ">
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col items-center w-full gap-7">
                <FieldInput
                  lable="Username"
                  register={register}
                  name="username"
                  className="w-full"
                  placeholder="Enter your username"
                  type="text"
                  defaultValue={usersDetail?.userName}
                  messageError={errors?.email?.message}
                />
                <FieldInput
                  lable="email"
                  register={register}
                  name="email"
                  className="w-full"
                  placeholder="Enter your email"
                  type="text"
                  defaultValue={usersDetail?.email}
                  messageError={errors?.username?.message}
                />
                <div className="flex flex-col items-center gap-4 ">
                  <p className="text-lg font-normal text-center text-mainColor">
                    If you are using Goal Setter and want to keep your streak,
                    make sure to complete the Daily Goal for today before
                    changing the time zone.
                  </p>
                  <ButtonCustoms
                    isLoading={loading}
                    type="submit"
                    name="Save Profile"
                    className="w-full rounded-md"
                  />
                </div>
              </div>
            </div>
          </form>
          <ButtonCustoms
            onClick={() => handleDeleteUser(usersDetail?.userIdPK)}
            name="Delete Profile"
            className="w-full mt-5 rounded-md "
          />
        </div>
      </div>
    </div>
  );
}
