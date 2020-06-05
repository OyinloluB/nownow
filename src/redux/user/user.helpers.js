export const trimUser = (user) => {

  return {
    id: user._id,
    userID: user.ID,
    name: user.name,
    phone: user.phone,
    delivery: user.delivery,
    longitude: Number.parseFloat(user.longitude),
    latitude: Number.parseFloat(user.latitude),
    payment: { ...user.payment },
    products: Array.isArray(user.product) ? [...user.product] : [],
  };
};
