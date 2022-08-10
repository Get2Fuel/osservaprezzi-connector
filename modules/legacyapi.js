import axios from "axios";
import getfuelsObject from "./getFuelsObject.js";
import regions from "../static/regions.js";

export const findPumpByName = async ({
  name,
  brand,
  province,
  region,
  fuelType,
}) => {
  console.log(`Trying to find pump with name ${name}...`);
  const baseURL = "https://carburanti.mise.gov.it/ospzApi/search/servicearea/";
  const queryParams = { queryText: name };
  const config = {
    headers: {
      "Content-Type": "application/JSON",
    },
  };
  const response = await axios.post(baseURL, queryParams, config);

  const pumpObj = response.data.results[0];

  const fuels = getfuelsObject(pumpObj.fuels);
  const pump = {
    pumpId: pumpObj.id,
    coordinates: {
      longitude: pumpObj.location.lng,
      latitude: pumpObj.location.lat,
    },
    address: pumpObj.address,
    name: pumpObj.name,
    brand: pumpObj.brand,
    lastUpdate: pumpObj.insertDate,
    fuels: { ...fuels },
  };

  return pump;
};

export const findOneByPumpId = async (pumpId) => {
  const baseURL =
    "https://carburanti.mise.gov.it/ospzApi/registry/servicearea/";
  const response = await axios.get(baseURL + pumpId);
  const pump = await findPumpByName({ name: response.data.nomeImpianto });
  return pump;
};

export const findByAddress = async ({
  region,
  province,
  town,
  fuelType,
  service,
  sort,
}) => {
  const baseURL = "https://carburanti.mise.gov.it/ospzApi/search/area/";
  const queryParams = {
    region: regions[region],
    province: province,
    town: town,
  };
  const config = {
    headers: {
      "Content-Type": "application/JSON",
    },
  };

  const response = await axios.post(baseURL, queryParams, config);

  const pumps = response.data.results.map((pump) => {
    const fuels = getfuelsObject(pump.fuels);
    const pumpObj = {
      pumpId: pump.id,
      coordinates: {
        longitude: pump.location.lng,
        latitude: pump.location.lat,
      },
      address: pump.address,
      name: pump.name,
      brand: pump.brand,
      lastUpdate: pump.insertDate,
      fuels: { ...fuels },
    };
    return pumpObj;
  });

  return pumps;
};

export const findByGeolocation = async ({
  latitude,
  longitude,
  fuelType,
  service,
  sort,
}) => {
  const baseURL = "https://carburanti.mise.gov.it/ospzApi/search/zone/";
  const queryParams = {
    points: [{ lat: +latitude, lng: +longitude }],
  };
  const config = {
    headers: {
      "Content-Type": "application/JSON",
    },
  };

  const response = await axios.post(baseURL, queryParams, config);

  const pumps = response.data.results.map((pump) => {
    const fuels = getfuelsObject(pump.fuels);
    const pumpObj = {
      pumpId: pump.id,
      coordinates: {
        longitude: pump.location.lng,
        latitude: pump.location.lat,
      },
      address: pump.address,
      name: pump.name,
      brand: pump.brand,
      lastUpdate: pump.insertDate,
      fuels: { ...fuels },
    };
    return pumpObj;
  });

  return pumps;
};
