"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import ReportCard from "@/components/Report/ReportCard";
import ProtectedRoute from "@/components/ProtectedRoutes/ProtectedRoutes";
import { fetchPantryItemsForUser } from "@/services/pantryServices";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import dayjs from "dayjs";
import ProfileImageUpload from "@/components/Profile/ProfileImageUpload";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

interface Item {
  id?: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
  image?: string;
  expirationDate?: string;
  storageLocation?: string;
  notes?: string;
}

const DashboardHome = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [pantryItemsCount, setPantryItemsCount] = useState<number>(0);
  const [pantryCategories, setPantryCategories] = useState<{
    [key: string]: number;
  }>({});
  const [inventoryData, setInventoryData] = useState<{
    [key: string]: number;
  }>({});
  const [totalValue, setTotalValue] = useState<number>(0);
  const [expiringItems, setExpiringItems] = useState<number>(0);
  const [storageLocations, setStorageLocations] = useState<{
    [key: string]: number;
  }>({});
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
      const pantryItems = await fetchPantryItemsForUser();

      setPantryItemsCount(pantryItems.length);

      const pantryCategoryCount = (pantryItems as Item[]).reduce(
        (acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        },
        {} as { [key: string]: number }
      );
      setPantryCategories(pantryCategoryCount);

      const simulatedInventoryData = (pantryItems as Item[]).reduce(
        (acc, item) => {
          acc[item.name] = (acc[item.name] || 0) + item.quantity;
          return acc;
        },
        {} as { [key: string]: number }
      );
      setInventoryData(simulatedInventoryData);

      const totalValue = (pantryItems as Item[]).reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      setTotalValue(totalValue);

      const expiringItemsCount = (pantryItems as Item[]).filter((item) => {
        return (
          item.expirationDate &&
          dayjs(item.expirationDate).isBefore(dayjs().add(30, "day"))
        );
      }).length;
      setExpiringItems(expiringItemsCount);

      const storageLocationCount = (pantryItems as Item[]).reduce(
        (acc, item) => {
          if (item.storageLocation) {
            acc[item.storageLocation] = (acc[item.storageLocation] || 0) + 1;
          }
          return acc;
        },
        {} as { [key: string]: number }
      );
      setStorageLocations(storageLocationCount);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data", error);
    }
  };
  

  const [needsProfileImage, setNeedsProfileImage] = useState(false);

  useEffect(() => {
    if (auth.currentUser && !auth.currentUser.photoURL) {
      setNeedsProfileImage(true);
    } else {
      setNeedsProfileImage(false);
    }
  }, [auth.currentUser]);

  const generateCategoryColors = (categories: string[]): string[] => {
    const colorPalette = [
      "#1abffb", // Soft Blue
      "#1347cb", // Dark Blue
      "#7e32ea", // Purple
      "#ee13ea", // Lavender
      "#c11526", // Red
      "#fa6060", // Beige
      "#e2720f", // Dark Orange
      "#e8ab27", // Dark Yellow
      "#4ddd21", // Green
      "#119667", // Jade
    ];
    return categories.map(
      (_, index) => colorPalette[index % colorPalette.length]
    );
  };

  const pantryChartData = {
    labels: Object.keys(pantryCategories),
    datasets: [
      {
        label: "Pantry Categories",
        data: Object.values(pantryCategories),
        backgroundColor: generateCategoryColors(Object.keys(pantryCategories)),
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  const inventoryChartData = {
    labels: Object.keys(inventoryData),
    datasets: [
      {
        label: "Inventory Quantities",
        data: Object.values(inventoryData),
        backgroundColor: generateCategoryColors(Object.keys(inventoryData)),
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  const inventoryLineChartData = {
    labels: Object.keys(inventoryData),
    datasets: [
      {
        label: "Inventory Over Time",
        data: Object.values(inventoryData),
        borderColor: "#0d74a0",
        backgroundColor: "rgba(13, 116, 160, 0.5)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const storageLocationChartData = {
    labels: Object.keys(storageLocations),
    datasets: [
      {
        label: "Storage Locations",
        data: Object.values(storageLocations),
        backgroundColor: generateCategoryColors(Object.keys(storageLocations)),
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <h1 className="text-3xl font-bold lg:pt-20">Dashboard</h1>
        {error && <p className="text-red-500">{error}</p>}
        {needsProfileImage ? (
          <div className="profile-image-upload">
            <h2 className="text-xl mb-4">Upload your profile image</h2>
            <ProfileImageUpload />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 mt-4">
              <ReportCard
                title="Total Pantry Items"
                value={pantryItemsCount.toString()}
              />
              <ReportCard
                title="Total Pantry Value"
                value={`$${totalValue.toFixed(2)}`}
              />
              <ReportCard
                title="Items Near Expiration"
                value={expiringItems.toString()}
              />
            </div>
            <div className="mt-8 grid md:grid-cols-1 grid-cols-2 gap-6 lg:pb-20">
              <div className="p-4 rounded shadow col-span-1 md:col-span-1 lg:col-span-1">
                <h2 className="text-xl font-semibold mb-4">
                  Pantry Categories
                </h2>
                <Bar
                  data={pantryChartData}
                  height={300}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      title: { display: true, text: "Pantry Categories" },
                    },
                  }}
                />
              </div>
              <div className="p-4 rounded shadow col-span-1 md:col-span-1 lg:col-span-1">
                <h2 className="text-xl font-semibold mb-4">
                  Inventory Quantities
                </h2>
                <Pie
                  data={inventoryChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      title: { display: true, text: "Inventory Quantities" },
                    },
                  }}
                />
              </div>
              <div className="p-4 rounded shadow col-span-1 md:col-span-1 lg:col-span-1">
                <h2 className="text-xl font-semibold mb-4">
                  Inventory Over Time
                </h2>
                <Line
                  data={inventoryLineChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      title: { display: true, text: "Inventory Over Time" },
                    },
                  }}
                />
              </div>
              <div className="p-4 rounded shadow col-span-1 md:col-span-1 lg:col-span-1">
                <h2 className="text-xl font-semibold mb-4">
                  Storage Locations
                </h2>
                <Doughnut
                  data={storageLocationChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      title: { display: true, text: "Storage Locations" },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardHome;
