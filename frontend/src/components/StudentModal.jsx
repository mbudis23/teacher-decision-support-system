import React from "react";

export default function StudentModal({ showModal, onClose, onChange, onSubmit, newStudent }) {
  if (!showModal) return null;

  const fields = [
    {
      label: "Nama",
      name: "name",
      type: "text",
      placeholder: "Masukkan nama siswa",
    },
    {
      label: "Kelas",
      name: "className",
      type: "text",
      placeholder: "Contoh: CS50",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Masukkan email siswa",
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: [
        { value: "Pilih Gender", label: "Pilih Gender" },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
    },
    {
      label: "Grade",
      name: "grade",
      type: "number",
      placeholder: "Masukkan grade (0–100)",
      min: 0,
      max: 100,
    },
    {
      label: "Attendance %",
      name: "attendance",
      type: "number",
      placeholder: "Contoh: 95",
      min: 0,
      max: 100,
    },
    {
      label: "Violations (Jumlah)",
      name: "violations",
      type: "number",
      placeholder: "Contoh: 2",
      min: 0,
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Tambah Data Siswa</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              {field.type === "select" ? (
                <div className="relative">
                  <select
                    id={field.name}
                    name={field.name}
                    value={newStudent[field.name]}
                    onChange={onChange}
                    className={`
                      w-full
                      border border-gray-300
                      rounded-md
                      px-4 py-2
                      pr-8   /* beri ruang ekstra di kanan meski arrow dihilangkan */
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      appearance-none  /* menghilangkan tanda panah default */
                    `}
                  >
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={newStudent[field.name]}
                  onChange={onChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field.placeholder}
                  {...(field.min !== undefined ? { min: field.min } : {})}
                  {...(field.max !== undefined ? { max: field.max } : {})}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
