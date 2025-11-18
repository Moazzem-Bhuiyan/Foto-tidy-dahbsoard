"use client";

import Link from "next/link";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button } from "antd";

import { ArrowLeft } from "lucide-react";
import { useForgetPasswordMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPassForm() {
  const router = useRouter();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const onSubmit = async (data) => {
    try {
      const res = await forgetPassword(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        localStorage.setItem("forgetPasswordToken", res?.data?.verifyToken);
        router.push(`/otp-verification?email=${data.email}`);
      }
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
    router.push(`/otp-verification?email=${data.email}`);
  };

  return (
    <div className="w-full px-6 py-8">
      <Link
        href="/login"
        className="flex-center-start mb-4 gap-x-2 font-medium text-primary-blue hover:text-primary-blue/85"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Forgot Password</h4>
        <p className="text-dark-gray">
          Enter your email and we&apos;ll send you an otp for verification
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
          labelStyles={{ color: "white" }}
        />

        <Button
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
          loading={isLoading}
          htmlType="submit"
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}
