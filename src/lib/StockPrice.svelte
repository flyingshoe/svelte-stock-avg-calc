<script>
  // @ts-nocheck
  import "papercss/dist/paper.min.css";
  import { Card, Table } from "spaper";
  import { stockData } from "../store";

  const formatVal = (val, dec = 4) => {
    return val.toLocaleString(undefined, {
      // minimumFractionDigits: 0,
      maximumFractionDigits: dec,
    });
  };

  $: data = [...Array(10)].map((_, idx) => {
    const newAmt = $stockData.newTotalCost * (idx + 1);
    const newUnits = newAmt / $stockData.newPrice;
    const avgPrice =
      ($stockData.curAvgPrice * $stockData.curQuantity + newAmt) /
      ($stockData.curQuantity + newAmt / $stockData.newPrice);
    const priceDiff = avgPrice - $stockData.curAvgPrice;
    const percentDiff = (priceDiff / $stockData.curAvgPrice) * 100;
    return {
      "New Capital ($)": formatVal(newAmt),
      "New Units": formatVal(Math.round(newUnits)),
      "Average Price": formatVal(avgPrice),
      "Price diff": formatVal(priceDiff),
      "% diff": formatVal(percentDiff, 2),
    };
  });

  $: newAvgCost =
    ($stockData.curAvgPrice * $stockData.curQuantity +
      $stockData.newTotalCost) /
    ($stockData.curQuantity + $stockData.newTotalCost / $stockData.newPrice);
</script>

<div class="row">
  <div class="col lg-3 sm-6">
    <Card title="Current Stock">
      <h5>Stock Name</h5>
      <input
        placeholder="Stock Name"
        class="margin-bottom"
        bind:value={$stockData.stockName}
      />

      <h5>Average Price</h5>
      <input
        type="number"
        placeholder="Average Price"
        bind:value={$stockData.curAvgPrice}
        class="margin-bottom"
      />

      <h5>Quantity</h5>
      <input
        type="number"
        placeholder="Quantity"
        bind:value={$stockData.curQuantity}
      />
    </Card>
  </div>
  <div class="col lg-3 sm-6">
    <Card title="New Stock">
      <h5>Price</h5>
      <input
        type="number"
        placeholder="Price"
        bind:value={$stockData.newPrice}
        class="margin-bottom"
      />

      <h5>Additional Capital ($)</h5>
      <input
        type="number"
        placeholder="Additional Capital"
        bind:value={$stockData.newTotalCost}
        class="margin-bottom-large"
      />
      <h4>Average Cost: {formatVal(newAvgCost)}</h4>
    </Card>
  </div>

  <div class="col lg-6 sm-12">
    <Card>
      <Table {data} hoverable />
    </Card>
  </div>
</div>
