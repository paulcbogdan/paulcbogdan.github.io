// const wordInput = document.getElementById("word-input");
// const searchButton = document.getElementById("search-button");


function makePlot(m1, // se1,
                  m1_low, m1_high,
                  m0, years, title,
                  red, green, blue, alpha,
                  y_max, y_min, is_percent,
                  is_rank, do_div) {
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
      shape: "spline",
    },
  };


  const buffer = 0.35;

  var trace2 = null;
  var trace3 = null;

  if (m1_low !== null) {
    // var p_frag_high = m1.map((x, i) => x + se1[i]);
    // var p_frag_low = m1.map((x, i) => x - se1[i]);
    //
    // first_val_high = p_frag_high[0];
    // first_val_low = p_frag_low[0];
    // last_val_high = p_frag_high[p_frag_high.length - 1];
    // last_val_low = p_frag_low[p_frag_low.length - 1];

    trace2 = {
      x: [2004 - buffer].concat(years.slice(1, -1), [years.at(-1) + buffer]),
      y: m1_high, // upper bound
      type: "scatter",
      fill: "tonexty",
      fillcolor: `rgba(${red}, ${green}, ${blue}, ${alpha})`, // transparent gray
      line: {
        color: "transparent",
        shape: "spline",
      },

    };

    trace3 = {
      x: [2004 - buffer].concat(years.slice(1, -1), [years.at(-1) + buffer]),
      y: m1_low,
      type: "scatter",
      line: {
        color: "transparent",
        shape: "spline",
      },
      // showlegend: false,
    };
  }

  var trace_p_fragile_m0 = null;
  if (m0 !== null) {
    trace_p_fragile_m0 = {
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
        symbol: "circle", // You can change the symbol here,
        shape: "spline",
      },
      line: {
        color: "#2a2424",
        width: 5,
      },
    };
  }

  const width = do_div.clientWidth;
  const height = do_div.clientHeight;

  const high_low_dif = y_max - y_min;


  var yformat;
  var tickvals = null;
  var ticktext = null;
  if (is_rank) {
    yformat = ".0%th";
    tickvals = [.00, .2, .4, .6, .8, 1.0];
    ticktext = ["1st", "20th", "40th", "60th", "80th", "99th"];
  } else if (is_percent) {
    yformat = ".0%";
  } else {
    yformat = ",.0";
  }

  // const yformat = is_percent === true ? ",.0%" : "";

  var y_min_ = y_min - 0.05 * high_low_dif;
  var y_max_ = y_max + 0.05 * high_low_dif;
  if (is_rank) {
    y_min_ = 0.0;
    y_max_ = 1.02;
  }

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
      l: 0.165 * width,
      r: 0.05 * width,
      t: 0.15 * height,
      b: 0.1 * height,
    }, // Remove margins
    autosize: true, // Automatically resize the plot to fit the container
    xaxis: {
      // domain: [0, 0.33],
      showgrid: true,
      showline: true,
      linecolor: "#2a2424",
      linewidth: 2,
      tickwidth: 2,
      ticks: "outside", // Show tick marks outside the axis
      range: [2004 - buffer, 2024 + buffer],
      // range: [years[0] - 0.25, years[years.length - 1] + 0.25],

    },
    yaxis: {
      // domain: [0.5, 1],
      tickformat: yformat,
      showgrid: true,
      showline: true,
      linecolor: "#2a2424",
      linewidth: 2,
      tickwidth: 2,
      ticks: "outside", // Show tick marks outside the axis
      range: [y_min_, y_max_],
      tickvals: tickvals,
      ticktext: ticktext,
    },

    font: {
      family: "Font Awesome 6 Brands", // Set the font family
      size: 16, // Set the default font size
      color: "#2a2424", // Set the default font color
    },
  };
  // layout.annotations = [{
  //   text: "Title above subplot 1", font: { color: "red" },
  //   x: 0.165, y: 1.05, xref: "paper", yref: "paper", showarrow: false,
  //   xanchor: "center",
  // }];

  var layout_data = [];
  layout_data.push({ ...trace_p_fragile_m0, xaxis: "x_pf", yaxis: "y_pf", title: "test" });
  if (trace3 !== null) {
    layout_data.push({ ...trace3, xaxis: "x_pf", yaxis: "y_pf" });
    layout_data.push({ ...trace2, xaxis: "x_pf", yaxis: "y_pf" });
  }
  if (trace_m1 !== null) {
    layout_data.push({ ...trace_m1, xaxis: "x".concat(title), yaxis: "y".concat(title) });
  }

  // const layout_data = [
  //   // { ...trace_usage, xaxis: 'x1', yaxis: 'y1' },
  //   { ...trace_p_fragile_m0, xaxis: "x_pf", yaxis: "y_pf", title: "test" },
  //   { ...trace3, xaxis: "x_pf", yaxis: "y_pf" },
  //   { ...trace2, xaxis: "x_pf", yaxis: "y_pf" },
  //   { ...trace_m1, xaxis: "x_pf", yaxis: "y_pf" },
  // ];

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

function get_min_max_m0_m1(m1, m1_low, m1_high, m0) {
  var min_val;
  var max_val;
  if (m0 === null) {
    if (m1_low === null) {
      max_val = Math.max(...m1);
      min_val = Math.min(...m1);
    } else {
      max_val = Math.max(...m1_high);
      min_val = Math.min(...m1_low);
    }
  } else {
    if (m1_low === null) {
      max_val = Math.max(...m1, ...m0);
      min_val = Math.min(...m1, ...m0);
    } else {
      max_val = Math.max(...m1_high, ...m0);
      min_val = Math.min(...m1_low, ...m0);
    }
  }
  return [max_val, min_val];
}

