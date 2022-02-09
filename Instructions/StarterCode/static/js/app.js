// Create plotting functon
function plotting(sampleID) {
    d3.json("samples.json").then(function (data) {

        // filter the data
        let Data = data.samples.filter(i=> i.id == sampleID)[0];

        //metrics for the bar plot
        let trace1 = {
            x: Data.sample_values.slice(0,10).reverse(),
            y: Data.otu_ids.slice(0,10).map(otu_id => `OTU #${otu_id}`).reverse(),
            text: Data.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
            
        };

        let layoutBar = {
            title:"<b>Top 10 OTUs Individuals</b>",
            xaxis: {title: 'Number of Samples Collected'},
            width: 480, height: 640
        };

        // Use plotly for the bar plot
        Plotly.newPlot("bar", [trace1], layoutBar);

        // metrics for the bubble plot
        let trace2 = {
            x: Data.otu_ids,
            y: Data.sample_values,
            mode: "markers",
            marker: {
                size: Data.sample_values,
                color: Data.otu_ids
            },
            text: Data.otu_labels,
        };

        let layoutBubble = { 
            title: '<b>Bubble Chart For Each Sample</b>',
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Number of Samples Collected'},
            height: 700,
            width: 1200
    };

        // Use plotly to plot bubble chart
        Plotly.newPlot("bubble", [trace2], layoutBubble);

    });
};

// Create the demographic information
function demoInfo(sampleID) {

    let boxData = d3.select("#sample-metadata");
    d3.json("samples.json").then(function (data) {
        let boxData = data.metadata.filter(x => x.id == sampleID)[0];
        d3.select("#sample-metadata").html("");
        Object.entries(boxData).forEach(element => {
            d3.select("#sample-metadata").append("h6").text(`${element[0]}: ${element[1]}`)
        });
    
    });
    }

// function for changing sampleID   
function optionChanged(sampleID) {
    plotting(sampleID);
    demoInfo(sampleID);
    gaugeplot(sampleID)
};

function dropdownmenu() {

    let dropdown = d3.select("#selDataset");
    d3.json("samples.json").then(function (data) {
        let IDs = data.names;
        IDs.forEach(ID => {
            dropdown.append("option").text(ID).property("value", ID)
  
        });
    });
  };


