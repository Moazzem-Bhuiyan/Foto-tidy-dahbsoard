"use client";
import { ConfigProvider, Table } from "antd";
import clsx from "clsx";
import { ArrowRightLeft } from "lucide-react";
import { Tooltip } from "antd";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Tag } from "antd";
import EarningModal from "./EarningModal";
import { useGetAllEarningsQuery } from "@/redux/api/earningsApi";
import moment from "moment";
import CustomCountUp from "@/components/CustomCountUp/CustomCountUp";

export default function EarningsTable() {
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, SetSelecteduser] = useState("");
  const { data: earnings, isLoading } = useGetAllEarningsQuery({ currentPage });

  const data = earnings?.data?.earningList?.map((item, inx) => ({
    key: inx + 1,
    name: item?.user?.name || "Not provided",
    status: item?.status,
    date: moment(item?.createdAt).format("DD-MM-YYY"),
    amount: item?.amount,
    tId: item?.tranId,
  }));
  // stats data
  const earningStats = [
    {
      key: "earnings",
      title: "Total Earnings",
      amount: earnings?.data?.totalEarning || 0,
    },
    {
      key: "purchased",
      title: "Subscription Purchased",
      amount: earnings?.data?.subscriptionPurchased || 0,
    },
  ];

  // ================== Table Columns ================
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      render: (value) => `#${value}`,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag className="!bg-gradient-to-tr from-[#22C55E] to-[#1B70A6] !text-[15px] font-semibold !text-white">
          {value}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => (
        <Tag color="#145880" className="!text-base font-semibold">
          $ {value}
        </Tag>
      ),
    },
    {
      title: "Transaction ID",
      dataIndex: "tId",
    },
    {
      title: "Transaction Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Tooltip title="Show Details">
          <button
            onClick={() => {
              SetSelecteduser(record);
              setShowEarningModal(true);
            }}
          >
            <Eye color="#1B70A6" size={22} />
          </button>
        </Tooltip>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      {/* Earning stats */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {earningStats?.map((stat) => (
          <div
            key={stat.key}
            className={clsx(
              "flex-center-start h-[100px] w-[600px] cursor-pointer gap-x-4 rounded-lg bg-gradient-to-tr from-[#E47637] to-[#EC901F] px-5 py-4 text-lg text-white",
            )}
          >
            <ArrowRightLeft size={24} />
            <p className="flex gap-x-3">
              <p>{stat.title}</p>
              {stat.key !== "earnings" ? (
                <span>
                  {" "}
                  <CustomCountUp end={stat.amount} />
                </span>
              ) : (
                <span>
                  $ <CustomCountUp end={stat.amount} />
                </span>
              )}
            </p>
          </div>
        ))}
      </section>

      {/* Earning table */}
      <section className="my-10">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={data}
          loading={isLoading}
          scroll={{ x: "100%" }}
          pagination={{
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
            pageSize: 10,
            total: earnings?.meta?.total || 0,
            showTotal: (total) => `Total ${total} earnings`,
          }}
        ></Table>
      </section>

      {/* Show earning modal */}
      <EarningModal
        open={showEarningModal}
        setOpen={setShowEarningModal}
        earning={selectedUser}
      />
    </ConfigProvider>
  );
}
