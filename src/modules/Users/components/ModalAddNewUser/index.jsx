"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FieldInput from "../../../../components/FieldInput";
import UploadImage from "../../../../components/UploadImage";
import ButtonCustoms from "../../../../components/Button";
import Image from "next/image";
import close from "@/accsets/images/close.png";
import { addNewUser } from "@/modules/Users/services";
import { toast } from "react-toastify";
import { useUserContext } from "@/contexts/userContext";
import useUploaImage from "@/hooks/useUploadImage";

export default function ModelAddNewUser({ handleSetShow }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const { users, getUsers } = useUserContext();
  const {
    handleChangeImage,
    loading: loadingImage,
    image,
    progress,
  } = useUploaImage();

  const schema = yup
    .object({
      username: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required(),
    })
    .required();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await addNewUser({ ...values, avatar: image });
      toast.success(`${data}`);
      setLoading(false);
      reset({
        username: "",
        email: "",
        password: "",
      });
      setUrl("");
      getUsers();
    } catch (error) {
      console.log("err", error);
      toast.error(`${error?.data?.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="ml-[256px]  top-[100px] flex items-center p-[20px] rounded-md flex-col w-[800px] h-[800px] bg-blue-100">
        <div
          className="flex justify-end w-full cursor-pointer "
          onClick={handleSetShow}
        >
          <Image
            width={1000}
            height={1000}
            className="w-[30px] h-[30px]"
            src={close}
            alt="alt"
          />
        </div>

        <UploadImage onClick={handleChangeImage} image={image} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-5"
        >
          <FieldInput
            name="username"
            register={register}
            placeholder="enter your username"
            className="w-full"
            lable="user name"
            type="text"
            messageError={errors?.username?.message}
            defaultValue=""
          />
          <FieldInput
            name="email"
            register={register}
            placeholder="enter your email"
            className="w-full"
            lable="email"
            type="text"
            messageError={errors?.email?.message}
            defaultValue=""
          />
          <FieldInput
            name="password"
            register={register}
            placeholder="enter your password"
            className="w-full"
            lable="password"
            type="password"
            messageError={errors?.password?.message}
            defaultValue=""
          />
          <ButtonCustoms
            isLoading={loading}
            name="Add new User"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
