---
layout: default
permalink: /meganal2/
title: Meganalysis2
description: test test
nav: true
nav_order: 5
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3 # The number of links after the current page
---

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .search-section {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
  }

  #word-input {
    width: 150px;
    padding: 0.5rem;
    border: 1px solid black;
  }

    .buttons2 {
        margin-top: 15px;
    }
    
    button2 {
        background: black;
        color: white;
        padding: 5px 10px;
        font-size: 16px;
        margin: 5px;
        cursor: pointer;
        border-radius: 5px;
        transition: 0.3s;
        border: 2px solid black;
        box-sizing: border-box; /* Ensures the size stays the same */
    }
    
    button2:hover {
        background: white;
        color: black;
        border: 2px solid black;
    }

  .toggle-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #0090ff;
    transition: 0.4s;
    border-radius: 23px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: red;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .description {
    text-align: center;
    margin: 2rem 0;
    font-size: 1.2rem;
    line-height: 1.6;
  }

  .charts-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    margin-bottom: 3rem;
  }

  .chart {
    width: 100%;
    max-width: 400px;
    height: 300px;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0.5rem;
    }

    .search-section {
      flex-direction: column;
      gap: 0.75rem;
    }

    .description {
      font-size: 1rem;
      padding: 0 1rem;
    }

    .chart {
      height: 250px;
    }
  }
</style>


<div class="container">
<div class="header">
  <h1>Search for a Word</h1>
</div>

<div class="search-section">
  <input type="text" id="word-input">
  <button2 id="search-button">Search</button2>
  <button2 id="random-button">Random word</button2>
  <div class="toggle-container">
    <label class="switch">
      <input type="checkbox" id="neuroPsychToggle_ps" checked>
      <span class="slider"></span>
    </label>
    <span id="toggleLabel_ps" style="color:red;">Psych</span>

  </div>
</div>

<div id="sentence0" class="description">
  Enter a word above and figures will appear that illustrate trends among the psych/neuro papers containing said word.<br>
  These figures are based on a dataset of ~250k empirical psychology papers published from 2004-2024.<br>
  This webpage was prepared alongside the manuscript <a href="../assets/pdf/Bogdan_2025_PsyChange_Manuscript_SuppMat.pdf">"One Decade Into the Replication Crisis, How Have Psychological Results Changed?"</a> (Bogdan, <i>in press</i>; <i>Adv. Meth. Pract. Psychol. Sci.</i>), although the manuscript did not cover neuroscience.
</div>

<div class="charts-container">
  <div id="chart00" class="chart" style="width: 400px; height: 300px;"></div>
  <div id="chart02" class="chart" style="width: 400px; height: 300px;"></div>
  <div id="chart03" class="chart" style="width: 400px; height: 300px;"></div>
</div>

<div id="sentence1" class="description"></div>

<div class="charts-container">
  <div id="chart10" class="chart"></div>
  <div id="chart11" class="chart"></div>
  <div id="chart12" class="chart"></div>
</div>

<div id="sentence2" class="description"></div>
</div>

<script>
const wordInput = document.getElementById("word-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
</script>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="../assets/js/word-search.js"></script>
<script src="../assets/js/url_arg_handling.js"></script>

