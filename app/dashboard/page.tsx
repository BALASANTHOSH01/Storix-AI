"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import ReportCard from "@/components/Report/ReportCard";
import ProtectedRoute from "@/components/ProtectedRoutes/ProtectedRoutes";
import { fetchPantryItems } from "@/services/pantryServices";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string; // Ensure category is included here
  image?: string;
}

const DashboardHome = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [pantryItemsCount, setPantryItemsCount] = useState<number>(0);
  const [inventoryItemsCount, setInventoryItemsCount] = useState<number>(0);
  const [pantryCategories, setPantryCategories] = useState<{ [key: string]: number }>({});
  const [inventoryCategories, setInventoryCategories] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      } else {
        setUser(user);
        loadData();
      }
    });
    return () => unsubscribe();
  }, [router]);

  const loadData = async () => {
    try {
      const pantryItems = await fetchPantryItems();

      setPantryItemsCount(pantryItems.length);

      // Type assertion to specify item structure
      const pantryCategoryCount = (pantryItems as Item[]).reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });
      setPantryCategories(pantryCategoryCount);

    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data", error);
    }
  };

  const generateCategoryColors = (categories: string[]): string[] => {
    const colorPalette = [
      '#0d74a0', '#5fa765', '#95c3ae', '#f4654b', '#f0cc14', '#FF9F40',
      '#C9CBCF', '#FFBF00', '#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9'
    ];
    return categories.map((_, index) => colorPalette[index % colorPalette.length]);
  };

  const pantryChartData = {
    labels: Object.keys(pantryCategories),
    datasets: [
      {
        label: 'Pantry Categories',
        data: Object.values(pantryCategories),
        backgroundColor: generateCategoryColors(Object.keys(pantryCategories)),
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    ],
  };



  return (
    <ProtectedRoute>
      <DashboardLayout>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <ReportCard title="Total Pantry Items" value={pantryItemsCount.toString()} />
          <ReportCard title="Total Inventory" value={inventoryItemsCount.toString()} />
        </div>
        <div className="mt-8 flex gap-6">
          <div className="p-4 rounded shadow w-[50%]">
            <h2 className="text-xl font-semibold mb-4">Pantry Categories</h2>
            <Pie
              data={pantryChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Pantry Categories' },
                },
              }}
            />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardHome;
