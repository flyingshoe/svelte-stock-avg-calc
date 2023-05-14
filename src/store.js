// @ts-ignore
import { writable } from "svelte/store";

export const stockData = writable(
  JSON.parse(localStorage.getItem("stockData")) || {
    stockName: "",
    curAvgPrice: 0.0254,
    curQuantity: 412000,
    newPrice: 0.016,
    newTotalCost: 1000,
  }
);

stockData.subscribe((val) => {
  localStorage.setItem("stockData", JSON.stringify(val));
});
