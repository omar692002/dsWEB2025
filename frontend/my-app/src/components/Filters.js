import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "./Filter.css";

const Filters = ({ selectedFilter, setSelectedFilter, selectedSort, setSelectedSort }) => {
    const filterOptions = [
        { label: "All", value: "all" },
        { label: "Category", value: "category" },
        { label: "Date Added", value: "date" },
        { label: "Price (Ascending)", value: "price" },
    ];

    return (
        <div className="filters-container">
            <Dropdown 
                value={selectedFilter} 
                options={filterOptions} 
                onChange={(e) => setSelectedFilter(e.value)} 
                placeholder="Filter by"
                className="filter-dropdown"
            />
            <Button 
                label="Reset" 
                icon="pi pi-refresh" 
                className="p-button-secondary reset-button"
                onClick={() => {
                    setSelectedFilter("all");
                }} 
            />
        </div>
    );
};

export default Filters;
