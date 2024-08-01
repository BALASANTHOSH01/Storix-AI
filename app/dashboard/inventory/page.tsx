import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import InventoryList from "@/components/Inventory/InventoryList";


const Inventory = () => {

  return (
    <DashboardLayout>
      <div className="flex justify-start lg:justify-center items-center lg:pt-10">
        <h1 className="text-3xl font-bold text-center py-8">
          Inventory Management
        </h1>
      </div>
        <InventoryList />

    </DashboardLayout>
  );
};

export default Inventory;
