<script>
  import * as d3 from "d3";
  import { draw } from "svelte/transition";

  export let show;
  export let data;
  export let width = 540;
  export let height = 400;
  export let marginTop = 20;
  export let marginRight = 20;
  export let marginBottom = 20;
  export let marginLeft = 20;

  $: x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight]
  );
  $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  $: line = d3.line((d, i) => x(i), y);
</script>
{#if show}
  <svg {width} {height}>
    <path transition:draw={{ duration: 2000 }} fill="none" stroke="#F50" stroke-width="2" d={line(data)} />
    <g fill="#F50" stroke="currentColor" stroke-width="1.5">
      {#each data as d, i}
        <circle key={i} cx={x(i)} cy={y(d)} r="5" />
      {/each}
    </g>
  </svg>
{/if}
