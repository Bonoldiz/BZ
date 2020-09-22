"use strict";
/**
 * TEST BAZAR API APP 
 */
(function (doc) {
   const API_URL = `http://127.0.0.1:9000`;

   function app() {
      const regionSL = document.querySelector("select#region");
      const provinceSL = document.querySelector("select#province");
      const locationSL = document.querySelector("select#location");
      var locations, zone, province, region;

      const regionsOptions = [];
      const provincesOptions = [];
      const locationsOptions = [];

      function selectRegion(codice){
         provinceSL.innerHTML = '';
         locationSL.innerHTML = '';

         
      }

      regionSL.onchange = (e) => console.log(e.target.value)

      Promise.all([
         axios.get(`${API_URL}/location`).then(res => locations = res.data.data), 
         axios.get(`${API_URL}/location/zone`).then(res => zone = res.data.data),
         axios.get(`${API_URL}/location/province`).then(res => province = res.data.data),
         axios.get(`${API_URL}/location/region`).then(res => region = res.data.data)
      ]).then(
         () => {
            region.forEach(element => {
                  let option = document.createElement("option");
                  option.value = element.codice;
                  option.innerHTML = element.nome;
                  regionsOptions.push(option);
                  regionSL.appendChild(option);
            });

            province.forEach(element => {
                  let option = document.createElement("option");
                  option.value = element.codice;
                  option.innerHTML = element.nome;
                  provincesOptions.push(option);
                  provinceSL.appendChild(option);
            });
            
            locations.forEach(element => {
                  let option = document.createElement("option");
                  option.value = element.codice;
                  option.innerHTML = element.nome;
                  locationsOptions.push(option);
                  locationSL.appendChild(option);
            });

         }
      ).catch((e)=>{
         console.error(e);
      })
   }

   document.addEventListener("DOMContentLoaded", app);
})()