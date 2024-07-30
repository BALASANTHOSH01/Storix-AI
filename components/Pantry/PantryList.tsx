// src/components/PantryList.tsx

interface PantryItem {
    id: string;
    name: string;
    quantity: number;
    expirationDate: string;
  }
  
  const PantryList = ({ items }: { items: PantryItem[] }) => {
    return (
      <div>
        <h2 className="text-xl font-bold">Pantry Items</h2>
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.expirationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default PantryList;
  