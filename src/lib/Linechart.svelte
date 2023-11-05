<script>
  import { scaleBand, scaleLinear } from "d3-scale";

  export let data;

  let width = 800;
  let height = 600;

  const padding = { top: 20, right: 20, bottom: 50, left: 200 };
  const innerHeight = height - padding.top - padding.bottom;
  const innerWidth = width - padding.left - padding.right;

  $: xDomain = data.map((d) => d.country);
  $: xScale = scaleLinear().domain([0, xDomain.length]).range([0, innerWidth]);

  $: yDomain = data.map((d) => +d.population);
  $: yScale = scaleLinear()
    .domain([0, Math.max(...yDomain)])
    .range([0, innerHeight]);
</script>

<svg {width} {height}>
  <g transform={`translate(${padding.left},${padding.top})`}>
    <!-- Y-Axis -->
    <line y2={innerHeight} stroke="black" />
    {#each data as d}
      <g transform={`translate(0, ${yScale(d.population)})`}>
        <text text-anchor="end" x="-3" y="-4">
          {d.country}
        </text>
      </g>
    {/each}

    <!-- X-Axis -->
    <line y1={innerHeight} y2={innerHeight} x2={innerWidth} stroke="black" />
    {#each xScale.ticks() as tickValue, idx}
      <g transform={`translate(${xScale(tickValue)},0)`}>
        <line y1={innerHeight - 6} y2={innerHeight + 6} stroke="black" />
        <text text-anchor="middle" dy="1.4em" y={innerHeight + 3}>
          {xDomain[idx]}
        </text>
        <rect x="100" y="0" width={100} height={100} />
      </g>
    {/each}
  </g>
</svg>
