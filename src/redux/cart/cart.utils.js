export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) =>
      cartItem._id === cartItemToAdd._id && cartItem.userID === cartItemToAdd.userID
  );

  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id && cartItem.userID === cartItemToAdd.userID
        ? { ...cartItem, quantity: cartItem.quantity + cartItemToAdd.quantity }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingItem = cartItems.find(
    (cartItem) =>
      cartItem._id === cartItemToRemove._id &&
      cartItem.userID === cartItemToRemove.userID
  );

  if (existingItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) =>
        !(
          cartItem._id === cartItemToRemove._id &&
          cartItem.userID === cartItemToRemove.userID
        )
    );
  }

  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id &&
    cartItem.userID === cartItemToRemove.userID
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
