import React, { useState, useEffect } from "react";
import "./SupplierFilterSort.css";

const SupplierFilterSort = ({ onApply }) => {
  const [firstTime, setFirstTime] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  // Filter options
  const filterOptions = [
    { label: "In Stock", value: "stockAvailable:true" },
  //  { label: "Out of Stock", value: "stockAvailable:false" },
    { label: "Organic", value: "isOrganic:true" },
    { label: "Category: Seed", value: "category:Seed" },
    { label: "Category: Fertiliser", value: "category:Fertiliser" },
  ];

  // Sort options
  const sortOptions = [
    { label: "Price Ascending", value: "price:asc" },
    { label: "Price Descending", value: "price:desc" },
    { label: "Rating Ascending", value: "rating:asc" },
    { label: "Rating Descending", value: "rating:desc" },
    { label: "Newest", value: "createdAt:desc" },
  ];

  const handleFilterChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setSelectedFilters(selected);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const handleApply = () => {
    const filtersObj = {};
    selectedFilters.forEach((item) => {
      const [key, value] = item.split(":");
      filtersObj[key] = value === "true" ? true : value === "false" ? false : value;
    });

    const sortObj = {};
    if (selectedSort) {
      const [key, order] = selectedSort.split(":");
      sortObj.sortBy = key === "price" ? "price" : key === "rating" ? "rating" : "createdAt";
      sortObj.order = order;
    }

    const finalObj = { ...filtersObj, ...sortObj };
    onApply(finalObj);

    if(firstTime) setFirstTime(false);
  };

  useEffect(()=>{
    if(firstTime) handleApply();
  },[]);

  return (
    <div className="filter-sort-container">
      <div className="filter-section">
        <label>Filters:</label>
        <select value={selectedFilters} onChange={handleFilterChange} >
          {filterOptions.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div className="sort-section">
        <label>Sort By:</label>
        <select value={selectedSort} onChange={handleSortChange}>
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <button className="apply-btn" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

export default SupplierFilterSort;
