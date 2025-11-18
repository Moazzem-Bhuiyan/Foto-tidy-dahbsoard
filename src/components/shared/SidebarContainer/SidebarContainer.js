"use client";

import "./Sidebar.css";
import logo from "@/assets/images/logo.png";
import { Menu, Modal } from "antd";
import userAvatar from "@/assets/images/nouser.png";
import Sider from "antd/es/layout/Sider";
import { HandCoins, LogOutIcon, Plus } from "lucide-react";
import { ScrollText } from "lucide-react";
import { SlidersVertical } from "lucide-react";
import { CircleUser } from "lucide-react";
import { House } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { logout } from "@/redux/features/authSlice";
import toast from "react-hot-toast";

const SidebarContainer = ({ collapsed }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data } = useGetMyProfileQuery();
  const user = data?.data;

  // Logout handler
  const onClick = (e) => {
    if (e.key === "logout") {
      dispatch(logout());
      router.refresh();
      router.push("/login");
      toast.success("Logout successful");
    }
  };

  const navLinks = [
    {
      key: "dashboard",
      icon: <House size={21} strokeWidth={2} />,
      label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
    },
    {
      key: "account-details",
      icon: <CircleUser size={21} strokeWidth={2} />,
      label: <Link href={"/admin/account-details"}>User Details</Link>,
    },
    {
      key: "earning-summary",
      icon: <ScrollText size={21} strokeWidth={2} />,
      label: <Link href={"/admin/earnings"}>Earning Summary</Link>,
    },
    {
      key: "subscriptions",
      icon: <HandCoins size={21} strokeWidth={2} />,
      label: <Link href={"/admin/manage-subscription"}>Subscriptions</Link>,
    },
    {
      key: "settings",
      icon: <SlidersVertical size={21} strokeWidth={2} />,
      label: "Settings",
      children: [
        {
          key: "privacy-policy",
          icon: <ScrollText size={21} strokeWidth={2} />,
          label: <Link href="/admin/privacy-policy">Privacy Policy</Link>,
        },
        {
          key: "terms-conditions",
          icon: <ScrollText size={21} strokeWidth={2} />,
          label: <Link href="/admin/terms-conditions">Terms & Conditions</Link>,
        },
      ],
    },
  ];

  // Get current path for sidebar menu item `key`
  const currentPathname = usePathname()?.replace("/admin/", "")?.split(" ")[0];

  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        paddingInline: `${!collapsed ? "10px" : "4px"}`,
        paddingBlock: "30px",
        backgroundColor: "#FFFAF2",
        maxHeight: "100vh",
        overflow: "auto",
      }}
      className="scroll-hide"
    >
      <div className="mb-6 flex flex-col items-center justify-center gap-y-5">
        <Link href={"/"}>
          {collapsed ? (
            // Logo small
            <Image
              src={logo}
              alt="Logo Of Before After Story"
              className="h-4 w-auto"
              width={50}
              height={50}
            />
          ) : (
            <Image
              src={logo}
              alt="Logo Of Before After Story"
              className="h-16 w-auto"
              width={150}
              height={50}
            />
          )}
        </Link>
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu !min-h-[calc(100vh-200px)] space-y-2.5 !border-none !bg-transparent"
        items={navLinks}
      />
      <Link href={"/admin/profile"} className="group gap-x-2">
        <div className="flex items-center gap-2 border-t border-gray-200 px-4 py-2">
          <Image
            src={user?.photoUrl || userAvatar}
            alt="Admin avatar"
            width={52}
            height={52}
            className="aspect-square rounded-full border-2 border-primary-green p-0.5 group-hover:border"
          />
          <div>
            <h4 className="text-lg font-semibold text-black">
              {user?.name} <span className="text-sm text-green-500">Admin</span>{" "}
            </h4>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <button
            onClick={() => {
              setOpen(true);
            }}
            className="ml-auto flex items-center justify-center rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200"
          >
            {" "}
            <LogOutIcon size={20} />
          </button>
        </div>
      </Link>

      <Modal
        open={open}
        setOpen={setOpen}
        footer={null}
        onCancel={() => {
          setOpen(false);
        }}
        title="Logout Confirmation"
        centered
      >
        <p className="text-gray-600">
          Are you sure you want to logout? This will end your current session.
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="mr-2 rounded bg-gray-200 px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(logout());
              router.push("/login");
              router.refresh();
              setOpen(false);
            }}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>
      </Modal>
    </Sider>
  );
};

export default SidebarContainer;
