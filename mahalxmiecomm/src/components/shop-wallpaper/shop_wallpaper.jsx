import './shop_wallpaper.styles.css'
const  ShopWallpaper=({image})=>{
    const myStyle = {
        backgroundImage: `url(${image})`,
        margin: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        paddingTop: "150px",
        paddingBottom: "190px",
        height: "100%",
        fontSize: "50px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      };
    return(<div className="wallpaper" style={myStyle}>
    <div className="wallpaper-text">
      #stayHome
      <br />
      Why roam around in stores this monsoon when hand crafted designs can
      reach your doorstep !
    </div>
  </div>);
  }

  export default ShopWallpaper;
