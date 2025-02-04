// const wordInput = document.getElementById("word-input");
// const searchButton = document.getElementById("search-button");

function generateOrdinalSteps(lower, upper, steps = 6) {
  const stepSize = (upper - lower) / (steps - 1);
  const result = [];

  const vals = [];
  for (let i = 0; i < steps; i++) {
    const value = lower + i * stepSize;
    const roundedValue = (Math.round(value * 100 + .0001) / 100).toFixed(2); // Ensure two decimal places
    result.push(floatToOrdinal(parseFloat(roundedValue))); // Convert back to float before passing
    vals.push(roundedValue);
  }

  return [result, vals];
}

// Example usage:


function floatToOrdinal(floatValue) {
  // Extract the fractional part and convert it to a whole number
  floatValue = floatValue.toFixed(2);
  const fractionalPart = floatValue.toString().split(".")[1] || "0";
  const number = parseInt(fractionalPart, 10);

  // Determine the ordinal suffix
  let suffix;
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    suffix = "th";
  } else {
    switch (lastDigit) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
      default:
        suffix = "th";
    }
  }

  // Return the formatted string
  return `${number}${suffix}`;
}

// Example usage:
// console.log(generateOrdinalSteps(0.2, 0.3));


function makePlot(m1, // se1,
                  m1_low, m1_high,
                  m0, years, title,
                  red, green, blue, alpha,
                  y_max, y_min, is_percent,
                  is_rank, is_rank_flex,
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
      x: [years.at(0) - buffer].concat(years.slice(1, -1), [years.at(-1) + buffer]),
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
      x: [years.at(0) - buffer].concat(years.slice(1, -1), [years.at(-1) + buffer]),
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

  var trace_power_line = null;
  if (title.includes("p-value rate")) {
    trace_power_line = {
      x: [2004 - buffer, years.at(-1) + buffer],
      y: [0.26, 0.26],
      type: "scatter",
      xaxis: "x_pf",
      yaxis: "y_pf",
      mode: "lines",
      line: {
        color: "rgba(255, 0, 0, 0.95)",
        width: 2,
        dash: "dash",
      },
    };
  }

  const width = do_div.clientWidth;
  const height = do_div.clientHeight;

  const high_low_dif = y_max - y_min;


  var y_min_ = y_min - 0.05 * high_low_dif;
  var y_max_ = y_max + 0.05 * high_low_dif;
  var yformat;
  var tickvals = null;
  var ticktext = null;

  if (is_rank_flex) {
    y_min_ = y_min - 0.001 * high_low_dif;
    y_max_ = y_max + 0.001 * high_low_dif;
    if (y_max_ - y_min_ < 0.05) {
      const M = (y_min_ + y_max_) / 2;
      y_min_ = M - 0.025;
      y_max_ = M + 0.025;
    }


    y_max_ = Math.round(y_max_ / 0.01) * 0.01;
    y_min_ = Math.round(y_min_ / 0.01) * 0.01;
    var gap = y_max_ - y_min_;
    var gap_new = (Math.round(gap / 0.05) + 1) * 0.05;
    var gap_dif = gap_new - gap;
    y_max_ = y_max_ + gap_dif / 2;
    y_min_ = y_min_ - gap_dif / 2;

    var l_margin = 0.175;

    if (y_max_ > .9999) {
      y_max_ = .999999;
      y_min_ = .949;
    }

    [ticktext, tickvals] = generateOrdinalSteps(y_min_, y_max_);
    console.log(ticktext);
    console.log(tickvals);
    console.log(y_min_);
    console.log(y_max_);

    if (y_max_ > .9999) {
      ticktext = ["95th", "96th", "97th", "98th", "99th"];
      tickvals = [.95, .96, .97, .98, .99];
      y_max_ = 1.003;
      y_min_ = .949;
    }

  } else if (is_rank) {
    y_min_ = 0;
    y_max_ = 1.02;
    yformat = ".0%th";
    tickvals = [.0, .2, .4, .6, .8, 1.0];
    ticktext = ["1st", "20th", "40th", "60th", "80th", "99th"];
  } else if (is_percent) {
    if (y_max_ < .005) {
      yformat = ".2%";
      l_margin = 0.22;
    } else if (y_max_ < 0.05) {
      yformat = ".1%";
      l_margin = 0.2;
    } else if (y_max_ > 0.95) {
      yformat = ".1%";
    } else {
      if (y_max_ - y_min_ < 0.05) {
        y_min_ = y_min - 0.001 * high_low_dif;
        y_max_ = y_max + 0.001 * high_low_dif;
        const M = (y_min_ + y_max_) / 2;
        y_min_ = M - 0.025;
        y_max_ = M + 0.025;
        y_max_ = Math.round(y_max_ / 0.01) * 0.01;
        y_min_ = Math.round(y_min_ / 0.01) * 0.01;
        var gap = y_max_ - y_min_;
        var gap_new = (Math.round(gap / 0.05)) * 0.05;
        var gap_dif = gap_new - gap;
        y_max_ = y_max_ + gap_dif / 2;
        y_min_ = y_min_ - gap_dif / 2;
      }
      yformat = ".0%";
    }
  } else {
    yformat = ",.0";
  }

  var y_annot_spot = 0.26 + (y_max_ - .258) * .08;
  if (y_annot_spot < .267) {
    y_annot_spot = .275;
  }

  var trace_power_line = null;
  var annotation = null;
  if (title.includes("p-value rate")) {
    trace_power_line = {
      x: [2004 - buffer, 2024 + buffer],
      y: [0.26, 0.26],
      type: "line",
      xaxis: "x_pf",
      yaxis: "y_pf",
      mode: "lines",
      line: {
        color: "#2a2424",
        width: 2,
        dash: "dash",
      },

    };

    annotation = {
      x: 2005.2, // Position text at the center
      y: y_annot_spot, // Align with line height
      // text: "(expected if<br>    80% power)",
      text: "(rate at 80% power)",
      showarrow: false,
      font: { size: 16 },
      xanchor: "left",
    };

    if (y_min_ > 0.26) {
      y_min_ = 0.255;
    }
  }


  const layout = {

    title: {
      text: title,
      // y: title.includes("<br>") ? 0.97 : 0.95,
      // yanchor: "middle",
      font: {
        // size: title.includes("<br>") ? 16 : null,
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
      l: l_margin * width,
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
      automargin: true,
      // zeroline: true,
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
      automargin: true,
      // zeroline: true,
    },

    font: {
      family: "Font Awesome 6 Brands", // Set the font family
      // size: 16, // Set the default font size
      size: title.includes("<br>") ? 14 : 16,
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
  if (trace_power_line !== null) {
    layout_data.push(trace_power_line);
    layout.annotations = [annotation];
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
    showlegend: false, // Hide the legend
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
                       is_percent, is_rank, do_div,
                       is_rank_flex, index) {
  const m1_ = m1.slice(0, index + 1);
  // const se1_ = se1 === null ? null : se1.slice(0, index + 1);
  const m1_low_ = m1_low === null ? null : m1_low.slice(0, index + 1);
  const m1_high_ = m1_high === null ? null : m1_high.slice(0, index + 1);
  const m0_ = m0 === null ? null : m0.slice(0, index + 1);
  const years_ = years.slice(0, index + 1);
  var y_max;
  var y_min;

  const title_ = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${title}`;
  // const title_ = `<span style="text-align: center">${title}</span>`;

  // const title_ = title;

  if (is_rank_flex) {
    [y_max, y_min] = get_min_max_m0_m1(m1, m1_low, m1_high, m0);
  } else if (is_rank) {
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
    is_rank_flex, do_div);
}

function processWordData(data) {


  function loop(index, prop) {
    if (index > data.temporal.years.length - 1) return;
    const tStart = performance.now();
    const chartDiv00 = document.getElementById("chart00");
    const chartDiv01 = document.getElementById("chart01");
    const chartDiv02 = document.getElementById("chart02");
    const chartDiv03 = document.getElementById("chart03");

    makePlotIndex(data.temporal.p_fragile.m1,
      data.temporal.p_fragile.m1_low, data.temporal.p_fragile.m1_high,
      // data.temporal.p_fragile.se1,
      data.temporal.p_fragile.m0,
      data.temporal.p_fragile.years,
      "Fragile p-value rate",
      94, 184, 242, prop / 4,
      true, false,
      chartDiv02, false, index);

    makePlotIndex(data.temporal.p_fragile.rank,
      // null, null,
      data.temporal.p_fragile.rank_low, data.temporal.p_fragile.rank_high,
      null,
      data.temporal.p_fragile.years,
      "Fragile p (percentile)",
      3, 152, 252, prop / 4,
      true, true,
      chartDiv03, false, index);
    //

    makePlotIndex(data.temporal.usage.m1,
      data.temporal.usage.m1_low, data.temporal.usage.m1_high, null,
      data.temporal.years,
      "Usage",
      255, 89, 98, prop / 4,
      true, false,
      chartDiv00, false, index);

    // makePlotIndex(data.temporal.usage.rank,
    //   data.temporal.usage.rank_low, data.temporal.usage.rank_high, null,
    //   data.temporal.years,
    //   "Usage (percentile)",
    //   237, 12, 24, prop / 4,
    //   true, true,
    //   chartDiv01, true, index);

    const chartDiv10 = document.getElementById("chart10");
    makePlotIndex(data.temporal.SNIP.rank,
      data.temporal.SNIP.rank_low, data.temporal.SNIP.rank_high,
      null,
      // data.temporal.SNIP.se1,
      // data.temporal.SNIP.m0,
      data.temporal.SNIP.years,
      "Impact factor (percentile)",
      105, 219, 99, prop / 4,
      true, true,
      chartDiv10, false, index);

    const chartDiv11 = document.getElementById("chart11");
    makePlotIndex(data.temporal.log_cites_rel_journal_z.rank,
      data.temporal.log_cites_rel_journal_z.rank_low,
      data.temporal.log_cites_rel_journal_z.rank_high,
      null,
      // data.temporal.SNIP.se1,
      // data.temporal.SNIP.m0,
      data.temporal.log_cites_rel_journal_z.years,
      "Citations (percentile)",
      255, 168, 82, prop / 4,
      true, true,
      chartDiv11, false, index);

    const chartDiv12 = document.getElementById("chart12");
    makePlotIndex(data.temporal.target_score_z.rank,
      data.temporal.target_score_z.rank_low, data.temporal.target_score_z.rank_high,
      null,
      // data.temporal.SNIP.se1,
      // data.temporal.SNIP.m0,
      data.temporal.target_score_z.years,
      "University ranking (percentile)",
      170, 117, 250, prop / 4,
      true, true,
      chartDiv12, false, index);

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
  document.getElementById("sentence1").innerHTML = data.statement1;

  loop(0, 0);
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
      processWordData(data);
    })
    .catch(error => {
      document.getElementById("sentence0").innerHTML = `<p>No data found for "${word}".</p>`;
      console.error(error);
    });
});


randomButton.addEventListener("click", () => {
  fetch("../assets/word_data_help/file_list.json")
    .then(response => response.json())
    .then(files => {
      const randomFile = files[Math.floor(Math.random() * files.length)];
      console.log(randomFile);
      const word = randomFile.split(".")[0];
      const apiUrl = `../assets/word_data/${word}.json`;
      wordInput.value = word;

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Word not found: ${word}`);
          }
          return response.json();
        })
        .then(data => {
          processWordData(data);
        })
        .catch(error => {
          document.getElementById("sentence0").innerHTML = `<p>No data found for "${word}".</p>`;
          console.error(error);
        });

    })
    .catch(error => console.error("Error:", error));

//
//   const fs = require("fs");
//   const path = require("path");
//
// // Specify the directory path
//   const directoryPath = "../assets/word_data";
//
// // Read the contents of the directory
//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       return console.error("Unable to scan directory: " + err);
//     }
//
//     // Filter out directories (optional, if you only want files)
//     const fileList = files.filter(file => {
//       return fs.statSync(path.join(directoryPath, file)).isFile();
//     });
//
//     // Check if there are any files
//     if (fileList.length === 0) {
//       return console.log("No files found in the directory.");
//     }
//
//     // Randomly select a file
//     const randomFile = fileList[Math.floor(Math.random() * fileList.length)];

});


// const word = wordInput.value.trim().toLowerCase();
// const apiUrl = `../assets/word_data/${word}.json`;
//
// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`Word not found: ${word}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     processWordData(data);
//   })
//   .catch(error => {
//     document.getElementById("sentence0").innerHTML = `<p>No data found for "${word}".</p>`;
