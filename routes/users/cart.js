const express = require("express");
const router = express.Router();
const db = require("../../db");

//Add an item to a users cart
router.post("/cart", async (req, res) => {
  try {
    const cart = await db.query(
      "SELECT cart FROM cart WHERE email='ric19mat@gmail.com'"
    );

    let currentCart = cart.rows[0].cart;
    let newItem = req.body.id;

    let uniqueItem = true;
    // Run if the cart has items
    if (currentCart !== null) {
      for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i] === req.body.id) {
          uniqueItem = false;
        }
      }

      // Add the item to the cart if it does not already exist within it
      if (uniqueItem === true) {
        currentCart.push(newItem);
      }
      // Run if the cart has no items
    } else {
      currentCart = [req.body.id];
    }

    let newCart = await db.query(
      "UPDATE cart SET cart=$1 WHERE email='ric19mat@gmail.com'",
      [currentCart]
    );
    // let newCart = await db.query("UPDATE users SET cart=$1 WHERE email=$2", [
    //   currentCart,
    //   req.session.email,
    // ]);

    res.status(201).json({
      status: "success",
      results: newCart.rows,
      data: {
        cart: newCart.rows,
        uniqueItem: uniqueItem,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all products items of a certain type
router.get("/cart", async (req, res) => {
  try {
    const cart = await db.query(
      "SELECT * FROM cart WHERE email='ric19mat@gmail.com'"
    );

    const usersCart = [];

    //Check if cart is not null
    if (cart.rows[0].cart !== null) {
      for (let i = 0; i < cart.rows[0].cart.length; i++) {
        // Get a specific product from the cart
        const cartProducts = await db.query(
          "SELECT * FROM products WHERE id=$1",
          [cart.rows[0].cart[i]]
        );
        // Add the selected cart to the array
        usersCart.push(cartProducts.rows[0]);
      }
    }

    // Get the cart quantity
    const qty = await db.query(
      "SELECT qty FROM cart WHERE email='ric19mat@gmail.com'"
    );
    const cartQty = qty.rows[0].qty;

    res.status(200).json({
      status: "success",
      results: usersCart.length,
      data: {
        cart: usersCart,
        qty: cartQty,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update the cart quantity
router.put("/cart/quantity", async (req, res) => {
  try {
    await db.query(
      "UPDATE cart SET qty=$1 WHERE email='ric19mat@gmail.com' RETURNING *",
      [req.body.cartQty]
    );

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete an item from the cart
router.put("/cart/delete", async (req, res) => {
  try {
    // Get all items from the cart
    const cart = await db.query(
      "SELECT cart FROM cart WHERE email='ric19mat@gmail.com'"
    );

    const newCart = [];
    // Create a new array not including the item to be deleted
    for (let i = 0; i < cart.rows[0].cart.length; i++) {
      if (req.body.id !== cart.rows[0].cart[i]) {
        newCart.push(cart.rows[0].cart[i]);
      }
    }

    let qty = [];
    // Increase quantity by one
    for (let i = 0; i < newCart.length; i++) {
      qty.push(1);
    }

    // Check if the new cart has items in it
    if (JSON.stringify(newCart) !== JSON.stringify([])) {
      // If the new cart has items update the cart in database
      await db.query(
        "UPDATE cart SET cart=$1, qty=$2 WHERE email='ric19mat@gmail.com' RETURNING *",
        [newCart, qty]
      );
    } else {
      // If the new cart does not have items update the cart in database to having no items
      await db.query(
        "UPDATE cart SET cart=(NULL), qty=(NULL) WHERE email='ric19mat@gmail.com' RETURNING *"
      );
    }

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete all items from the cart
router.put("/cart/deleteAll", async (req, res) => {
  try {
    await db.query(
      "UPDATE cart SET cart=(NULL), qty=(NULL) WHERE email='ric19mat@gmail.com' RETURNING *"
    );

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
