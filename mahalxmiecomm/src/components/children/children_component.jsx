//this component was for understanding a concept delete when deploying

function Children(props) {

    console.log("i am logging",props.children);
  
    return <h1>Children{props.children}</h1>;
  }
  
  export default Children;