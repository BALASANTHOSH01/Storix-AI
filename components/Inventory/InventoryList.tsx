"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchPantryItemsForUser } from "@/services/pantryServices"; // Adjust path if necessary
import Tooltip from "../Tooltip/ToolTip";

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

const categoryOptions = [
  "Vegetables",
  "Fruits",
  "Dairy",
  "Meat",
  "Fish",
  "Bakery",
  "Beverages",
  "Canned Goods",
  "Dry Goods",
  "Frozen Foods",
  "Snacks",
  "Condiments",
  "Spices",
  "Personal Care",
  "Cleaning Supplies",
  "Other",
];

const InventoryList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filterExpiresSoon, setFilterExpiresSoon] = useState<boolean>(false);
  const [storageLocation, setStorageLocation] = useState<string>("");

  useEffect(() => {
    const loadItems = async () => {
      try {
        const pantryItems = await fetchPantryItemsForUser();
        setItems(pantryItems as Item[]);
      } catch (error) {
        console.error("Error fetching pantry items:", error);
      }
    };

    loadItems();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleExpiresSoonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterExpiresSoon(e.target.checked);
  };

  const handleStorageLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStorageLocation(e.target.value);
  };

  const filterItems = () => {
    return items.filter((item) => {
      const isCategoryMatch =
        selectedCategory === "All" || item.category === selectedCategory;
      const isExpirationSoon =
        !filterExpiresSoon ||
        (item.expirationDate &&
          new Date(item.expirationDate) <
            new Date(new Date().setDate(new Date().getDate() + 7)));
      const isStorageMatch =
        !storageLocation ||
        (item.storageLocation &&
          item.storageLocation
            .toLowerCase()
            .includes(storageLocation.toLowerCase()));
      return isCategoryMatch && isExpirationSoon && isStorageMatch;
    });
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 p-4 border rounded-lg shadow-md">
        <div className="mb-2">
          <label className="block text-sm font-medium">Category</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
          >
            <option value="All">All</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={filterExpiresSoon}
              onChange={handleExpiresSoonChange}
              className="form-checkbox"
            />
            <span className="ml-2">Expires Soon (within 7 days)</span>
          </label>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Storage Location</label>
          <input
            type="text"
            value={storageLocation}
            onChange={handleStorageLocationChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border p-2"
            placeholder="Search by storage location"
          />
        </div>
      </div>

      {/* Item List */}
      <div className=" flex gap-6 flex-wrap lg:flex-col items-strech lg:items-center">
        {filterItems().map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-start justify-start p-8 border border-slate-500 rounded-md shadow-sm w-[25%] lg:w-[90%]"
          >
            <p className="text-sm py-1 px-3 rounded-full  mb-2 bg-gradient-to-r bg-[#e1ffe1] text-green-600">
              {item.category}
            </p>

            {item.image ? (
              <Tooltip title={item.name}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-[600px] h-64 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/path/to/default/image.png"; // Fallback image
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip title={"Random Alt Image"}>
                <img
                  src="https://picsum.photos/256/"
                  width={64}
                  height={64}
                  alt="random"
                  className="w-[600px] h-64 object-cover rounded-md"
                />
              </Tooltip>
            )}
            <h3 className="text-2xl font-semibold capitalize py-2">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 py-2">
              Quantity: {item.quantity}
            </p>
            <p className="text-sm text-gray-600 py-2">
              Price: ${item.price.toFixed(2)}
            </p>
            {item.expirationDate && (
              <p className="text-sm text-gray-600 py-2">
                Expires: {new Date(item.expirationDate).toLocaleDateString()}
              </p>
            )}
            {item.storageLocation && (
              <p className="text-sm text-gray-600 py-2">
                Location: {item.storageLocation}
              </p>
            )}
            {item.notes && (
              <p className="text-sm text-gray-600 py-2">Notes: {item.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryList;
