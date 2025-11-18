"use client";

import SubscriptionPlanCard from "./SubscriptionPlanCard";
import CreateSubscriptionPlanModal from "./CreateSubscriptionPlanModal";
import { useState } from "react";
import EditSubscriptionPlanModal from "./EditSubscriptionPlanModal";
import { useGetAllPackagesQuery } from "@/redux/api/pakageApi";
import { Spin } from "antd";

export default function SubscriptionsContainer() {
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // get all subscription plans
  const { data, isLoading } = useGetAllPackagesQuery();
  const subscriptionPlans = data?.data;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div>
      {/* <Button
        type="primary"
        size="large"
        icon={<Edit size={20} />}
        iconPosition="start"
        className="!w-full !py-6"
        onClick={() => setShowCreatePlanModal(true)}
      >
        Create Subscription Plan
      </Button> */}

      <section className="my-10 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {subscriptionPlans?.map((data, idx) => (
          <SubscriptionPlanCard
            key={idx}
            data={data}
            setShowEditPlanModal={setShowEditPlanModal}
            setSelectedPlan={setSelectedPlan}
          />
        ))}
      </section>

      {/* Create Subscription Plan Modal */}
      <CreateSubscriptionPlanModal
        open={showCreatePlanModal}
        setOpen={setShowCreatePlanModal}
      />

      {/* Edit Subscription Plan Modal */}
      <EditSubscriptionPlanModal
        open={showEditPlanModal}
        setOpen={setShowEditPlanModal}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
