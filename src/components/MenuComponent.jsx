import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import ChooseFoodCategory from "./ChooseFoodCategory";

function MenuComponent({
  children,
  partOfOrderPage,
  pageNumber,
  setPageNumber,
  limit,
}) {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState("All");
  let startIndex = (pageNumber - 1) * limit;
  let endIndex =
    pageNumber * limit < menuItems.length
      ? pageNumber * limit
      : menuItems.length;
  let slicedMenuItems;
  if (partOfOrderPage) {
    slicedMenuItems =
      category === "All"
        ? [...menuItems]
        : menuItems.filter((item) => item.category === category);
  } else {
    slicedMenuItems = menuItems.slice(startIndex, endIndex);
  }

  useEffect(() => {
    // Function to fetch menu items
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/food`);
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    // Call the fetchMenuItems function when the component mounts
    fetchMenuItems();
  }, []); // Run this effect only once when the component mounts

  function handleCategoryChange(e) {
    e.preventDefault();
    setCategory(e.target.value);
  }

  return (
    <div
      className={`p-4 ${partOfOrderPage ? "w-full" : "w-4/5 ml-auto mr-auto"}`}
    >
      <h2 className="text-4xl mb-4">Menu</h2>
      {partOfOrderPage && (
        <ChooseFoodCategory
          handleCategoryChange={handleCategoryChange}
          category={category}
        />
      )}
      {menuItems.length > 0 ? (
        <ul className="space-y-2 mb-8">
          {slicedMenuItems.map((item) => (
            <li key={item._id} className="bg-gray-100 p-2 rounded-md flex">
              <div
                className={`${
                  children ? "flex justify-between" : ""
                } flex-grow`}
              >
                <div>
                  <Link
                    to={`/food/${item._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-700 text-sm">
                    {item.description.length > 50
                      ? `${item.description.substring(0, 50)}...`
                      : item.description}
                  </p>
                </div>
                <div data-foodid={item._id} className="flex gap-3">
                  {children || ""}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No menu items available</p>
      )}
      {partOfOrderPage || (
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          numItemStart={(pageNumber - 1) * limit + 1}
          numItemEnd={endIndex}
          limit={limit}
          totalNumItems={menuItems.length}
        />
      )}
    </div>
  );
}

export default MenuComponent;
