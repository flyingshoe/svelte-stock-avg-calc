<script>
    // @ts-nocheck
    import "papercss/dist/paper.min.css";
    import { Card, Table } from "spaper"; 
  
    const formatVal = (val, dec=4)=>{
        return val.toLocaleString(undefined, {
        // minimumFractionDigits: 0,
        maximumFractionDigits: dec,
      });
    }
  
    $: data = [...Array(10)].map((_, idx) => {
      const newAmt = newTotalCost * (idx + 1);
      const avgPrice = ((curAvgPrice*curQuantity) + newAmt)/(curQuantity + (newAmt/newPrice))
      const priceDiff = avgPrice - curAvgPrice;
      const percentDiff = (priceDiff/curAvgPrice)*100;
      return {
      "Amount Spent": newAmt,
      "Average Price": formatVal(avgPrice),
      "Price difference": formatVal(priceDiff),
      "% difference": formatVal(percentDiff,2)
    }});
    // Current Stock
    let stockName = "";
    let curAvgPrice = 0.0254;
    let curQuantity = 412000;
  
    //New Stock
    let newPrice = 0.016;
    let newTotalCost = 1000;
    $:newAvgCost = ((curAvgPrice*curQuantity) + newTotalCost)/(curQuantity + (newTotalCost/newPrice))
</script>
  
<div class='row'>
    <div class='col lg-3 sm-6'>
        <Card title="Current Stock" >
        <h5>Stock Name</h5>
        <input placeholder="Stock Name" class="margin-bottom" bind:value={stockName}/>
        
        <h5>Average Price</h5>
        <input type='number' placeholder="Average Price" bind:value={curAvgPrice} class="margin-bottom"/>

        <h5>Quantity</h5>  
        <input type='number' placeholder="Quantity" bind:value={curQuantity} />
        </Card>
    </div>  
    <div class='col lg-3 sm-6'>
        <Card title="New Stock">
        <h5>Price</h5>
        <input type='number' placeholder="Price" bind:value={newPrice} class="margin-bottom" />

        <h5>Additional Capital</h5>
        <input type='number' placeholder="Additional Capital" bind:value={newTotalCost} class="margin-bottom-large" />
        <h4>Average Cost: {formatVal(newAvgCost)}</h4>
        </Card>
    </div>

    <div class='col lg-6 sm-12'>
        <Card>
        <Table {data} hoverable/>
        </Card>
    </div>
</div>


  