import "./App.css";
import { useState } from "react";
import menuData from "./assets/menu-data.json";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

function App() {
  /* 
    Handling states and setup for the shopping cart
  */
  const [cart, setCart] = useState({});
  const updateCart = (index, num) => {
    let newCart = cart;
    if(newCart[index]){
      newCart[index] += num
    } else{
      if(num > 0) {
        newCart[index] = num
      }
    }
    if(newCart[index] === 0){
      delete(newCart[index])
    }
    setCart({...newCart})
  };

  /* 
    Handling states and setup for filters
  */

  const [items, setItems] = useState(menuData);
  const [filters, setFilters] = useState([]);

  const clickFunction = (e) => {
    const listItem = e.target.parentNode;
    const list = listItem.parentNode;

    // Loop through filter items
    const filterList = Array.from(list.querySelectorAll("li"));

    // Create new array based on the checked filters and change filter state
    const newArray = filterList
      .filter((item) => item.querySelector("input:checked"))
      .map((item) => item.querySelector("label").textContent);

    setFilters(newArray);
  };

  /* 
    Handling states and setup for sorting radiobuttons
  */

  const [value1, setvalue1] = useState(false);
  const handleChange1 = () => {
    setvalue1(!value1);
    if(!value1){
      setvalue2(false);
    }
  };

  const [value2, setvalue2] = useState(false);
  const handleChange2 = () => {
    setvalue2(!value2);
    if(!value2){
      setvalue1(false);
    }
  };

  // sorts based on which checkbox is selected
  let sortFun = (v1, v2) => {
    if(v1) {
      return ((a, b) => a.price > b.price ? 1 : -1);
    } else {
      if(v2){
        return ((a, b) => a.price < b.price ? 1 : -1);
      } else {
        return ((a, b) => 1)
      }
    }
  }

  return (
    <div className="App">
      <h1> Order Online </h1>
      <br/>
      <div className="Contents">
      <div className="FilterList">
        <div>
          <h4> Filter by: </h4>
          <ul onChange={(e) => clickFunction(e)} style={{listStyleType:"none", margin:0, padding:0}}>
            <li>
              <input type="checkbox" name="" id="bagels" />
              <label htmlFor="bagels">Bagels</label>
            </li>
            <li>
              <input type="checkbox" name="" id="bakery" />
              <label htmlFor="bakery">Bakery</label>
            </li>
            <li>
              <input type="checkbox" name="" id="sandwiches" />
              <label htmlFor="sandwiches">Sandwiches</label>
            </li>
            <li>
              <input type="checkbox" name="" id="salads" />
              <label htmlFor="salads">Salads</label>
            </li>
            <li>
              <input type="checkbox" name="" id="American" />
              <label htmlFor="American">American</label>
            </li>
          </ul>
          <h4> Sort by price: </h4>
          <form>
            <div>
              <label>
                <input type="checkbox" checked={value1} onChange={handleChange1} value="ascending"/>
                Low to high
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={value2} onChange={handleChange2} value="descending"/>
                High to low
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="MenuGrid">
      {items.sort(sortFun(value1, value2))
              .filter((item) => (filters.length === 0 || filters.includes(item.categories)))
              .map((item, index) => {
                return (
                  <CartItems updateCart={updateCart} item={item} index={index} cart={cart} />
                );
              })}
      </div>
      <ShowCart cart={cart}/>
      </div>
      <br/>
    </div>
  );
}

function CartItems(props) {
  return (
    <div className="MenuItem">
      <img src={process.env.PUBLIC_URL + '/' + props.item.image} alt={props.item.name} style={{width:"15rem"}}/>
      <br/>
      <h4> {props.item.name} </h4>
      <p> {props.item.description} </p>
      <h4> {props.item.price} </h4>
      <p> Category: {props.item.categories} </p> 
      <div className="addToCartPanel">
        <button className="cartButton" onClick={() => props.updateCart(props.index, -1)}> - </button>
        <CartContents cart={props.cart} index={props.index}/>
        <button className="cartButton" onClick={() => props.updateCart(props.index, 1)}> + </button>
      </div>
      <br/>
    </div>
  )
}

function CartContents(props) {
  if(props.cart[props.index]) { 
    return (
      <p> {props.cart[props.index]} </p>
      )} 
  else { 
    return (
      <p> 0 </p>
      )
    }
  }

function ShowCart(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)

  return (
    <div>
      <Button
        variant="contained"
        style={{marginRight: "2.5rem"}}
        onClick={(event)=>{setAnchorEl(event.currentTarget);}}
      > View Cart </Button>
      <Popover
        anchorEl={anchorEl}
        open={open}
        id={open ? "simple-popover" : undefined}
        onClose={() => {
          setAnchorEl(null);
        }}
        transformOrigin={{
          horizontal:"center", 
          vertical:"top",
        }}
        anchorOrigin={{
          horizontal:"left",
          vertical:"bottom",
        }}>
        <div style={{margin:"1rem"}}>
          <h2>Your Cart</h2>
          <br/>
          {Object.keys(props.cart).map((key) => {
            console.log(key)
            return(
              <p> {menuData[key].name + ": " + props.cart[key]} </p>
            )
          })}
        </div>
      </Popover>
    </div>
  );
}

export default App;
