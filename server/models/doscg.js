import nerdamer from "nerdamer/all";
import { Client, Status } from "@googlemaps/google-maps-services-js";
import axios from 'axios';

/**
 *  Create a new function for finding X, Y, Z value
 */
exports.findXYZ = (input) => {
  let ans = [];
  let question = [];

  // Extract question series and answer variables
  input.forEach((value, index) => {
    let seq = parseInt(value);
    if (isNaN(seq)) {
      ans.push({
        id: index,
        value: value,
      });
    } else {
      question.push({
        id: index,
        value: seq,
      });
    }
  });

  let gap = 0; // Store gap value each order

  // Find the gap between order
  for (let step = 0; step < question.length - 1; step++) {
    let curGap =
      (question[step + 1].value - question[step].value) / question[step].id;
    if (gap != 0 && gap != curGap)
      return {
        status: "error",
        value: "Not sequece",
      };
    else gap = curGap;
  }

  // Set output to the variables
  let y = question[0].value - gap * ans[1].id;
  let x = y - gap * ans[0].id;
  let z =
    question[question.length - 1].value +
    gap * question[question.length - 1].id;

  return {
    status: "ok",
    value: `X=${x}  Y=${y}  Z=${z}`,
    seq: [x, y, ...question.map((seq) => seq.value), z],
  };
};

/**
 * Create a new function for finding B and C value
 */
exports.findBC = (input) => {
  let equations = [];

  // Format input value 
  input.map((equation) => {
    equation = equation.trim();
    equation = equation.replace('"', "");
    equations.push(equation);
  });
  let variables = "";

  // Use nerdamer library to solve problem
  nerdamer
    .solveEquations(equations)
    .map((value) => (variables += value[0] 
      + "=" + value[1] + "  "));
  return variables;
};

/**
 * Find the best way to go to Central World from SCG  Bangsue
 */
exports.navMap = (origin, dest) => {

  // Create Google Map API client
  const client = new Client({});

  // Call Directions API to find the best route
  return client
    .directions({
      params: {
        origin: origin,
        destination: dest,
        key: process.env.GMAP_KEY,
      },
    })
    .then(route => {
      // Call Static Map API to render map with polyline of the route
      let url = "https://maps.googleapis.com/maps/api/staticmap?key="
      +process.env.GMAP_KEY
      +"&size=480x480&maptype=road&format=png"
      +"&path=weight:10%7Cenc:"+route.data.routes[0].overview_polyline.points;
      return axios.get(url,{responseType: 'arraybuffer'})
    });
};

/**
 * Place AutoComplete function
 */
exports.autoPlace = (input) => {
  const client = new Client({});

  return client.placeAutocomplete({
    params: {
      input: input,
      language: "en-TH",
      key: process.env.GMAP_KEY,
    },
  });
};
