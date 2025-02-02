// const wordInput = document.getElementById("word-input");
// const searchButton = document.getElementById("search-button");


function makePlot(m1, se1, m0, years, title,
                  red, green, blue, alpha,
                  y_max, y_min, is_percent,
                  do_div) {
  const trace_m1 = {
    x: years, y: m1,
    type: "scatter",
    xaxis: "x".concat(title),
    yaxis: "y".concat(title),
    mode: "lines+markers",
    marker: {
      color: `rgba(${red}, ${green}, ${blue}, 0.95)`,
      size: 8,
      symbol: "circle", // You can change the symbol here
    },
    line: {
      color: `rgba(${red}, ${green}, ${blue}, 0.95)`,
      width: 5,
    },
  };


  var p_frag_high = m1.map((x, i) => x + se1[i]);
  var p_frag_low = m1.map((x, i) => x - se1[i]);

  first_val_high = p_frag_high[0];
  first_val_low = p_frag_low[0];
  last_val_high = p_frag_high[p_frag_high.length - 1];
  last_val_low = p_frag_low[p_frag_low.length - 1];

  const buffer = 0.25;


  const trace2 = {
    x: [2004 - buffer].concat(years.slice(1, -1), [years.at(-1) + buffer]),
    y: p_frag_high, // upper bound
    type: "scatter",
    fill: "tonexty",
    fillcolor: `rgba(${red}, ${green}, ${blue}, ${alpha})`, // transparent gray
    line: { color: "transparent" },
    // showlegend: false,

  };

  const trace3 = {
    x: [2004 - buffer].concat(years.slice(1, -1), [years.at(-1) + buffer]),
    y: p_frag_low,
    type: "scatter",
    line: { color: "transparent" },
    // showlegend: false,

  };

  const trace_p_fragile_m0 = {
    x: years,
    y: m0,
    type: "scatter",
    // marker: { color: "black" },
    xaxis: "x_pf",
    yaxis: "y_pf",
    mode: "lines+markers",
    marker: {
      color: "black",
      size: 7,
      symbol: "circle", // You can change the symbol here
    },
    line: {
      color: "black",
      width: 5,
    },
    // showlegend: false,

  };

  const width = do_div.clientWidth;
  const height = do_div.clientHeight;

  const high_low_dif = y_max - y_min;

  const yformat = is_percent === true ? ",.0%" : "";

  const layout = {

    title: {
      text: title,
      font: {
        color: `rgba(${red}, ${green}, ${blue}, 0.95)`,
      },
    },

    height: do_div.clientHeight,
    width: do_div.clientWidth,
    dragmode: false,
    displayModeBar: false, // Hide modebar (menu options)
    showlegend: false,
    // margin: { t: 20},
    margin: {
      l: 0.15 * width,
      r: 0.05 * width,
      t: 0.15 * height,
      b: 0.1 * height,
    }, // Remove margins
    autosize: true, // Automatically resize the plot to fit the container
    xaxis: {
      // domain: [0, 0.33],
      showgrid: true,
      showline: true,
      linecolor: "#000",
      linewidth: 2,
      tickwidth: 2,
      ticks: "outside", // Show tick marks outside the axis
      range: [2003.75, 2024.25],
      // range: [years[0] - 0.25, years[years.length - 1] + 0.25],

    },
    yaxis: {
      // domain: [0.5, 1],
      tickformat: yformat,
      showgrid: true,
      showline: true,
      linecolor: "#000",
      linewidth: 2,
      tickwidth: 2,
      ticks: "outside", // Show tick marks outside the axis
      range: [y_min - 0.05 * high_low_dif, y_max + 0.05 * high_low_dif],
    },

    font: {
      family: "Font Awesome 6 Brands", // Set the font family
      size: 16, // Set the default font size
      color: "#000", // Set the default font color
    },
  };
  // layout.annotations = [{
  //   text: "Title above subplot 1", font: { color: "red" },
  //   x: 0.165, y: 1.05, xref: "paper", yref: "paper", showarrow: false,
  //   xanchor: "center",
  // }];


  const layout_data = [
    // { ...trace_usage, xaxis: 'x1', yaxis: 'y1' },
    { ...trace_p_fragile_m0, xaxis: "x_pf", yaxis: "y_pf", title: "test" },
    { ...trace3, xaxis: "x_pf", yaxis: "y_pf" },
    { ...trace2, xaxis: "x_pf", yaxis: "y_pf" },
    { ...trace_m1, xaxis: "x_pf", yaxis: "y_pf" },
  ];

  var config = {
    displaylogo: false, // Hide Plotly logo
    displayModeBar: false, // Hide modebar (menu options)
    hovermode: false, // Hide hover text
  };

  Plotly.newPlot(do_div, layout_data, layout, config);
  // return new Promise(resolve => setTimeout(resolve, ms));
}

// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
//
// async function makePlotSleep(m1, se1, m0, years, title,
//                              red, green, blue, do_div) {
//   makePlot(1, se1, m0, years, title,
//     red, green, blue, do_div);
//   await delay(100);
// }

function get_min_max_m0_m1(m1, se1, m0) {
  const m1_high = m1.map((x, i) => x + se1[i]);
  const m1_low = m1.map((x, i) => x - se1[i]);
  const max_val = Math.max(...m1_high, ...m0);
  const min_val = Math.min(...m1_low, ...m0);
  return [max_val, min_val];
}

function makePlotIndex(m1, se1, m0, years, title,
                       red, green, blue, alpha,
                       is_percent, do_div, index) {
  const m1_ = m1.slice(0, index + 1);
  const se1_ = se1.slice(0, index + 1);
  const m0_ = m0.slice(0, index + 1);
  const years_ = years.slice(0, index + 1);

  const [y_max, y_min] = get_min_max_m0_m1(m1, se1, m0);
  makePlot(m1_, se1_, m0_, years_, title,
    red, green, blue, alpha,
    y_max, y_min, is_percent, do_div);
}

searchButton.addEventListener("click", () => {
  const word = wordInput.value.trim().toLowerCase();
  const apiUrl = `../assets/word_data/${word}_ranks.json`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Word not found: ${word}`);
      }
      return response.json();
    })
    .then(data => {

      function loop(index, prop) {
        if (index > data.temporal.years.length - 1) return;
        const chartDiv00 = document.getElementById("chart00");
        makePlotIndex(data.temporal.p_fragile.m1,
          data.temporal.p_fragile.se1,
          data.temporal.p_fragile.m0,
          data.temporal.years,
          "p-fragile percentage",
          255, 89, 98, prop / 4,
          true,
          chartDiv00, index);


        const chartDiv10 = document.getElementById("chart10");
        makePlotIndex(data.temporal.SNIP.m1,
          data.temporal.SNIP.se1,
          data.temporal.SNIP.m0,
          data.temporal.years,
          "Impact factor (SNIP)",
          255, 89, 98, prop / 4,
          false,
          chartDiv10, index);


        // const chartDiv01 = document.getElementById("chart01");
        // makePlot(
        //   data.temporal.p_fragile.m1,
        //   data.temporal.p_fragile.se1,
        //   data.temporal.p_fragile.m0,
        //   data.temporal.years,
        //   "p-fragile percentage",
        //   255, 161, 132, 0.25,
        //   chartDiv01, index);

        if (index > data.temporal.years.length - 2) {
          if (prop > .99) {
            return;
          }
          setTimeout(() => {
            loop(index, prop + 0.1);
          }, 50);
        }

        setTimeout(() => {
          loop(index + 1, prop);
        }, 50);
      }

      loop(0, 0);

      // const chartDiv01 = document.getElementById("chart01");
      // makePlot(m1_outer, se1_outer, m0_outer, years_outer,
      //   "p-fragile percentage",
      //   255, 161, 132, 0.25,
      //   chartDiv01);
      //
      // const chartDiv02 = document.getElementById("chart02");
      // makePlot(m1_outer, se1_outer, m0_outer, years_outer,
      //   "p-fragile percentage",
      //   62, 130, 240, 0.25,
      //   chartDiv02);


    });

  // .catch(error => {
  //   chartDiv.innerHTML = `<p>No data found for "${word}".</p>`;
  //   chartDiv.innerHTML = `<p>No data found for "${apiUrl}".</p>`;
  //
  //   console.error(error);
  // });
});
