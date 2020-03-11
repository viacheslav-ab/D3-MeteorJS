import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { build_learn_data, build_window_data, 
          remove_learn_data, remove_icdf_data, remove_histogram_learndata, remove_window_data, 
          remove_ooc_data, remove_quant_data, remove_layer_data, remove_all_data,
          isequal_learn_data, isequal_window_data } from '/both/model.js';
import { display_input_data } from './component/textArea.js';
import { draw_scatters, highlight_scatter_sample } from './component/scatter.js';
import { draw_histograms, highlight_histogram } from './component/chart.js';
import { draw_donuts, highlight_donut } from './component/donut.js';
import { draw_graph, highlight_graph, highlight_graph_sample, highlight_graph_hist_samples } from './component/graph.js';
import { ready_data, calc_ooc } from '/ooc/ooc_test.js';
import { parseText} from '/ooc/parse_num_array.js'

import './main.html';
import './component/textArea.html';
import './component/chart.html';
import './component/donut.html';
import './component/graph.html';

var chartflag = false;

Template.textArea.onCreated(function textAreaOncreate(){

});

Template.textArea.rendered = function() {
  prepare_init_data();
  display_input_data();
}

function update_export_btn() {
  if(strTextarea.replace(/\n/g, '') !== "") {
    $('#exportButton').removeClass('hidden_css');
    // return;
  }
  if(!$('#reference').val()) {
    $('#exportButton').addClass('hidden_css');
  }
}

Template.textArea.events({
  'input #reference': function (event) {
    var strText = $('#reference').val();

    var set_0 = parseText(strText);
    if (set_0 == -1) {
      remove_all_data(false);
      draw_result();
      alert("Führen Sie nur die Zahlen!");
      return;
    }
    if (set_0 == null) {
      remove_all_data(false);
      draw_result();
      alert("There is no valid reference data!");
      return;
    }
    // update_export_btn();

    if (isequal_learn_data(set_0)) {
      return;
    }

    build_learn_data(set_0, true);
    calculate_data();
    draw_result();
  },

  'input #test': function (event) {
    var strText = $('#test').val();

    var set_1 = parseText(strText);
    if (set_1 == -1) {
      remove_window_data();
      draw_result();
      alert("Führen Sie nur die Zahlen!");
      return;
    }
    if (set_1 == null) {
      remove_window_data();
      draw_result();
      alert("There is no valid test data!");
      return;
    }
    // update_export_btn();

    if (isequal_window_data(set_1)) {
      return;
    }

    build_window_data(set_1, true);
    calculate_data();
    draw_result();
  }
});

Template.chart.onCreated(function chartOncreate() {
});

Template.chart.rendered = function() {
  // draw scatter using initial value
  draw_scatters();
  // draw histogram using initial value
  draw_histograms();
}

Template.chart.events({
  'click a': function () {
    if(chartflag) {
      $("#scatterArea").removeClass("hidden_css");
      $("#histogramArea").addClass("hidden_css");
      $("#darstellungalsHist").removeClass("hidden_css");
      $("#darstellungalsPunk").addClass("hidden_css");
    }
    else {
      $("#histogramArea").removeClass("hidden_css");
      $("#scatterArea").addClass("hidden_css");
      $("#darstellungalsHist").addClass("hidden_css");
      $("#darstellungalsPunk").removeClass("hidden_css");
    }
    chartflag = !chartflag;
  },
  'mouseover .left_dotchart': function(event) {
    var idname = event.target.id;
    highlight_sample(idname, true);
  },
  'mouseout .left_dotchart': function(event) {
    var idname = event.target.id;
    highlight_sample(idname, false);
  },
  'mouseover .left_barchart': function(event) {
    var idname = event.target.id;
    highlight_histogram_samples(idname, true);
  },
  'mouseout .left_barchart': function(event) {
    var idname = event.target.id;
    highlight_histogram_samples(idname, false);
  }
});

Template.donut.rendered = function() {
  // draw donuts using initial value
  draw_donuts();
}

Template.donut.events({
  'mouseover svg': function(event) {
    var classname = event.target.className.baseVal;
    highlight_result(classname, true);
  },
  'mousemove svg': function(event) {
    var classname = event.target.className.baseVal;
    highlight_result(classname, true);
  },
  'mouseout svg': function(event) {
    var classname = event.target.className.baseVal;
    highlight_result(classname, false);
  }
});

Template.graph.rendered = function() {
  // draw graph using initial value
  draw_graph();
}

Template.graph.events({
  'mouseover .polyfill': function(event) {
    var layerid = event.target.id;
    highlight_result(layerid, true);
  },
  'mouseout .polyfill': function(event) {
    var layerid = event.target.id;
    highlight_result(layerid, false);
  },
  'mouseover circle': function(event) {
    var sampleid = event.target.id;
     highlight_sample(sampleid, true);
  },
  'mouseout circle': function(event) {
    var sampleid = event.target.id;
     highlight_sample(sampleid, false);
  }
});

function prepare_init_data() {
  // prepare initial value
  var set_0;
  var set_1;
  var icdf_data;
  [set_0, set_1, icdf_data] = ready_data(true);

  // calculate ooc using initial value
  calc_ooc(set_0, set_1);
}

function calculate_data() {
  var set_0;
  var set_1;
  var icdf_data;
  [set_0, set_1, icdf_data] = ready_data(false);
  if (set_0 == null) {
    alert("Es gibt keine referenz daten!");
    remove_learn_data();
    remove_histogram_learndata();
    remove_icdf_data();
    remove_ooc_data();
    remove_quant_data();
    remove_layer_data();
    return;
  }
  remove_ooc_data();
  remove_quant_data();
  remove_layer_data();

  if (set_1 == null) {
    //alert("Es gibt keine prufe daten!");
    remove_window_data();
    return;
  }

  calc_ooc(set_0, set_1);
}

function draw_result() {
  // draw scatter using initial value
  draw_scatters();
  // draw histogram using initial value
  draw_histograms();
  // draw donuts using initial value
  draw_donuts();
  // draw graph using initial value
  draw_graph();
}

function highlight_result(classname, highlight) {
  if (classname == 'first_donut' || classname == 'layer0') {
    highlight_donut('first_donut', highlight);
    highlight_graph('layer0', 0, highlight);
    return;
  }
  if (classname == 'second_donut' || classname == 'layer1') {
    highlight_donut('second_donut', highlight);
    highlight_graph('layer1', 1, highlight);
    return;
  }
  if (classname == 'third_donut' || classname == 'layer2') {
    highlight_donut('third_donut', highlight);
    highlight_graph('layer2', 2, highlight);
    return;
  }
  if (classname == 'fourth_donut' || classname == 'layer3') {
    highlight_donut('fourth_donut', highlight);
    highlight_graph('layer3', 3, highlight);
    return;
  }
}

function highlight_sample(id, highlight) {
  highlight_scatter_sample(id, highlight);
  highlight_graph_sample(id, highlight);
}

function highlight_histogram_samples(id, highlight) {
  highlight_histogram(id, highlight);
  highlight_graph_hist_samples(id, highlight);
}