export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) =>
      cartItem._id === cartItemToAdd._id && cartItem.userID === cartItemToAdd.userID
  );

  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id && cartItem.userID === cartItemToAdd.userID
        ? { ...cartItem }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToRemove._id
  );

  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem._id !== cartItemToRemove._id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
