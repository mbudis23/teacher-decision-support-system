import React from "react";

export default function DataTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Class
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Email address
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Gender
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Grade
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Attedance %
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Violation
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              SWA Score
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-4 py-3 text-sm text-gray-700">{row.name}</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {row.className}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.email}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.gender}</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {row.grade}
              </td><td className="px-4 py-3 text-sm text-gray-700">
                {row.attendance}%
              </td><td className="px-4 py-3 text-sm text-gray-700">
                {row.violations}
              </td><td className="px-4 py-3 text-sm text-gray-700">
                {row.SWA_Score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
