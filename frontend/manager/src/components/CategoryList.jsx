import React, { useState } from "react";

const initialCategories = [
  { id: 1, name: "Du lịch biển" },
  { id: 2, name: "Du lịch núi" },
  { id: 3, name: "Du lịch văn hóa" },
];

const mockTours = [
  { id: 101, name: "Tour Phú Quốc", categoryId: 1 },
  { id: 102, name: "Tour Nha Trang", categoryId: 1 },
  { id: 201, name: "Tour Sapa", categoryId: 2 },
  { id: 202, name: "Tour Đà Lạt", categoryId: 2 },
  { id: 301, name: "Tour Huế", categoryId: 3 },
];

const CategoryList = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    const newItem = {
      id: Date.now(),
      name: newCategory.trim(),
    };
    setCategories([...categories, newItem]);
    setNewCategory("");
    setShowAddForm(false);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    if (selectedCategoryId === id) setSelectedCategoryId(null);
  };

  const handleEditCategory = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  const handleSaveEdit = () => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === editId ? { ...cat, name: editName } : cat))
    );
    setEditId(null);
    setEditName("");
  };

  const handleToggleDetails = (id) => {
    setSelectedCategoryId(selectedCategoryId === id ? null : id);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Danh mục Tour</h3>

      {/* Thanh tìm kiếm + Nút Thêm */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm danh mục..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 rounded w-full"
        />
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          {showAddForm ? "Hủy" : "Thêm"}
        </button>
      </div>

      {/* Form thêm danh mục */}
      {showAddForm && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Tên danh mục mới"
            className="border px-3 py-1 rounded w-full"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Lưu
          </button>
        </div>
      )}

      {/* Danh sách danh mục */}
      {/* Danh sách danh mục */}
      <ul className="divide-y divide-gray-200">
        {filteredCategories.map((cat) => (
          <li key={cat.id} className="py-3">
            <div className="flex items-center justify-between">
              {editId === cat.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border rounded px-2 py-1 mr-2 w-full"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-600 hover:underline mr-2"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="text-gray-600 hover:underline"
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <>
                  <span
                    onClick={() => handleToggleDetails(cat.id)}
                    className="flex-1 font-medium cursor-pointer hover:underline"
                  >
                    {cat.name}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditCategory(cat.id, cat.name)}
                      className="text-blue-600 hover:underline"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => handleToggleDetails(cat.id)}
                      className="text-indigo-600 hover:underline"
                    >
                      {selectedCategoryId === cat.id
                        ? "Ẩn chi tiết"
                        : "Xem chi tiết"}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Danh sách tours thuộc danh mục */}
            {selectedCategoryId === cat.id && (
              <ul className="mt-2 ml-4 bg-gray-100 rounded px-3 py-2">
                {mockTours.filter((t) => t.categoryId === cat.id).length > 0 ? (
                  mockTours
                    .filter((t) => t.categoryId === cat.id)
                    .map((tour) => (
                      <li key={tour.id} className="py-1 list-disc list-inside">
                        {tour.name}
                      </li>
                    ))
                ) : (
                  <li className="italic text-gray-500">Không có tour nào</li>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
