---
layout: default
permalink: /meganal/
title: Meganalysis
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
    .container {
    max-width: 1200px;
    }
    .page-title {
        text-align: center;
    }
</style>


<style>
    #plot {
        width: 100%;
        height: 500px;
    }
    .hover-text {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.9);
        border: 1px solid #ccc;
        padding: 5px;
        pointer-events: none;
        display: none;
    }
</style>

<style>
    body2 {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: white;
        font-family: Arial, sans-serif;
    }
    
    .container2 {
        text-align: center;
    }

    input2 {
        width: 250px;
        padding: 10px;
        font-size: 18px;
        border: 2px solid black;
        border-radius: 5px;
        outline: none;
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



    .toggle-container_ps {
        display: flex;
        align-items: center;
    }
    
    .switch_ps {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
    }
    
    .switch_ps input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .slider_ps {
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
    
    .slider_ps:before {
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
    
    input:checked + .slider_ps {
        background-color: red;
    }
    
    input:checked + .slider_ps:before {
        transform: translateX(26px);
    }
    
    #toggleLabel_ps {
        margin-left: 5px;
        font-size: 18px;
        color: #333;
        line-height: 33px;
    }
</style>



<div id="word-search" style="width: 1200px; text-align:center;">
    <h1>Search for a Word</h1>
    <div id='hspace1' style="width:1200px; height: 5px;"> </div>
    <div id='hspace1' style="width:1200px; height:5px;"> </div>
    <input type="text" id="word-input" style="width:150px; border: 1px solid black;">
    <button2 id="search-button">Search</button2>
    <button2 id="random-button">Random word</button2>
    <label class="switch_ps">
        <input type="checkbox" id="neuroPsychToggle_ps" checked>
        <span class="slider_ps"></span>
    </label>
    <span id="toggleLabel_ps" style="color:red;">Psych</span>
    <div id='hspace0' style="width:1200px; height:25px;"> </div>
    <div id='sentence0' style="width:1200px; height:155px;font-size: 19px;">Enter a word above and figures will appear that illustrate trends among the psych/neuro papers containing said word.<br>These figures are based on a dataset of ~250k empirical psychology papers published from 2004-2024.<br>This webpage was prepared alongside the manuscript <a href="../assets/pdf/Bogdan_2025_PsyChange_Manuscript_SuppMat.pdf">"One Decade Into the Replication Crisis, How Have Psychological Results Changed?"</a> (Bogdan, <i>in press</i>; <i>Adv. Meth. Pract. Psychol. Sci.</i>), although the manuscript did not cover neuroscience.</div>
    <div id='hspace1' style="width:1200px; height: 20px;"> </div>
    <div id="chart00" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <div id="chart02" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <div id="chart03" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <br>
    <div id='hspace2' style="width:1200px; height:100px;"> </div>
    <br>
    <div id='hspace3' style="width:1200px; height:165px;"> </div>
    <div id='sentence1' style="width:1200px; height:90px;font-size: 19px;"></div>
    <br>
    <div id="chart10" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <div id="chart11" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <div id="chart12" style="width: 400px; height: 300px; display: block; float: left;"></div>
    <br>
    <div id='hspace4' style="width:1200px; height:100px;"> </div>
    <br>
    <div id='hspace5' style="width:1200px; height:165px;"> </div>
    <div id='sentence2' style="width:1200px; height:90px;font-size: 19px;"></div>
</div>

<script>
const wordInput = document.getElementById("word-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
</script>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="../assets/js/word-search.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const toggle_ps = document.getElementById('neuroPsychToggle_ps');
    const label_ps = document.getElementById('toggleLabel_ps');

    // Set default state to "Psych"
    toggle_ps.checked = true;
    label_ps.textContent = 'Psych';

    // Add event listener to update the label and background color
    toggle_ps.addEventListener('change', function() {
        if (toggle_ps.checked) {
            label_ps.textContent = 'Psych';
            label_ps.style.color = 'red'; // Default text color
        } else {
            label_ps.textContent = 'Neuro';
            label_ps.style.color = '#0090ff'; // Red text color for "Neuro"
        }
    });
});
</script>