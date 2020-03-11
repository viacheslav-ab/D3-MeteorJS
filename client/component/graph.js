import '/both/model.js';
import { icdf_normal } from '/ooc/ooc_module.js';


const stroke_normal = {opacity: 0.2, color: "#032a3d", width: 1};
const stroke_highlight = {opacity: 0.7, color: "#0000FF", width: 3};
const layer_fill_color = "#e6f4e6";
const layer_highlight_color = "#c6d4c6";
const color_in_highlight = "green";
const color_out_highlight = "red";

function draw_icdf_graph(classname, width, height, data = null, histogram = null, layers = null, quants = null) {
    var margin = {top: 20, right: 50, bottom: 30, left: 65},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);
    var y = d3.scale.linear()
        .rangeRound([height, 0]);
    
    var y_label = [0.0000001, 0.00001, 0.001, 0.05, 0.1, 0.25, 0.5, 0.75, 0.9, 0.95, 0.999, 0.99999, 0.9999999]; // original grids
    var y_scaleTicks = icdf_normal(y_label); //transformed grids

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickValues(y_scaleTicks)
        .tickFormat(d3.format(".02f"));

        
    var svg = d3.select(classname)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var g = svg.select("g");
        if (g) {
            g.remove();
        }        
    svg = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if (data) {
        x.domain(d3.extent(data, function(d) { return d.x; })).nice();
    } else {
        x.domain([-10.0, 10.0]).nice();
    }
    y.domain([d3.min(y_scaleTicks), d3.max(y_scaleTicks)]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("font-size", "14px")
        .attr("class", "label")
        .attr("x", width + 35)
        .attr("y", 6)
        .style("text-anchor", "end")
        .text("Wert");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("font-size", "14px")
        .attr("class", "label")
        .attr("transform", "translate(60, -25)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Wahrscheinlichkeit");

    var p = svg.select(".y.axis")
        .selectAll(".tick")
        .select("text")
        .text(function(d, i) { return y_label[i]; });

    if (layers) {
        // draw polyfill
        var lineFunc = d3.svg.line()
            .x(function(d) { return x(d.x); })
            .y(function(d) { return y(d.y); })
            .interpolate("linear-closed");
        
        svg.append("g")
            .attr("class", "polyfill")
            .append("path")
            .datum(layers[0])
            .attr("id", "layer0")
            .attr("d", lineFunc)
            .attr("fill", layer_fill_color)
            .attr("opacity", stroke_normal.opacity)
            .attr("stroke", stroke_normal.color)
            .attr("stroke-width", stroke_normal.width);

        svg.append("g")
            .attr("class", "polyfill")
            .append("path")
            .datum(layers[1])
            .attr("id", "layer1")
            .attr("d", lineFunc)
            .attr("fill", layer_fill_color)
            .attr("opacity", stroke_normal.opacity)
            .attr("stroke", stroke_normal.color)
            .attr("stroke-width", stroke_normal.width);

        svg.append("g")
            .attr("class", "polyfill")
            .append("path")
            .datum(layers[2])
            .attr("id", "layer2")
            .attr("d", lineFunc)
            .attr("fill", layer_fill_color)
            .attr("opacity", stroke_normal.opacity)
            .attr("stroke", stroke_normal.color)
            .attr("stroke-width", stroke_normal.width);

        svg.append("g")
            .attr("class", "polyfill")
            .append("path")
            .datum(layers[3])
            .attr("id", "layer3")
            .attr("d", lineFunc)
            .attr("fill", layer_fill_color)
            .attr("opacity", stroke_normal.opacity)
            .attr("stroke", stroke_normal.color)
            .attr("stroke-width", stroke_normal.width);
    }

    // draw samples
    if (data == null) {
        return;
    }
    svg.append("g")
        .attr("class", "samples")
        .selectAll()
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 2.5)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("id", function(d,i) { return ("sc" + i); })
        .style("fill", "black")
        .attr("barno", function(d,i) {
            if (histogram == null) return -1;
            for (let idx = 0; idx < histogram.length; ++idx) {
                if (d.x >= histogram[idx].min && d.x <= histogram[idx].max) {
                    return idx;
                }
            }
        })
        .attr("belong0", function(d,i) {
            if (quants == null) return 0;
            //if (d.x < quants[0].conf_l[i] || d.x > quants[0].conf_r[i]) {
            if (inside(d, layers[0]) == false) {
                return 0;
            } else {
                return 1;
            }
            i++;
        })
        .attr("belong1", function(d,i) {
            if (quants == null) return 0;
            //if (d.x < quants[1].conf_l[i] || d.x > quants[1].conf_r[i]) {
            if (inside(d, layers[1]) == false) {
                return 0;
            } else {
                return 1;
            }
            i++;
        })
        .attr("belong2", function(d,i) {
            if (quants == null) return 0;
            //if (d.x < quants[2].conf_l[i] || d.x > quants[2].conf_r[i]) {
            if (inside(d, layers[2]) == false) {
                return 0;
            } else {
                return 1;
            }
            i++;
        })
        .attr("belong3", function(d,i) {
            if (quants == null) return 0;
            //if (d.x < quants[3].conf_l[i] || d.x > quants[3].conf_r[i]) {
            if (inside(d, layers[3]) == false) {
                return 0;
            } else {
                return 1;
            }
            i++;
        });
}

