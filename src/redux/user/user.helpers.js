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
    firstTimer:
      Array.isArray(user.product) &&
      user.product.length > 0 &&
      JSON.stringify(user.product[0]) !== JSON.stringify({ 0: "0" })
        ? false
        : true,
  };
};
