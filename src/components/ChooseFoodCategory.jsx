const ChooseFoodCategory = ({ handleCategoryChange, category }) => {
  return (
    <form className="flex justify-evenly bg-black p-2 mb-4 rounded-md">
      <label className="text-white" htmlFor="category">
        Search for a food by category!:
      </label>
      <select id="category" value={category} onChange={handleCategoryChange}>
        <option value="All">--All--</option>
        <option value="Wraps">Wraps</option>
        <option value="Pizzas">Pizzas</option>
        <option value="Salads">Salads</option>
        <option value="Main Courses">Main Courses</option>
        <option value="Seafood">Seafood</option>
        <option value="Pasta & Risottos">Pasta & Risottos</option>
        <option value="Curries">Curries</option>
        <option value="Tacos">Tacos</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Soups">Soups</option>
        <option value="Desserts">Desserts</option>
        <option value="Appetizers">Appetizers</option>
        <option value="Cocktails">Cocktails</option>
        <option value="Drinks">Drinks</option>
      </select>
    </form>
  );
};

export default ChooseFoodCategory;
