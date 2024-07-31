"use client"

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import ReportCard from "@/components/Report/ReportCard";
import ProtectedRoute from "@/components/ProductedRoutes/ProductedRoutes";

const DashboardHome = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <ReportCard title="Total Pantry Items" value="150" />
          <ReportCard title="Total Inventory" value="200" />
          <ReportCard title="Expired Items" value="5" />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardHome;
