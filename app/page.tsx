"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Mock data: Floating Debris Index (FDI) metrics
const MOCK_DATA = [
  { id: 1, location: "Banda Sea", fdi: 45.2, status: "High Risk" },
  { id: 2, location: "Pacific Patch", fdi: 88.7, status: "Critical" },
  { id: 3, location: "North Atlantic", fdi: 12.4, status: "Low Risk" },
];

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  // Simulate an API call
  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = filter === "All" 
        ? MOCK_DATA 
        : MOCK_DATA.filter(item => item.status.includes(filter));
      setData(filtered);
      setLoading(false);
    }, 1500); // Artificial delay to test explicit waits in Cypress/Selenium
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  return (
    <main className="min-h-screen p-8 bg-slate-50 font-sans">
      <header className="mb-8 border-b pb-4">
        {/* data-testid is crucial for resilient automation scripts */}
        <h1 data-testid="dashboard-title" className="text-3xl font-bold text-slate-800">
          Global Environmental Tracker
        </h1>
        <p className="text-slate-500">Geospatial Anomaly Detection</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Controls & Map Mock */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Interactive Map View</h2>
            {/* Mock map area for visual regression testing */}
            <div 
              data-testid="map-container" 
              className="w-full h-96 bg-slate-200 rounded flex items-center justify-center border-2 border-dashed border-slate-300"
            >
              <span className="text-slate-400 font-medium">[ Geospatial Map Render Target ]</span>
            </div>
          </div>
        </div>

        {/* Right Column: Data & Filters */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Data Filters</h2>
            <div className="flex space-x-2">
              {["All", "Critical", "High Risk"].map((f) => (
                <button
                  key={f}
                  data-testid={`filter-btn-${f.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    filter === f ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border min-h-[300px]">
            <h2 className="text-lg font-semibold mb-4">Index Readings</h2>
            
            {loading ? (
              // Loading state to test automation sync
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                data-testid="loading-spinner"
                className="flex justify-center items-center h-32"
              >
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            ) : (
              <ul data-testid="data-list" className="space-y-3">
                {data.map((item) => (
                  <motion.li 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={item.id} 
                    data-testid={`data-row-${item.id}`}
                    className="p-3 bg-slate-50 border rounded flex justify-between items-center"
                  >
                    <span className="font-medium text-slate-700">{item.location}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">FDI: {item.fdi}</div>
                      <div className={`text-xs ${item.status === 'Critical' ? 'text-red-600' : 'text-orange-500'}`}>
                        {item.status}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}