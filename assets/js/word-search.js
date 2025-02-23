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

function dropzero(ticklabels) {
  if (ticklabels.every(label => /\d\.0%$/.test(label))) {
    return ticklabels.map(label => label.replace(/(\d+)\.0%$/, "$1%"));
  }
  return ticklabels;
}

function generateTickLabels(ymin, ymax, format) {
  // Determine the step size
  const range = ymax - ymin;
  const maxSteps = 7; // Maximum number of steps allowed
  let step = Math.pow(10, Math.floor(Math.log10(range / (maxSteps - 1))));

  // Adjust step size to "nice" values (1, 2, or 5 * power of 10)
  const niceSteps = [1, 2, 5, 10];
  let selectedStep = step;

  for (let s of niceSteps) {
    const currentStep = step * s;
    const numSteps = Math.ceil(range / currentStep) + 1;

    if (numSteps <= maxSteps) {
      selectedStep = currentStep;
      break;
    }
  }

  // Generate tick values, rounding to avoid float errors
  let tickValues = [];
  let start = Math.ceil(ymin / selectedStep) * selectedStep;
  for (let v = start; v <= ymax + 1e-10; v += selectedStep) {
    tickValues.push(Number(v.toPrecision(15))); // Avoid float precision errors
  }

  // Convert tick values to percentages if needed
  if (format === ".0%" || format === ".1%" || format === ".2%") {
    tickValues = tickValues.map(v => v * 100);
  }

  // Format tick labels
  let tickLabels = tickValues.map(v => {
    if (format === ".0%") return v.toFixed(0) + "%";
    if (format === ".1%") return v.toFixed(1) + "%";
    if (format === ".2%") return v.toFixed(2) + "%";
    return v.toString(); // Default fallback
  });

  if (format === ".0%" || format === ".1%" || format === ".2%") {
    tickValues = tickValues.map(v => v / 100);
  }

  tickLabels = dropzero(tickLabels);

  return { tickValues, tickLabels };
}

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


