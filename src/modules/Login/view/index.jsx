import { IconApple, IconGoogle, IconLoginFace } from "@/accsets/icons";
import ButtonCustoms from "@/components/Button";
import ButtonSocial from "@/components/ButtonSocial";
import FieldInput from "@/components/FieldInput";
import { schema } from "@/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginAccount } from "../services";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await loginAccount(values);
      typeof window !== "undefined" &&
        localStorage.setItem("accessToken", data?.accessToken);
      typeof window !== "undefined" &&
        localStorage.setItem("userInfo", JSON.stringify(data?.findUser));
      toast.success("Login successfully");
      router.push("/dashboard/category");
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.warning(`${error?.data}`);
      setLoading(false);
    }
  };
  return (
    <div className="mt-[80px] w-full py-[40px] h-auto flex items-center justify-center">
      <div className="flex flex-col w-[35%] items-center justify-center">
        <h3 className="font-black text-[50px] leading-none text-center pb-9  text-mainColor">
          Log in to have fun and learn faster
        </h3>
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <ButtonSocial
            icon={
              <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-white">
                <IconGoogle className="w-[30px]" />
              </div>
            }
            name="Login width Google"
            className="bg-[#1a73e8] h-[40px] cursor-pointer "
          />
          <ButtonSocial
            icon={<IconLoginFace className="w-[40px]" />}
            name="Login width Facebook"
            className="bg-[#4267b2] h-[40px] cursor-pointer "
          />
          <ButtonSocial
            icon={<IconApple className="w-[40px]" />}
            name="Login width Apple"
            className="bg-[#111] h-[40px] cursor-pointer "
          />
        </div>
        <p className="w-full my-5 text-sm text-center text-black">Or</p>
        <form
          className="flex flex-col w-full gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldInput
            lable="Username or Email:"
            name="email"
            type="text"
            className=""
            placeholder="enter your mail"
            register={register}
            messageError={errors?.email?.message}
          />
          <FieldInput
            lable="Password:"
            name="password"
            type="text"
            className=""
            placeholder="enter your password"
            register={register}
            messageError={errors?.password?.message}
          />
          <ButtonCustoms isLoading={loading} type="submit" name="Login" />
        </form>
        <p className="mt-5">
          <Link
            href="/signup"
            className="text-xl text-mainColor decoration-solid"
          >
            Don’t have an account? Sign up now!
          </Link>
        </p>
      </div>
    </div>
  );
}
