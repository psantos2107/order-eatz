import MenuComponent from "../components/MenuComponent";
import DisplayOrder from "../components/DisplayOrder";
import FoodDescription from "../components/FoodDescription";

const OrderPage = () => {
  return (
    <div className="w-full py-24 flex space-evenly">
      <MenuComponent partOfOrderPage={true}>
        <button className="p-1 bg-slate-300">Add to order</button>
        <button className="p-1 bg-slate-300">See food details</button>
      </MenuComponent>
      <section className="w-1/2 flex flex-col">
        <DisplayOrder />
        <FoodDescription />
      </section>
    </div>
  );
};

export default OrderPage;
