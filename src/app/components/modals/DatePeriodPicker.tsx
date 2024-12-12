import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PeriodPickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartChange: (date: Date | null) => void;
  onEndChange: (date: Date | null) => void;
}

const PeriodPicker: React.FC<PeriodPickerProps> = ({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Period</h3>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* Start Date Picker */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={onStartChange}
            maxDate={endDate || undefined}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            placeholderText="Select start date"
          />
        </div>

        {/* End Date Picker */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={onEndChange}
            minDate={startDate || undefined}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            placeholderText="Select end date"
          />
        </div>
      </div>
    </div>
  );
};

export default PeriodPicker;
