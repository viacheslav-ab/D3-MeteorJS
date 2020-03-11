import '/both/model.js';

function draw_scatter(classname, width, height, color, data = null) {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);
    var y = d3.scale.linear()
        .range([height, 0]);
    
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
        // .tickSize([6])
        // .tickFormat(d3.time.format(""));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
        // .tickSize([6])
        // .tickFormat(d3.time.format(""));

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
        y.domain(d3.extent(data, function(d) { return d.y; })).nice();
    } else {
        x.domain([0, width]).nice();
        y.domain([-10.0, 10.0]).nice();
    }
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("");

    if (data == null) {
        return;
    }
    svg.append("g")
        .selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 2.5)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("id", function(d,i) { return ("sc" + i); })
        .style("fill", color);
}

function draw_scatters() {
    if (Learn_data.findOne() == undefined || !Learn_data.findOne().data.length) {
        draw_scatter('.left_dotchart', 400, 346, 'black');
    } else {
        var learn_data = Learn_data.findOne().data;
        var l_data = new Array(learn_data.length);
        for (let i = 0; i < learn_data.length; ++i) {
            l_data[i] = {x: i, y: learn_data[i]};
        }
        draw_scatter('.left_dotchart', 400, 346, 'black', l_data);
    }

    if (Window_data.findOne() == undefined || !Window_data.findOne().data.length) {
        draw_scatter('.right_dotchart', 400, 346, 'blue');
    } else {
        var window_data = Window_data.findOne().data;
        var w_data = new Array(window_data.length);
        for (let i = 0; i < window_data.length; ++i) {
            w_data[i] = {x: i, y: window_data[i]};
        }
        draw_scatter('.right_dotchart', 400, 346, 'blue', w_data);
    }
}

function highlight_scatter_sample(id, highlight) {
    if (id) {
        var dot_id = "#" + id;
        var dot = d3.select(dot_id);
        if (highlight) {
            dot.style("fill", 'red')
                .attr("r", 6.5)
        } else {
            dot.style("fill", 'black')
                .attr("r", 2.5);

        }
    }
}

export { draw_scatters, highlight_scatter_sample };