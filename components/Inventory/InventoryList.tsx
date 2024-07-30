"use client"

interface InventoryItem {
    id: string;
    name: string;
    stock: number;
  }
  
  const InventoryList = ({ items }: { items: InventoryItem[] }) => {
    return (
      <div>
        <h2 className="text-xl font-bold">Inventory Items</h2>
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default InventoryList;
  