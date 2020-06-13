import { Client } from "@googlemaps/google-maps-services-js";

const { REACT_APP_GOOGLE_MAP_API_KEY: API_KEY } = process.env;

const googleClient = new Client({});

const modifyAddressStr = (address) => {
  return address.split(" ").join("+");
};

export const getAddressCoordinates = async (address) => {
  const mapAddress = modifyAddressStr(address);
  try {
    const response = await googleClient.geocode({
      params: {
        address: mapAddress,
        key: API_KEY,
      },
    });
    return response.data.results[0].geometry.location;
  } catch (error) {
    throw error.data || error;
  }
};

export const getCoordinatesAddress = async (lat, lng) => {
  try {
    const response = await googleClient.geocode({
      params: {
        address: `${lat},${lng}`,
        key: API_KEY,
      },
    });
    return response.data.results.length > 0
      ? response.data.results[0].formatted_address
      : null;
  } catch (error) {
    throw error.data || error;
  }
};
