import '/both/model.js';

const back_color = '#C2C2C2';
const fore_color = '#474747';
const back_highlight_color = '#00ff00';
const fore_highlight_color = '#ff0000';

function draw_donut(classname, width, height, progress) {
    var twoPi = 2 * Math.PI;
    var formatPercent = d3.format(".0%");

    var arc = d3.svg.arc()
        .startAngle(0)
        .innerRadius(50)
        .outerRadius(60);

    var svg = d3.select(classname)
        .attr("width", width)
        .attr("height", height);
    
    var g = svg.select("g");
    if (g) {
        g.remove();
    }
    g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var meter = g.append("g")
        .attr("class", "progress-meter");
    
    meter.append("path")
        .attr("id", "background")
        .attr("fill", back_color)
        .attr("d", arc.endAngle(twoPi));
    
    var foreground = meter.append("path")
        .attr("id", "foreground")
        .attr("fill", fore_color);
    foreground.attr("d", arc.endAngle(twoPi * progress));
    
    var text = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em");
    text.text(formatPercent(progress));            
}

function draw_donuts() {
    if (Ooc_data.findOne() == undefined || !Ooc_data.findOne().data.length) {
        draw_donut('.first_donut', 128, 128, 0);
        draw_donut('.second_donut', 128, 128, 0);
        draw_donut('.third_donut', 128, 128, 0);
        draw_donut('.fourth_donut', 128, 128, 0);
    } else {
        var data = Ooc_data.findOne().data;
        draw_donut('.first_donut', 128, 128, data[0]);
        draw_donut('.second_donut', 128, 128, data[1]);
        draw_donut('.third_donut', 128, 128, data[2]);
        draw_donut('.fourth_donut', 128, 128, data[3]);
    }
}

function highlight_donut(classname, highlight) {
    var svg = d3.select("." + classname);
    var foreground = svg.select("#foreground");
    var background = svg.select("#background");

    if (highlight) {
        foreground.attr("fill", fore_highlight_color);
        background.attr("fill", back_highlight_color);
    } else {
        foreground.attr("fill", fore_color);
        background.attr("fill", back_color);
    }
}

export { draw_donuts, highlight_donut };