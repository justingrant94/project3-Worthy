import express from "express"

import { registerUser, loginUser } from "../controllers/auth.js"
import { showItems, addItem, getOneItem, deleteItem, updateItem } from "../controllers/items.js"
import { secureRoute } from "./secureRoute.js"
import { getProfile, showUsers, oneUser } from "../controllers/users.js"
import { getBasketItems, addBasketItems, removeBasketItem } from "../controllers/userBasketItems.js"

const router = express.Router()

router.route('/items')
  .get(showItems)
  .post(secureRoute, addItem)

router.route('/items/:id')
  .put(secureRoute, updateItem)
  .delete(secureRoute, deleteItem)
  .get(getOneItem)

//BASKET ROUTES

router.route('/users/:userId/basket') // Adding an item to the users Basket
  .get(secureRoute, getBasketItems)
  .post(secureRoute, addBasketItems)

router.route('/users/:userId/basket/:basketItemId')
  .delete(secureRoute, removeBasketItem)


router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

//  NEED TO ADD SECURE ROUTE TO THIS
router.route('/profile')
  .get(secureRoute, getProfile)

//Show all the users
router.route('/users')
  .get(showUsers)

router.route('/users/:id')
  .get(oneUser)

export default router