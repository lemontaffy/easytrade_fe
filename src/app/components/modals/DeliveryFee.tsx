import React, { useState } from "react";

interface DeliveryFee {
  [key: string]: number;
}

interface DeliveryFeeInputProps {
  onUpdate: (deliveryFee: DeliveryFee) => void;
}

const DeliveryFeeInput: React.FC<DeliveryFeeInputProps> = ({ onUpdate }) => {
  const [deliveryFee, setDeliveryFee] = useState<DeliveryFee>({});
  const [newField, setNewField] = useState<string>("");
  const [newValue, setNewValue] = useState<number | "">("");

  const handleAddField = () => {
    if (!newField || newValue === "") {
      alert("Field name and value are required.");
      return;
    }

    // Add new field to deliveryFee object
    setDeliveryFee((prev) => {
      const updated = { ...prev, [newField]: Number(newValue) };
      onUpdate(updated); // Notify parent component of changes
      return updated;
    });

    // Reset input fields
    setNewField("");
    setNewValue("");
  };

  const handleRemoveField = (field: string) => {
    setDeliveryFee((prev) => {
      const updated = { ...prev };
      delete updated[field];
      onUpdate(updated); // Notify parent component of changes
      return updated;
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Delivery Fee</h3>
      
      <ul className="mb-4">
        {Object.entries(deliveryFee).map(([field, value]) => (
          <li 
            key={field} 
            className="flex justify-between items-center bg-white p-3 mb-2 rounded-lg shadow-sm border"
          >
            <span className="text-gray-700 font-medium">
              <strong className="text-gray-900">{field}</strong>: {value}
            </span>
            <button
              onClick={() => handleRemoveField(field)}
              className="text-red-600 hover:text-red-800 font-semibold transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
  
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Field Name (e.g., postOffice)"
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Value (e.g., 4000)"
          value={newValue}
          onChange={(e) => setNewValue(Number(e.target.value))}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleAddField}
          className="w-full md:w-auto px-6 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        >
          + Add
        </button>
      </div>
    </div>
  );
  
};

export default DeliveryFeeInput;
