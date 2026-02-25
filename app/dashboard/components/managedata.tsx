"use client";
import { useState } from "react";
import {
  Search,
  Add,
  Delete,
  Edit,
  FilterList,
  Download,
} from "@mui/icons-material";

interface DataRow {
  id: number;
  citizenship: string;
  name: string;
  type: string;
  size: number;
  modified: string;
  status: string;
}

export default function ManageData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [data, setData] = useState<DataRow[]>([
    { id: 1, citizenship: "2011-34-443",name:"Ram", type: "SQL", size: 24, modified: "2024-02-05", status: "Verified" },
    { id: 2, citizenship: "2233-44-44",name:"Shyam", type: "SQL", size: 12, modified: "2024-02-06", status: "Verified" },
    { id: 3, citizenship: "2133-34-222",name:"Sita", type: "SQL", size: 26, modified: "2024-02-04", status: "Verified" },
    { id: 4, citizenship: "2334-43-323",name:"Gita", type: "SQL", size: 11, modified: "2024-01-15", status: "Unverified" },
    { id: 5, citizenship: "3234-33-344",name:"Rita", type: "SQL", size: 10, modified: "2024-02-07", status: "Verified" },
  ]);

  const filteredData = data.filter(item =>
    item.citizenship.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleSelectRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(row => row.id));
    }
  };

  const handleDelete = () => {
    if (confirm(`Delete ${selectedRows.length} selected item(s)?`)) {
      setData(prev => prev.filter(row => !selectedRows.includes(row.id)));
      setSelectedRows([]);
    }
  };
  
  const totalSize = data.reduce((sum, row) => sum + row.size, 0);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">Manage Data</h1>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 font-semibold focus:outline-none rounded-xl shadow-md"
          />
        </div>
        <button className="px-6 py-3 bg-black text-white font-bold border-2 rounded-xl shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2">
          <Add /> Add Data
        </button>
        <button className="px-6 py-3 bg-white text-black font-bold border-2 rounded-xl shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2">
          <FilterList /> Filter
        </button>
        <button className="px-6 py-3 bg-white text-black font-bold border-2 rounded-xl shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2">
          <Download /> Export
        </button>
        {selectedRows.length > 0 && (
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-600 text-white font-bold border-2 rounded-xl shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
          >
            <Delete /> Delete ({selectedRows.length})
          </button>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-white border-2 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-4 text-left">
                  <input
                   title="checkAll"
                    type="checkbox"
                    checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                    onChange={handleSelectAll}
                    className="w-5 h-5 cursor-pointer"
                  />
                </th>
                <th className="p-4 text-left font-bold">CITIZENSHIP</th>
                <th className="p-4 text-left font-bold">NAME</th>
                 <th className="p-4 text-left font-bold">TYPE</th>
                <th className="p-4 text-left font-bold">SIZE</th>
                <th className="p-4 text-left font-bold">LAST MODIFIED</th>
                <th className="p-4 text-left font-bold">STATUS</th>
                <th className="p-4 text-left font-bold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-b-2 border-black hover:bg-gray-100 transition-colors`}
                >
                  <td className="p-4">
                    <input
                      title="check"
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </td>
                  <td className="p-4 font-semibold">{row.citizenship}</td>
                  <td className="p-4 font-semibold">{row.name}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 font-bold text-sm border border-black rounded-xl">
                      {row.type}
                    </span>
                  </td>
                  <td className="p-4">{row.size} MB</td>
                  <td className="p-4">{row.modified}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 font-bold text-sm border-2 rounded-xl border-black ${
                        row.status === "Verified"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button title="edit" className="p-2 bg-white border-2 border-black hover:bg-gray-100 transition-colors rounded-xl">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button title="delete" className="p-2 bg-white border-2 border-black hover:bg-red-100 transition-colors rounded-xl">
                        <Delete className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border-2  p-4 rounded-xl shadow-md">
          <p className="text-sm text-gray-600 font-semibold">TOTAL DATASETS</p>
          <p className="text-2xl font-bold mt-1">{data.length}</p>
        </div>
        <div className="bg-white border-2  p-4 rounded-xl shadow-md">
          <p className="text-sm text-gray-600 font-semibold">TOTAL SIZE</p>
          <p className="text-2xl font-bold mt-1">{totalSize} MB</p>
        </div>
        <div className="bg-white border-2  p-4 rounded-xl shadow-md">
          <p className="text-sm text-gray-600 font-semibold">SELECTED</p>
          <p className="text-2xl font-bold mt-1">{selectedRows.length}</p>
        </div>
      </div>
    </div>
  );
}