function makePlot(m1, // se1,
                  m1_low, m1_high,
                  m0, years, title,
                  red, green, blue, alpha,
                  y_max, y_min, is_percent,
                  is_rank, is_rank_flex,
                  do_div) {

  let themeSetting = determineThemeSetting();
  var isDark;
  if (themeSetting === "system") {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  } else if (themeSetting === "dark") {
    isDark = true;
  } else {
    isDark = false;
  }

  const axisColor = isDark ? "#ffffff" : "#2a2424"; // White in dark mode, black in light mode
  const gridColor = isDark ? "#2a2424" : "#ededed"; // Black in dark mode, white in light mode

  var trace_m1 = {
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
      color: `rgba(${red - 15}, ${green - 15}, ${blue - 15}, 0.95)`,
      width: 5,
      shape: "spline",
    },
    // hoverinfo: "none",
    hovertemplate: "%{y}<extra></extra>",

  };


  const buffer = 0.35;

  var trace2 = null;
  var trace3 = null;

  if (m1_low !== null) {


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
      hoverinfo: "none",


    };

    trace3 = {
      x: [years.at(0) - buffer].concat(years.slice(1, -1), [years.at(-1) + buffer]),
      y: m1_low,
      type: "scatter",
      line: {
        color: "transparent",
        shape: "spline",
      },
      hoverinfo: "none",

      // showlegend: false,
    };
  }

  const marker0_color = isDark ? "white" : "black";
  const marker0_line_color = isDark ? "#cacaca" : "#515151";
  var trace_p_fragile_m0 = null;
  var y_annot_spot;

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
        color: marker0_color,
      },
      line: {
        color: marker0_line_color,
        width: 5,
      },
      // hoverinfo: "none",
      hovertemplate: "%{y:.1%}<extra></extra>",
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
      hoverinfo: "none",
    };

    // max m1 or m0
    high = Math.max(...m1, ...m0);
    const gap = high - 0.26;

    y_annot_spot = 0.26 + gap * .1;
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

    var l_margin = 0.145;

    if (y_max_ > .9999) {
      y_max_ = .999999;
      y_min_ = .949;
    }

    [ticktext, tickvals] = generateOrdinalSteps(y_min_, y_max_);

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
    if (y_max_ < .01) {
      yformat = ".2%";
      trace_m1.hovertemplate = "%{y:.3%}<extra></extra>";
      l_margin = 0.22;
    } else if (y_max_ < 0.05) {
      yformat = ".1%";
      trace_m1.hovertemplate = "%{y:.2%}<extra></extra>";
      l_margin = 0.2;
    } else if (y_max_ > 0.95) {
      trace_m1.hovertemplate = "%{y:.2%}<extra></extra>";
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
      trace_m1.hovertemplate = "%{y:.1%}<extra></extra>";
      yformat = ".0%";
    }

  } else {
    yformat = ",.0";
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
        color: axisColor,
        width: 2,
        dash: "dash",
      },
      hoverinfo: "none",
    };

    annotation = {
      x: 2005.2, // Position text at the center
      y: y_annot_spot, // Align with line height
      // text: "(expected if<br>    80% power)",
      text: "(rate at 80% power)",
      showarrow: false,
      font: {
        size: 16,
        color: axisColor,
      },
      xanchor: "left",
      color: axisColor,
    };

    if (y_min_ > 0.25) {
      y_min_ = 0.25;
    }
  }
  if (y_min_ < 0) {
    y_min_ = 0;
  }

  if (is_percent && !is_rank_flex && !is_rank) {
    const tick_info = generateTickLabels(y_min_, y_max_, yformat);
    tickvals = tick_info.tickValues;
    ticktext = tick_info.tickLabels;
  }

  function getTextWidth(text) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    // context.font = "12px Arial"; // Match your plot's font
    context.font = "14px Font Awesome 6 Brands";
    return context.measureText(text).width * 1.5;
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
    // hovermode: false,
    // margin: { t: 20},
    margin: {
      l: 0, // l_margin * width,
      r: 10, // 0.05 * width,
      t: 40, // 0.15 * height,
      b: 15, // 0.1 * height,
      pad: 0,
      autoexpand: true,
    }, // Remove margins
    autosize: true, // Automatically resize the plot to fit the container
    paper_bgcolor: "rgba(0,0,0,0)", // Transparent background
    plot_bgcolor: "rgba(0,0,0,0)", // Transparent plot area
    xaxis: {
      // domain: [0, 0.33],
      showgrid: true,
      showline: true,
      linewidth: 2,
      tickwidth: 2,
      ticks: "outside", // Show tick marks outside the axis
      range: [2004, 2024],
      automargin: true,
      tickvals: [2004, 2008, 2012, 2016, 2020, 2024],
      ticktext: ["2004", "2008", "2012", "2016", "2020", "2024"],
      linecolor: axisColor,
      tickfont: { color: axisColor },
      tickcolor: axisColor,
      gridcolor: gridColor,
      // zeroline: true,
      // range: [years[0] - 0.25, years[years.length - 1] + 0.25],

    },
    yaxis: {
      // domain: [0.5, 1],
      tickformat: yformat,
      showgrid: true,
      showline: true,
      linewidth: 2,
      tickwidth: 2,
      range: [y_min_, y_max_],
      tickvals: tickvals,
      ticktext: ticktext,
      automargin: true,
      ticklabelposition: "outside",
      ticklabelstandoff: 10,  // Adjust as needed
      linecolor: axisColor,
      tickfont: { color: axisColor },
      tickcolor: axisColor,
      gridcolor: gridColor,


      scaleratio: 1,
      constrain: "domain", // Keeps the y-axis within bounds
      // zeroline: true,
    },

    font: {
      family: "Font Awesome 6 Brands", // Set the font family
      // size: 16, // Set the default font size
      size: title.includes("<br>") ? 14 : 16,
      // color: "#2a2424", // Set the default font color
    },
  };

  if (ticktext !== null) {
    layout.margin.l = Math.max(...ticktext.map(getTextWidth)) * 1.2 + 12;
  }
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
  // Plotly.relayout(myPlot, { "yaxis.automargin": true });
  // return new Promise(resolve => setTimeout(resolve, ms));
}

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

function processWordData(data, signal) {


  function loop(index, prop) {
    if (signal.aborted) {
      // console.log("Request aborted, skipping processWordData");
      return;
    }

    if (index > data.temporal.years.length - 1) return;

    const tStart = performance.now();

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


    makePlotIndex(data.temporal.SNIP_z.rank,
      data.temporal.SNIP_z.rank_low, data.temporal.SNIP_z.rank_high,
      null,
      // data.temporal.SNIP.se1,
      // data.temporal.SNIP.m0,
      data.temporal.SNIP.years,
      "Impact factor (percentile)",
      105, 219, 99, prop / 4,
      true, true,
      chartDiv10, false, index);

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

    makePlotIndex(data.temporal.target_score_z.rank,
      data.temporal.target_score_z.rank_low, data.temporal.target_score_z.rank_high,
      null,
      // data.temporal.SNIP.se1,
      // data.temporal.SNIP.m0,
      data.temporal.target_score_z.years,
      "School rank (percentile)",
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
        loop(index, prop + 0.2);
      }, 50 - timeDiff);
    }

    setTimeout(() => {
      loop(index + 2, prop);
    }, 50 - timeDiff);
  }

  const chartDiv00 = document.getElementById("chart00");
  const chartDiv02 = document.getElementById("chart02");
  const chartDiv03 = document.getElementById("chart03");
  const chartDiv10 = document.getElementById("chart10");
  const chartDiv11 = document.getElementById("chart11");
  const chartDiv12 = document.getElementById("chart12");

  document.getElementById("sentence0").innerHTML = data.statement0;
  document.getElementById("sentence1").innerHTML = data.statement1;


  statement2_text = "Shading illustrates ± 1 standard error. The data at each year is pooled across ± 2 years (e.g., at 2014, data is from 2012-2016). These intervals may get wonky at low usage levels. Most words yielding the lowest rates of fragile p-values seem to be from big correlational studies. The word-percentile distributions may not always be intuitive (e.g., a word's papers' fragile p-value rate may be below the median paper while the word is still in the top 50th percentile of words). Finally, note that the citations plot represents the citations received as of 2024 of papers published in a given past year, not the citations received in said year.";
  document.getElementById("sentence2").innerHTML = statement2_text;


  loop(0, 0);
}

