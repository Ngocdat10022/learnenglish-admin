"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FieldInput from "../../../../components/FieldInput";
import ButtonCustoms from "../../../../components/Button";
import Image from "next/image";
import close from "@/accsets/images/close.png";
import { toast } from "react-toastify";
import { updateCat } from "../../services";
import { useCatContext } from "@/contexts/CatContext";

export default function ModalUpdateCat({ handleSetShow, catItem }) {
  const [loading, setLoading] = useState(false);
  const { getCategory } = useCatContext();
  const schema = yup
    .object({
      catName: yup.string().required(),
    })
    .required();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { catName: catItem?.catName },
    resolver: yupResolver(schema),
  });

  const handleUpdateCat = async (values) => {
    try {
      setLoading(true);
      const { data } = await updateCat(catItem?.catIdPK, values);
      toast.success(`${data}`);
      setLoading(false);
      getCategory();
    } catch (error) {
      console.log("err", error);
      toast.error(`${error?.data?.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="ml-[256px] top-[100px] flex items-center justify-between p-[20px] rounded-md flex-col w-[800px] h-[800px] bg-blue-100">
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
        <form
          onSubmit={handleSubmit(handleUpdateCat)}
          className="flex flex-col mb-[400px] w-full gap-5"
        >
          <FieldInput
            name="catName"
            register={register}
            placeholder="enter your catname"
            className="w-full"
            lable="category name"
            type="text"
            messageError={errors?.catName?.message}
            defaultValue=""
          />

          <ButtonCustoms
            isLoading={loading}
            name="Update Category"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
