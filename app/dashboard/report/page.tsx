// src/pages/dashboard/reports.tsx

import DashboardLayout from "../../components/DashboardLayout";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import ReportCard from "../../components/ReportCard";

const Reports = () => {
  const router = useRouter();
  const [reportData, setReportData] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Replace this with actual report data fetching logic
  useEffect(() => {
    const getReportData = async () => {
      // Dummy data
      setReportData([
        { title: "Monthly Usage", value: "80 items" },
        { title: "Weekly Restocks", value: "10 items" }
      ]);
    };
    getReportData();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {reportData.map((report, index) => (
          <ReportCard key={index} title={report.title} value={report.value} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Reports;
