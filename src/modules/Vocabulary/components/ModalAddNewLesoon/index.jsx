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
import { useLessonContext } from "@/contexts/LessonContext";
import { MenuItem } from "@mui/material";
import { addNewVocabulary } from "../../service";
import { useVocabularyContext } from "@/contexts/vocaContext";
import { phonemize } from "phonemize";

export default function ModalAddNewVoca({ handleSetShow }) {
  const [loading, setLoading] = useState(false);
  const { listLesson } = useLessonContext();
  const { getVocabulary } = useVocabularyContext();
  const schema = yup
    .object({
      word: yup.string().required(),
      meaning: yup.string().required(),
      spelling: yup.string(),
      lessonId: yup.string().required(),
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

  const handleAddNewVoca = async (values) => {
    try {
      setLoading(true);
      const spelling = phonemize(values?.spelling, true);
      const newValue = { ...values, spelling: spelling };
      const { data } = await addNewVocabulary(newValue);
      toast.success(`${data}`);
      setLoading(false);
      reset({
        word: "",
        meaning: "",
        spelling: "",
        lessonId: "",
      });
      getVocabulary();
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
          onSubmit={handleSubmit(handleAddNewVoca)}
          className="flex flex-col w-full gap-5 mt-10"
        >
          <FieldInput
            name="word"
            register={register}
            placeholder="enter your word"
            className="w-full"
            lable="Word"
            type="text"
            messageError={errors?.word?.message}
            defaultValue=""
          />
          <FieldInput
            name="meaning"
            register={register}
            placeholder="enter your meaning"
            className="w-full"
            lable="meaning"
            type="text"
            messageError={errors?.meaning?.message}
            defaultValue=""
          />
          <FieldInput
            name="spelling"
            register={register}
            placeholder="enter your spelling"
            className="w-full"
            lable="spelling"
            type="text"
            messageError={errors?.spelling?.message}
            defaultValue=""
          />
          <Selects
            name="lessonId"
            register={register}
            lable="Lessons"
            messageError={errors?.lessonId?.message}
            placeholder="Selects Lessons"
          >
            {listLesson?.map((item) => (
              <MenuItemCustom key={item?.lessonIdPK} value={item?.lessonIdPK}>
                <Item>{item?.title}</Item>
              </MenuItemCustom>
            ))}
          </Selects>
          <ButtonCustoms
            isLoading={loading}
            name="Add new Vocabulary"
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