function makePlotIndex(m1, // se1,
                       m1_low, m1_high,
                       m0, years, title,
                       red, green, blue, alpha,
                       is_percent, is_rank, do_div, index) {
  const m1_ = m1.slice(0, index + 1);
  // const se1_ = se1 === null ? null : se1.slice(0, index + 1);
  const m1_low_ = m1_low === null ? null : m1_low.slice(0, index + 1);
  const m1_high_ = m1_high === null ? null : m1_high.slice(0, index + 1);
  const m0_ = m0 === null ? null : m0.slice(0, index + 1);
  const years_ = years.slice(0, index + 1);
  var y_max;
  var y_min;

  const title_ = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${title}`;

  if (is_rank) {
    y_max = 1.0;
    y_min = 0.0;
  } else {
    [y_max, y_min] = get_min_max_m0_m1(m1, m1_low, m1_high, m0);
  }

  makePlot(m1_, // se1_,
    m1_low_, m1_high_,
    m0_, years_, title_,
    red, green, blue, alpha,
    y_max, y_min, is_percent, is_rank,
    do_div);
}

searchButton.addEventListener("click", () => {
  const word = wordInput.value.trim().toLowerCase();
  const apiUrl = `../assets/word_data/${word}.json`;

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
        const tStart = performance.now();
        const chartDiv00 = document.getElementById("chart00");
        makePlotIndex(data.temporal.p_fragile.m1,
          data.temporal.p_fragile.m1_low, data.temporal.p_fragile.m1_high,
          // data.temporal.p_fragile.se1,
          data.temporal.p_fragile.m0,
          data.temporal.years,
          "Fragile p-value rate",
          94, 184, 242, prop / 4,
          true, false,
          chartDiv00, index);

        const chartDiv01 = document.getElementById("chart01");
        makePlotIndex(data.temporal.p_fragile.rank,
          // null, null,
          data.temporal.p_fragile.rank_low, data.temporal.p_fragile.rank_high,
          null,

          data.temporal.years,
          "p-fragile (%tile)",
          3, 152, 252, prop / 4,
          true, true,
          chartDiv01, index);
        //

        const chartDiv02 = document.getElementById("chart02");
        makePlotIndex(data.temporal.usage.m1,
          data.temporal.usage.m1_low, data.temporal.usage.m1_high, null,
          data.temporal.years,
          "Usage",
          255, 89, 98, prop / 4,
          true, false,
          chartDiv02, index);

        const chartDiv03 = document.getElementById("chart03");
        makePlotIndex(data.temporal.usage.rank,
          data.temporal.usage.rank_low, data.temporal.usage.rank_high, null,
          data.temporal.years,
          "Usage (%tile)",
          237, 12, 24, prop / 4,
          true, true,
          chartDiv03, index);
        //
        // const chartDiv03 = document.getElementById("chart03");
        // makePlotIndex(data.temporal.usage_rank,
        //   null, null, data.temporal.years,
        //   "Usage (%tile)",
        //   255, 89, 98, prop / 4,
        //   true, true,
        //   chartDiv03, index);
        //
        //

        const chartDiv10 = document.getElementById("chart10");
        makePlotIndex(data.temporal.SNIP.rank,
          data.temporal.SNIP.rank_low, data.temporal.SNIP.rank_high,
          null,
          // data.temporal.SNIP.se1,
          // data.temporal.SNIP.m0,
          data.temporal.years,
          "Impact factor (%tile)",
          105, 219, 99, prop / 4,
          true, true,
          chartDiv10, index);

        const chartDiv11 = document.getElementById("chart11");
        makePlotIndex(data.temporal.cites_year.rank,
          data.temporal.cites_year.rank_low, data.temporal.cites_year.rank_high,
          null,
          // data.temporal.SNIP.se1,
          // data.temporal.SNIP.m0,
          data.temporal.years,
          "Citations (%tile)",
          255, 168, 82, prop / 4,
          true, true,
          chartDiv11, index);

        const chartDiv12 = document.getElementById("chart12");
        makePlotIndex(data.temporal.target_rank.rank,
          data.temporal.target_rank.rank_low, data.temporal.target_rank.rank_high,
          null,
          // data.temporal.SNIP.se1,
          // data.temporal.SNIP.m0,
          data.temporal.years,
          "University ranking (%tile)",
          170, 117, 250, prop / 4,
          true, true,
          chartDiv12, index);

        // const chartDiv11 = document.getElementById("chart11");
        // makePlotIndex(data.temporal.cites_year.rank, null, null,
        //   // data.temporal.SNIP.se1,
        //   // data.temporal.SNIP.m0,
        //   data.temporal.years,
        //   "Citations (%tile)",
        //   255, 89, 98, prop / 4,
        //   true, true,
        //   chartDiv11, index);
        //
        // const chartDiv12 = document.getElementById("chart12");
        // makePlotIndex(data.temporal.target_rank.rank, null, null,
        //   // data.temporal.SNIP.se1,
        //   // data.temporal.SNIP.m0,
        //   data.temporal.years,
        //   "University ranking (%tile)",
        //   255, 89, 98, prop / 4,
        //   true, true,
        //   chartDiv12, index);
        const tEnd = performance.now();
        const timeDiff = tEnd - tStart;
        if (index > data.temporal.years.length - 2) {
          if (prop > .99) {
            return;
          }
          setTimeout(() => {
            loop(index, prop + 0.1);
          }, 50 - timeDiff);
        }

        setTimeout(() => {
          loop(index + 1, prop);
        }, 50 - timeDiff);
      }

      document.getElementById("sentence0").innerHTML = data.statement0;
      console.log(data.statement0);
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
