"use strict";
/**
 * TEST BAZAR API APP 
 */
(function (doc) {
   const API_URL = `http://127.0.0.1:9000`;

   function app() {

      const regionDL = document.querySelector("datalist#regions");
      const provinceDL = document.querySelector("datalist#provinces");
      const locationDL = document.querySelector("datalist#locations");
      var locations, zone, province, region;


      Promise.all([
         axios.get(`${API_URL}/location`).then(res => locations = res.data), 
         axios.get(`${API_URL}/location/zone`).then(res => zone = res.data),
         axios.get(`${API_URL}/location/province`).then(res => province = res.data),
         axios.get(`${API_URL}/location/region`).then(res => region = res.data)
      ]).then(
         () => {
            const regionsOptions = []
            region.forEach(element => {
                  console.log(element);
            });
         }
      ).catch(()=>{
         console.error("Cannot fetch resources");
      })
   }

   document.addEventListener("DOMContentLoaded", app);
})()