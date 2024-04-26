import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

function MenuComponent({
  children,
  partOfOrderPage,
  pageNumber,
  setPageNumber,
  limit,
}) {
  const [menuItems, setMenuItems] = useState([]);
  let startIndex = (pageNumber - 1) * limit;
  let endIndex =
    pageNumber * limit < menuItems.length
      ? pageNumber * limit
      : menuItems.length;
  let slicedMenuItems = partOfOrderPage
    ? [...menuItems]
    : menuItems.slice(startIndex, endIndex);

  useEffect(() => {
    // Function to fetch menu items
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/food");
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

  return (
    <div className={`p-4 ${partOfOrderPage ? "w-full" : ""}`}>
      <h2 className="text-2xl mb-4">Menu</h2>
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
      {menuItems.length > 0 ? (
        <ul className="space-y-2">
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
    </div>
  );
}

export default MenuComponent;
