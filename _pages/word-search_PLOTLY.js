const wordInput = document.getElementById("word-input");
const searchButton = document.getElementById("search-button");
const chartDiv = document.getElementById("chart");


searchButton.addEventListener("click", () => {
  console.log(wordInput);
  const word = wordInput.value.trim().toLowerCase();
  const apiUrl = `../assets/word_data/${word}.json`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Word not found: ${word}`);
      }
      /*console.log(response.json());*/
      return response.json();
    })
    .then(data => {

      // const trace_usage = {
      //     x: data.temporal.years,
      //     y: data.temporal.usage,
      //     type: 'scatter'
      // };
      // console.log(data.temporal.p_fragile);

      const trace_p_fragile_m1 = {
        x: data.temporal.years,
        y: data.temporal.p_fragile.m1,
        type: "scatter",
        xaxis: "x_pf",
        yaxis: "y_pf",
        mode: "lines+markers",
        marker: {
          color: "red",
          size: 4,
          symbol: "circle", // You can change the symbol here
          // color: "rgba(222, 45, 38, .8)",
        },
        // showlegend: true,
      };

      var p_frag_high = data.temporal.p_fragile.m1.map((x, i) =>
        x + data.temporal.p_fragile.se1[i]);
      var p_frag_low = data.temporal.p_fragile.m1.map((x, i) =>
        x - data.temporal.p_fragile.se1[i]);

      console.log(p_frag_high);
      console.log(p_frag_low);

      const trace2 = {
        x: data.temporal.years,
        y: p_frag_high, // upper bound
        type: "scatter",
        fill: "tonexty",
        fillcolor: "rgba(1.0, 0, 0, 0.2)", // transparent gray
        line: { color: "transparent" },
        // showlegend: false,

      };

      const trace3 = {
        x: data.temporal.years,
        y: p_frag_low, // lower bound
        type: "scatter",
        line: { color: "transparent" },
        // showlegend: false,

      };

      const trace_p_fragile_m0 = {
        x: data.temporal.years,
        y: data.temporal.p_fragile.m0,
        type: "scatter",
        marker: { color: "black" },
        xaxis: "x_pf",
        yaxis: "y_pf",
        // showlegend: false,

      };


      const layout = {
        grid: {
          rows: 2,
          columns: 3,
          // margin: { t: 0 },
          pattern: "independent",
          roworder: "top to bottom",
          // x: { showgrid: false },
          // y: { showgrid: false },
          // xgap: 50,
          // ygap: 0.1
        },

        title: "Trapezoid Subplot Layout",
        height: 600,
        width: 800,
        dragmode: false,
        displayModeBar: false, // Hide modebar (menu options)
        showlegend: false,
        xaxis: {
          domain: [0, 0.33],
          showgrid: false,
          showline: true,
          linecolor: "#000",
          linewidth: 2,
        },
        xaxis2: { domain: [0.33, 0.67] },
        yaxis: {
          domain: [0.5, 1],
          tickformat: ",.0%",
          showgrid: false,
          showline: true,
          linecolor: "#000",
          linewidth: 2,
        },
        yaxis2: { domain: [0, 0.5] },
      };
      layout.annotations = [{
        text: "Title above subplot 1", font: { color: "red" },
        x: 0.165, y: 1.05, xref: "paper", yref: "paper", showarrow: false,
        xanchor: "center",
      }];


      const layout_data = [
        // { ...trace_usage, xaxis: 'x1', yaxis: 'y1' },
        { ...trace_p_fragile_m0, xaxis: "x_pf", yaxis: "y_pf", title: "test" },
        { ...trace3, xaxis: "x_pf", yaxis: "y_pf" },
        { ...trace2, xaxis: "x_pf", yaxis: "y_pf" },
        { ...trace_p_fragile_m1, xaxis: "x_pf", yaxis: "y_pf" },
      ];

      var config = {
        displaylogo: false, // Hide Plotly logo
        displayModeBar: false, // Hide modebar (menu options)
        hovermode: false, // Hide hover text
      };

      Plotly.newPlot(chartDiv, layout_data, layout, config);
    })

    .catch(error => {
      chartDiv.innerHTML = `<p>No data found for "${word}".</p>`;
      chartDiv.innerHTML = `<p>No data found for "${apiUrl}".</p>`;

      console.error(error);
    });
});