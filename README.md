# OsservaPrezzi-Connector

## APIs

### Get pumps via geolocation(coordinates)

Path: `/geolocate/{latitude}/{longidute}/{fuelType}/{service}/`

Fields:

| Name      | Format                                  |
| --------- | --------------------------------------- |
| latitude  | Latitude number with 15 decimal digits  |
| longitude | Longitude number with 15 decimal digits |
| fuelType  | Name of the fuel                        |
| service   | Type of service                         |

Example: `/search/Lombardia/MI/Milano/gasoline/self/`

### Get pumps via position(manual search)

Path: `/search/{region}/{province}/{town}/{fuelType}/{service}/`

Fields:

| Name     | Format                                |
| -------- | ------------------------------------- |
| region   | Complete name of the region           |
| province | Standard 2 letters code for provinces |
| town     | Complete name of the town             |
| fuelType | Name of the fuel                      |
| service  | Type of service                       |

Example: `/search/Lombardia/MI/Milano/gasoline/self/`

---

You can find the possible values for the fields in the json folder of the repo.

## Commits history

### 2021-09-14

#### Working API

Added support for

- get pumps via manual search
- get pumps via coordinates

### 2021-09-04

#### First commit

### 2021-09-04

#### Initial commit
