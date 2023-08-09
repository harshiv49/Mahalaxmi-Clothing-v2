import './button_component_styles.scss';

const  BUTTON_TYPE_CLASSES={
    google:'google-sign-in',
    inverted:'inverted',
    circle:'circle',
}

const Button=({children,buttonType,...otherProps})=>{
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
        {children}
        </button>
    )
}
export default Button;