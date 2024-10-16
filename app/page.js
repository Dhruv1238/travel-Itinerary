"use client";
import { useState } from "react";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [travellers, setTravellers] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Your Travel Itinerary
        </h2>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            console.log(
              destination,
              budget,
              travellers,
              accommodation,
              startDate,
              endDate
            );
            e.preventDefault();
          }}
        >
          {/* Destination Input */}
          <div>
            <label className="block text-sm font-medium text-white">
              Destination
            </label>
            <input
              type="text"
              className="mt-1 text-black block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          {/* Date of Journey Input */}
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-white">
              Journey Starts
            </label>
            <label className="block text-sm font-medium text-white">
              Journey Ends
            </label>
          </div>
          <div className="flex justify-between gap-8">
            <input
              type="date"
              className="mt-1 text-black block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="mt-1 text-black block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Daily Budget Input */}
          <div>
            <label className="block text-sm font-medium text-white">
              Daily Budget (INR)
            </label>
            <input
              type="number"
              className="mt-1 text-black block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your daily budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          {/* Number of Travellers Input */}
          <div>
            <label className="block text-sm font-medium text-white">
              Number of Travellers
            </label>
            <input
              type="number"
              className="mt-1 text-black block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of travellers"
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
            />
          </div>

          {/* Accommodations Input */}
          <div>
            <label className="block text-sm font-medium text-white">
              Select Accommodations
            </label>
            <select
              className="mt-1 text-black block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
            >
              <option value="">Select</option>
              <option value="hotel">Hotel</option>
              <option value="hostel">Hostel</option>
              <option value="bnb">Bed & Breakfast</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
