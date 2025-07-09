"use client"
import SigninForm from "@/components/forms/SigninForm";
import { useTranslatedText } from "@/domain/translation/presentation/getTranslatedText";
import Image from "next/image";

const SigninPage = () => {
  const translatedText = useTranslatedText();
  return (
    <div className=" flex flex-col md:absolute md:top-0 md:left-1/2 md:transform md:-translate-x-1/2 md:z-50 bg-white items-center justify-center w-full  sm:w-auto min-h-screen px-4">

      <div className="w-auto lg:w-[390.26px] h-auto mb-6 flex items-center justify-center rounded-lg">
        <Image
          src="/assets/logos/chapa-logo.png"
          alt="Welcome Logo"
          width={390}
          height={247}
          className="object-contain"
        />
      </div>
      <h1 className=" text-2xl sm:text-[30px] text-[#555555] font-bold">
        {translatedText?.signinPageTitle ?? " Sign in to your account"}
      </h1>
      <h1 className="text-[14px] text-center px-4 lg:px-0 text-[#1E1E1E] mb-9">
        {translatedText?.signinPageSubtitle ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae metus vel massa facilisis elementum"}
      </h1>
      <SigninForm />
    </div>
  );
};

export default SigninPage;
