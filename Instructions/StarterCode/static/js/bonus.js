// Generate the gauge plot
function gaugePlot(sampleID) {
    d3.json("samples.json").then(function (data) {
        let sampleMetadata = data.metadata.filter(i => i.id == sampleID)[0];
        
        // Set the metrics for the gauge plot
        let Gauge = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: sampleMetadata.wfreq,
                title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs Per Week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: { axis: { range: [0, 9] },
                steps: [
                   {range: [0, 1], color: "#FF6347" },
                   { range: [1, 2], color: "#FF7F50" },
                   { range: [2, 3], color: "#FFD700" },
                   { range: [3, 4], color: "#F0E68C" },
                   { range: [4, 5], color: "#9ACD32" },
                   { range: [5, 6], color: "#8FBC8F" },
                   { range: [6, 7], color: "#6B8E23" },
                   { range: [7, 8], color: "#556B2F" },
                   { range: [8, 9], color: "#006400" }
                         
                 ], }
            }
        ];

        let layoutGauge = { width: 480, height: 640, margin: { t: 0, b: 0 } };

        // Invoke the gauge plot creating function
        Plotly.newPlot("gauge", Gauge, layoutGauge);
    });
};

// Populate the plots
function createPlots() {

    d3.json("samples.json").then(function (data) {
        let IDs = data.names[0];
        plotting(IDs);
        demoInfo(IDs);
        gaugePlot(IDs);
        dropdownmenu();
    });
};

createPlots();