"use client"

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo || (adminOnly && userInfo.role !== "admin")) {
      router.push("/login");
    }
  }, [userInfo, router, adminOnly]);

  return userInfo && (!adminOnly || userInfo.role === "admin") ? children : null;
}