function draw_graph() {
    if (Icdf_data.findOne() == undefined || !Icdf_data.findOne().data.length) {
        draw_icdf_graph('.graph', 834, 401);
        return;
    }
    if (Histogram_learndata.findOne() == undefined || !Histogram_learndata.findOne().data.length) {
        draw_icdf_graph('.graph', 834, 401);
        return;
    }

    var data = Icdf_data.findOne().data;
    var histogram = Histogram_learndata.findOne().data;

    if (Layer_data.findOne() == undefined || !Layer_data.findOne().data.length ||
        Quant_data.findOne() == undefined || !Quant_data.findOne().data.length) {
            draw_icdf_graph('.graph', 834, 401, data, histogram);
    } else {
        var layers = Layer_data.findOne().data;
        var quants = Quant_data.findOne().data;
        draw_icdf_graph('.graph', 834, 401, data, histogram, layers, quants);
    }
}

function highlight_graph(layername, layerno, highlight) {
    var layer = d3.select("#" + layername);

    var belong = "belong" + layerno;
    var samples = d3.select(".samples").selectAll("circle");
    if (highlight) {
        layer.attr("opacity", stroke_highlight.opacity)
            .attr("fill", layer_highlight_color)
            .attr("stroke", stroke_highlight.color)
            .attr("stroke-width", stroke_highlight.width);

        d3.select(".samples").selectAll("circle").style("fill", function(d,i) {
            var query = "g.samples > circle#sc" + i;
            var ishigh = $(query).attr(belong);
            if (ishigh == "1") { 
                return color_in_highlight;
            } else {
                return color_out_highlight;
            }
        })
    } else {
        layer.attr("opacity", stroke_normal.opacity)
            .attr("fill", layer_fill_color)
            .attr("stroke", stroke_normal.color)
            .attr("stroke-width", stroke_normal.width);
        samples.style("fill", function(d) { return "black"; })
    }
}

function inside(point, polygon) {
    var x = point.x, y = point.y;
  
    var inside = false;
    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i].x, yi = polygon[i].y;
        var xj = polygon[j].x, yj = polygon[j].y;
  
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
  
    return inside;
};
 
function highlight_graph_sample(id, highlight) {
    if (id) {
        var dot_id = "#" + id;
        var dot = d3.select('.graph').select(dot_id);
        if (highlight) {
            dot.attr("r", 6.5)
               .style("fill", 'red');
        } else {
            dot.attr("r", 2.5)
               .style("fill", 'black');
        }
    }
}

function   highlight_graph_hist_samples(id, highlight) {
    if (id) {
        var barno = id.substring(5);
        var samples = d3.select(".samples").selectAll("circle");
        if (highlight) {
            d3.select(".samples").selectAll("circle").style("fill", function(d,i) {
                var query = "g.samples > circle#sc" + i;
                var no = $(query).attr(id.substring(0,5));
                if (no == barno) { 
                    return color_in_highlight;
                } else {
                    return "black";
                }
            })
        } else {
            samples.style("fill", function(d) { return "black"; })
        }
    }
}

export { draw_graph, highlight_graph, highlight_graph_sample, highlight_graph_hist_samples };