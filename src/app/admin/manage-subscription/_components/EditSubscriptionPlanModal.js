"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button, Modal } from "antd";
import { useUpdatePakageMutation } from "@/redux/api/pakageApi";
import { toast } from "react-hot-toast";

export default function EditSubscriptionPlanModal({
  open,
  setOpen,
  selectedPlan,
}) {
  const [update, { isLoading }] = useUpdatePakageMutation();

  const onSubmit = async (data) => {
    try {
      const res = await update({
        id: selectedPlan?._id,
        data,
      }).unwrap();

      if (res?.success) {
        setOpen(false);
        toast.success("Subscription plan updated successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update subscription plan");
    }
  };

  return (
    <Modal
      centered
      open={open}
      footer={null}
      title="Edit Subscription Plan"
      onCancel={() => setOpen(false)}
    >
      <FormWrapper
        onSubmit={onSubmit}
        defaultValues={{
          name: selectedPlan?.title,
          price: selectedPlan?.price,
        }}
      >
        <UInput
          name="name"
          label="Name"
          placeholder="Enter subscription plan name"
        />

        <UInput
          type="number"
          name="price"
          label="Price"
          placeholder="Enter price"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          loading={isLoading}
          className="w-full"
        >
          Save
        </Button>
      </FormWrapper>
    </Modal>
  );
}
