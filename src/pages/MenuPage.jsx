import MenuComponent from "../components/MenuComponent";
import { useState } from "react";

const MenuPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const limit = 10;

  return (
    <div className="my-20">
      <MenuComponent
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        limit={limit}
      />
    </div>
  );
};

export default MenuPage;
