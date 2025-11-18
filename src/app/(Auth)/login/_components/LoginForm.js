"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { useSignInMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "@/redux/features/authSlice";
export default function LoginForm() {
  const router = useRouter();
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();

  const onLoginSubmit = async (data) => {
    const fcmToken = "123";

    const value = {
      ...data,
      fcmToken,
    };
    try {
      const res = await signIn(value).unwrap();

      if (res?.success) {
        toast.success("Login successful");
        dispatch(
          setUser({
            token: res.data.accessToken,
          }),
        );
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error?.data?.message);
    }
  };

  return (
    <div className="w-full rounded-md bg-white px-6 py-8 shadow-none shadow-primary-blue/10">
      <section className="mb-8 space-y-2">
        <Image src={logo} alt="logo" width={100} height={100} />
        <h4 className="text-3xl font-semibold">Welcome back!</h4>
        <p className="text-dark-gray">Sign in to your account</p>
      </section>

      <FormWrapper onSubmit={onLoginSubmit} resolver={zodResolver(loginSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
        />

        <UInput
          name="password"
          label="Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
          loading={isLoading}
        >
          Log In
        </Button>

        <Link
          href="/forgot-password"
          className="mt-2 block text-center font-medium text-primary-blue hover:text-primary-blue/85"
        >
          I forgot my password
        </Link>
      </FormWrapper>
    </div>
  );
}
