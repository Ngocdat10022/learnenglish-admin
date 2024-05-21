"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import close from "@/accsets/images/close.png";
import { toast } from "react-toastify";
import { useCatContext } from "@/contexts/CatContext";
import FieldInput from "@/components/FieldInput";
import ButtonCustoms from "@/components/Button";
import Selects from "@/components/Select";
import styled from "styled-components";
import { MenuItem } from "@mui/material";
import { useLessonContext } from "@/contexts/LessonContext";
import { updateLesson } from "../../service";

export default function ModalUpdateLesson({ handleSetShow, lessonItem }) {
  const [loading, setLoading] = useState(false);
  const { category } = useCatContext();
  const { getListLesson } = useLessonContext();
  const schema = yup
    .object({
      title: yup.string().required(),
      level: yup.string().required(),
      catName: yup.string().required(),
      lessonPro: yup.string().required(),
    })
    .required();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: lessonItem?.title,
      catName: lessonItem?.catName,
      lessonPro: lessonItem?.lessonPro,
      level: lessonItem?.DifficultyLevel,
    },
    resolver: yupResolver(schema),
  });

  const handleUpdateLesson = async (values) => {
    try {
      setLoading(true);
      const { data } = await updateLesson(lessonItem?.lessonIdPK, values);
      toast.success(`${data}`);
      setLoading(false);
      getListLesson();
    } catch (error) {
      console.log("err", error);
      toast.error(`${error?.data?.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="ml-[256px] top-[100px] flex items-center p-[20px] rounded-md flex-col w-[800px] h-[800px] bg-blue-100">
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
          onSubmit={handleSubmit(handleUpdateLesson)}
          className="flex flex-col w-full gap-5 mt-10"
        >
          <FieldInput
            name="title"
            register={register}
            placeholder="enter your title"
            className="w-full"
            lable="title"
            type="text"
            messageError={errors?.title?.message}
            defaultValue=""
          />
          <Selects
            name="catName"
            register={register}
            lable="Category"
            messageError={errors?.catId?.message}
            placeholder="Selects cattegory"
            defaultValue={lessonItem?.catName}
          >
            {category?.map((item) => (
              <MenuItemCustom key={item?.catIdPK} value={item?.catName}>
                <Item>{item?.catName}</Item>
              </MenuItemCustom>
            ))}
          </Selects>
          <Selects
            name="lessonPro"
            register={register}
            lable="Lesson Pro"
            messageError={errors?.lessonPro?.message}
            placeholder="Selects level"
            defaultValue={lessonItem?.lessonPro === false ? "Free" : "Pro"}
          >
            <MenuItemCustom value="Free">
              <Item>Free</Item>
            </MenuItemCustom>
            <MenuItemCustom value="Pro">
              <Item>Pro</Item>
            </MenuItemCustom>
          </Selects>
          <Selects
            name="level"
            register={register}
            lable="Level"
            messageError={errors?.level?.message}
            placeholder="Selects level"
            defaultValue={lessonItem?.DifficultyLevel}
          >
            <MenuItemCustom value="easy">
              <Item>Easy</Item>
            </MenuItemCustom>
            <MenuItemCustom value="medium">
              <Item>Medium</Item>
            </MenuItemCustom>
            <MenuItemCustom value="difficult">
              <Item>Difficult</Item>
            </MenuItemCustom>
          </Selects>
          <ButtonCustoms
            isLoading={loading}
            name="Update Lessons"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}

const MenuItemCustom = styled(MenuItem)`
  && {
    height: 50px;
    width: 100%;
    padding: 10px 5px !important;
    background: #fff !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      background-color: #032a51;
    }
    &.Mui-selected {
      background-color: #032a51;
      color: #fff;
    }
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  gap: 5px;
  padding-left: 10px;
  color: #053576;
  font-size: 18px;
`;
