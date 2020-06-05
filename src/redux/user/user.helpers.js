export const trimUser = (user) => {

  fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@6.591511,3.490115&key=AIzaSyBneTry7a6XDjUjSBLISxx7Fr6s0AePqVM")
      .then(res => console.log(res.json))


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
