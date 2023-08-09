import "./category_item_styles.scss";

const CategoryItem=({category})=>{
    const {imageUrl,title}=category;
   return (
  <div className="category-container">

    {/*  <img/>  */}
    <div  className="background-image"  style={{
      backgroundImage:`url(${imageUrl})`
    }}></div>
    <div className="category-body-container"  >
      {/*<h2>{category.title}</h2>*/}
      <h2>{title}</h2>
      <p>Shop Now</p>
    </div>
    
   </div>
  
  )

}
export default CategoryItem;
