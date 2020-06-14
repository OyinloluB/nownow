export const trimUser = (user) => {

  return {
    id: user._id,
    userID: user.ID,
    name: user.name,
    phone: user.phone,
    confirmed: user.confirmed,
    delivery: user.delivery,
    longitude: Number.parseFloat(user.longitude),
    latitude: Number.parseFloat(user.latitude),
    payment: { ...user.payment },
    products: Array.isArray(user.product) ? [...user.product] : [],
    firstTimer: user.product.length < 1 ? true : false
  };
};