function clearEverything() {
  const chartDiv00 = document.getElementById("chart00");
  const chartDiv02 = document.getElementById("chart02");
  const chartDiv03 = document.getElementById("chart03");
  const chartDiv10 = document.getElementById("chart10");
  const chartDiv11 = document.getElementById("chart11");
  const chartDiv12 = document.getElementById("chart12");

  // clear
  chartDiv00.innerHTML = "";
  chartDiv02.innerHTML = "";
  chartDiv03.innerHTML = "";
  chartDiv10.innerHTML = "";
  chartDiv11.innerHTML = "";
  chartDiv12.innerHTML = "";
  document.getElementById("sentence1").innerHTML = "";
  document.getElementById("sentence2").innerHTML = "";

}

function getSliderState() {
  const toggle_ps = document.getElementById("neuroPsychToggle_ps");
  return toggle_ps.checked; // Returns true for "Psych", false for "Neuro"
}

let abortController = null;

searchButton.addEventListener("click", () => {
  // Abort the previous request if it exists
  if (abortController) {
    abortController.abort();
  }
  showButton();


  // Create a new AbortController for the current request
  abortController = new AbortController();
  const signal = abortController.signal;

  const word = wordInput.value.trim().toLowerCase();
  var apiUrl;
  if (getSliderState()) {
    apiUrl = `../assets/word_data/${word}.json`;
  } else {
    apiUrl = `../assets/neuro_word_data/${word}.json`;
  }

  fetch(apiUrl, { signal })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Word not found: ${word}`);
      }
      return response.json();
    })
    .then(data => {
      processWordData(data, signal);
    })
    .catch(error => {
      document.getElementById("sentence0").innerHTML = `<p>No data found for "${word}".</p>`;
      clearEverything();
      console.error(error);
    });
});


randomButton.addEventListener("click", () => {

  if (abortController) {
    abortController.abort();
  }

  // Create a new AbortController for the current request
  abortController = new AbortController();
  const signal = abortController.signal;
  var dir_in;
  if (getSliderState()) {
    dir_in = "../assets/word_data_help/file_list.json";
  } else {
    dir_in = "../assets/word_data_help/file_list_neuro.json";
  }

  fetch(dir_in)
    .then(response => response.json())
    .then(files => {
      const randomFile = files[Math.floor(Math.random() * files.length)];
      const word = randomFile.split(".")[0];
      var apiUrl;
      if (getSliderState()) {
        apiUrl = `../assets/word_data/${word}.json`;
      } else {
        apiUrl = `../assets/neuro_word_data/${word}.json`;
      }

      // const apiUrl = `../assets/word_data/${word}.json`;
      wordInput.value = word;
      showButton();

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Word not found: ${word}`);
          }
          return response.json();
        })
        .then(data => {
          processWordData(data, signal);

          const wordInput = document.getElementById("word-input");
          const word = wordInput.value.trim().toLowerCase();
          const base_url = location.protocol + "//" + location.host + location.pathname;
          const toggle_ps = document.getElementById("neuroPsychToggle_ps");
          const newUrl = base_url + "?word=" + word + "&psych_neuro=" + toggle_ps.checked;
          window.history.pushState({ path: newUrl }, "", newUrl);

        })
        .catch(error => {
          document.getElementById("sentence0").innerHTML = `<p>No data found for "${word}".</p>`;
          clearEverything();
          console.error(error);
        });

    })
    .catch(error => {
      document.getElementById("sentence0").innerHTML = `<p>No data found for "${word}".</p>`;
      clearEverything();
      console.error(error);
    });
});

document.getElementById("search-button").addEventListener("click", function() {
  const wordInput = document.getElementById("word-input");
  const word = wordInput.value.trim().toLowerCase();
  const base_url = location.protocol + "//" + location.host + location.pathname;
  const toggle_ps = document.getElementById("neuroPsychToggle_ps");
  const newUrl = base_url + "?word=" + word + "&psych_neuro=" + toggle_ps.checked;

  // Update the URL without reloading the page
  window.history.pushState({ path: newUrl }, "", newUrl);
});