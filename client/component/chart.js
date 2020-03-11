import '/both/model.js';
import { build_histogram_learndata } from '../../both/model';

const highlight_color = "#FF0000";
const learn_color = "#333333";
const window_color = "#00c6ff";

function draw_histogram(classname, width, height, barcolor = "", data = null) {
    var margin = {top: 0, right: 0, bottom: 20, left: 36};
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;
  
    var x = d3.scale.ordinal();
    var y = d3.scale.linear();
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickSize(6, 0).tickFormat(d3.format(".02f"));

    var histogram;
    var bins;
    if (data) {
        // Compute the histogram
        histogram = d3.layout.histogram()
        bins = histogram(data);

        // Update the x-scale
        x.domain(bins.map(function(d) { return d.x; }))
        .rangeRoundBands([0, width], 0.1);
        // Update the y-scale
        y.domain([0, d3.max(bins, function(d) { return d.y; })])
        .range([height, 0]);
    } else {
        x.domain([0, width]).range([0, width]);
        y.domain([height, 0]).range([height, 0]);
    }
 
    // Select the svg element
    var svg = d3.select(classname).data([bins]);
    var g = svg.select("g");
    if (g) {
        g.remove();
    }        
    var gEnter = svg.append("g");
    gEnter.append("g").attr("class", "histogram");
    gEnter.append("g").attr("class", "x axis");

    // Update the outer dimensions
    svg.attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom);
    
    // Update the inner dimensions
    var g = svg.select("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Update the x-axis
    g.select(".x.axis")
     .attr("transform", "translate(0," + y.range()[0] + ")")
     .call(xAxis);

    if (data == null) {
        return;
    }

    // Update the bars
    svg.select("." + "histogram")
        .selectAll(".bar")
        .data(bins)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", x.rangeBand())
        .attr("height", function(d) { return y.range()[0] - y(d.y); })
        .attr("id", function(d,i) { return ("barno" + i); })
        .style("fill", barcolor)
        .order();

    return bins;
}

function draw_histograms() {
    if (Learn_data.findOne() == undefined || !Learn_data.findOne().data.length) {
        draw_histogram('.left_barchart', 400, 346);
    } else {
        var learn_data = Learn_data.findOne().data;
        var histogram = draw_histogram('.left_barchart', 400, 346, learn_color, learn_data);
        var histogram_data = Array(histogram.length);
        for (let i = 0; i < histogram.length; ++i) {
            histogram_data[i] = {min: Math.min(...histogram[i]), max: Math.max(...histogram[i])};
        }
        build_histogram_learndata(histogram_data, true);
    }

    if (Window_data.findOne() == undefined || !Window_data.findOne().data.length) {
        draw_histogram('.right_barchart', 400, 346);
    } else {
        var window_data = Window_data.findOne().data;
        draw_histogram('.right_barchart', 400, 346, window_color, window_data);
    }
}

function highlight_histogram(id, highlight) {
    if (id) {
        var strid = '#' + id;
        var bar = d3.select(strid);
        if (highlight) {
            bar.style("fill", highlight_color);
        } else {
            bar.style("fill", learn_color);
        }
    }
}

export { draw_histograms, highlight_histogram };
