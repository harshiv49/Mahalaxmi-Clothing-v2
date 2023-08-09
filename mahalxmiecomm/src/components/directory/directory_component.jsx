import CategoryItem from "../category-item/category_item_component";
import "./directory_component.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        return (
          <CategoryItem key={category.id} category={category}></CategoryItem>
        );
      })}
    </div>
  );
};
export default Directory;
