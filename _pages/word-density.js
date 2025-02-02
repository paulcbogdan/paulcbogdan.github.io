


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
// Sample data
      const x = [];
      for (let i = 0; i < 500; i++) {
        x.push(Math.random() * 10);
      }

// Create the density plot
      const trace = {
        x: x,
        type: "histogram",
        histnorm: "probability density",
        opacity: 0.7,
        marker: {
          color: "blue",
        },
      };

      const layout = {
        title: "Interactive Density Plot",
        xaxis: { title: "Value" },
        yaxis: { title: "Density" },
      };

      Plotly.newPlot("plot", [trace], layout);


      const hoverText = document.getElementById("hover-text");

// Function to determine the word based on x position
      function getWordFromX(x) {
        if (x < 3) return "Low";
        else if (x >= 3 && x < 7) return "Medium";
        else return "High";
      }

// Add hover event listener
      document.getElementById("plot").on("plotly_hover", function(event) {
        const xVal = event.points[0].x;
        const word = getWordFromX(xVal);

        // Get mouse position
        const mouseX = event.event.clientX;
        const mouseY = event.event.clientY;
        console.log(mouseX, mouseY);

        // Update hover text
        hoverText.style.display = "block";
        hoverText.style.left = `${mouseX + 10}px`;
        hoverText.style.top = `${mouseY + 10}px`;
        hoverText.textContent = word;
      });

// Hide hover text when not hovering
      document.getElementById("plot").on("plotly_unhover", function() {
        hoverText.style.display = "none";
      });

    });

  // .catch(error => {
  //   chartDiv.innerHTML = `<p>No data found for "${word}".</p>`;
  //   chartDiv.innerHTML = `<p>No data found for "${apiUrl}".</p>`;
  //
  //   console.error(error);
  // });
});