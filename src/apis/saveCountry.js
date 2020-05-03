import axios from "axios";

const GeoAPI = "https://ipapi.co/json/";

const country_code = localStorage.getItem("country_code");

const fetchCountry = async () => {
    const res = await axios.get(GeoAPI, { mode: "no-cors" });
    localStorage.setItem("country_code", res.data.country);
}

if(!country_code) {
    fetchCountry()
}