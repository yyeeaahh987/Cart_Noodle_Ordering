import React from "react";
import classes from "./admin.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodType = async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFilteredFoods(data);
    };

    fetchFoodType();
  }, [token]);

  const handleDeliver = async (f_id) => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/product/update/${f_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate(0);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {filteredFoods?.length !== 0 && (
          <h2 className={classes.title}>Unfinish Order</h2>
        )}
        <div className={classes.foods}>
          {filteredFoods.length !== 0 ? (
            <table className={classes.tablecontent}>
              <tr>
                <th>Customer</th>
                <th>Meat</th>
                <th>Vegetable</th>
                <th>Drink</th>
                <th>Price</th>
                <th>Deliver</th>
              </tr>
              {filteredFoods
                .filter((f) => f.Delivered == false)
                .map((f) => (
                  <tr>
                    <td>{f.User}</td>
                    <td>{f.Meat == true ? "Yes" : "No"}</td>
                    <td>{f.Vegetable == true ? "Yes" : "No"}</td>
                    <td>{f.Drink}</td>
                    <td>{f.price}</td>
                    <td>
                      <button
                        className={classes.finishbutton}
                        onClick={() => handleDeliver(f._id)}
                      >
                        Finish
                      </button>
                    </td>
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
          <h2 className={classes.title}>Finished Order</h2>
        )}
        <div className={classes.foods}>
          {filteredFoods.length !== 0 && (
            <table className={classes.tablecontent}>
              <tr>
                <th>Customer</th>
                <th>Meat</th>
                <th>Vegetable</th>
                <th>Drink</th>
                <th>Price</th>
              </tr>
              {filteredFoods
                .filter((f) => f.Delivered == true)
                .map((f) => (
                  <tr>
                    <td>{f.User}</td>
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

export default Admin;
