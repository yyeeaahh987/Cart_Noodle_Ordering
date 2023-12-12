import React from "react";
import classes from "./create.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/cartSlice";
// import axios from "axios";

const Create = () => {
  const [Meat, setMeat] = useState(false);
  const [Vegetable, setVegetable] = useState(false);
  const [Drink, setDrink] = useState("None");
  const [price, setPrice] = useState(20);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    //dispatch(addProduct({ Meat, Vegetable, Drink, price }));

    try {
      const res = await fetch("http://localhost:5000/product", {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({
          User: user.username,
          Meat,
          Vegetable,
          Drink,
          price,
        }),
      });

      navigate(`/foods`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleMeatPrice = async () => {

    let meatbox = document.getElementById("meat");

    if(meatbox.checked) {
      setPrice(price+6)
      setMeat(true)
    } else {
      setPrice(price-6)
      setMeat(false)
    }
  }

  const handleVegetPrice = async () => {

    let vegetbox = document.getElementById("vegetable");

    if(vegetbox.checked) {
      setPrice(price+6)
      setVegetable(true)
    } else {
      setPrice(price-6)
      setVegetable(false)
    }
  }

  const handleDrinkPrice = async (drinkvalue) => {

    let nonebox = document.getElementById("None");
    let colabox = document.getElementById("cola");
    let up7box = document.getElementById("7up");
    let fantabox = document.getElementById("fanta");

    if(nonebox.checked) {
      setPrice(price-6)
      setDrink(drinkvalue)
    } else if (Drink == "None") {
      setPrice(price+6)
      setDrink(drinkvalue)
    } else {
      setDrink(drinkvalue)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create Order</h2>
        <form onSubmit={handleCreateProduct} encType="multipart/form-data">

          <div className={classes.inputWrapper}>
            <label for="meat">Meat: </label>
            <input type="checkbox" id="meat" name="meat" value="meat" onChange={() => handleMeatPrice()}/>
          </div>

          <div className={classes.inputWrapper}>
            <label for="vegetable">Vegetable: </label>
            <input type="checkbox" id="vegetable" name="vegetable" value="vegetable" onChange={() => handleVegetPrice()}/>
          </div>

          <div className={classes.inputWrapper}>
            <label>Drink: </label>
            <input type="radio" id="None" name="drink" value="None" defaultChecked onChange={(e) => handleDrinkPrice(e.target.value)} />
            <label for="None">None</label>
            <input type="radio" id="cola" name="drink" value="cola" onChange={(e) => handleDrinkPrice(e.target.value)} />
            <label for="cola">Cola</label>
            <input type="radio" id="7up" name="drink" value="7up" onChange={(e) => handleDrinkPrice(e.target.value)} />
            <label for="7up">7Up</label>
            <input type="radio" id="fanta" name="drink" value="fanta" onChange={(e) => handleDrinkPrice(e.target.value)} />
            <label for="fanta">Fanta</label>
          </div>

          <div className={classes.inputWrapper}>
            <label>Price: </label>
            <div>{price}</div>
          </div>

          <div className={classes.buttonWrapper}>
            <button type="submit" className={classes.submitButton}>Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Create;
