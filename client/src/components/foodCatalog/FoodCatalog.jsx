import React from "react";
import classes from "./foodCatalog.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const FoodCatalog = () => {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFoodType = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/product?User=${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setFilteredFoods(data);
    };

    fetchFoodType();
  }, [user.username, token]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {filteredFoods?.length !== 0 && (
          <h2 className={classes.title}>Your Order</h2>
        )}
        <div className={classes.foods}>
          {filteredFoods.length !== 0 ? (
            <table className={classes.tablecontent}>
              <tr>
                <th>Meat</th>
                <th>Vegetable</th>
                <th>Drink</th>
                <th>Price</th>
              </tr>
              {filteredFoods
                .filter((f) => f.Delivered == false)
                .map((f) => (
                  <tr>
                    <td>{f.Meat == true ? "Yes" : "No"}</td>
                    <td>{f.Vegetable == true ? "Yes" : "No"}</td>
                    <td>{f.Drink}</td>
                    <td>{f.price}</td>
                  </tr>
                ))}
            </table>
          ) : (
            <h1 className={classes.noQuantity}>No Order</h1>
          )}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <hr></hr>
      <div className={classes.wrapper}>
        {filteredFoods?.length !== 0 && (
          <h2 className={classes.title}>Order History</h2>
        )}
        <div className={classes.foods}>
          {filteredFoods.length !== 0 && (
            <table className={classes.tablecontent}>
              <tr>
                <th>Meat</th>
                <th>Vegetable</th>
                <th>Drink</th>
                <th>Price</th>
              </tr>
              {filteredFoods
                .filter((f) => f.Delivered == true)
                .map((f) => (
                  <tr>
                    <td>{f.Meat == true ? "Yes" : "No"}</td>
                    <td>{f.Vegetable == true ? "Yes" : "No"}</td>
                    <td>{f.Drink}</td>
                    <td>{f.price}</td>
                  </tr>
                ))}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCatalog;
