import { dualPivotSort, icdf_normal, linspace, set2conf, conf2ooc } from './ooc_module.js';
import { testset } from './testset.js';
import { build_learn_data, build_window_data, build_ooc_data, build_icdf_data, build_quant_data, build_layer_data } from '/both/model.js';

function ready_data(fromtest = true) {
    // build learn set
    var set_0;
    if (fromtest) {
        set_0 = new Array(100);
        for (let i = 0; i < 100; ++i) {
            set_0[i] = testset[i][0];
        }
        build_learn_data(set_0, false);
    } else {
        if (Learn_data.findOne() == undefined || !Learn_data.findOne().data.length) {
            return [null, null, null];
        } else {
            set_0 = Learn_data.findOne().data;
        }
    }

    // build initial obersvation window data
    var set_1;
    if (fromtest) {
        var set_1 = new Array(100);
        for (let i = 0; i < 100; ++i) {
            set_1[i] = testset[i][1];
        }
        build_window_data(set_1, false);
    } else {
        if (Window_data.findOne() == undefined || !Window_data.findOne().data.length) {
            set_1 = null;
        } else {
            set_1 = Window_data.findOne().data;
        }
    }

    // 1) prepare original data
    var x_data = dualPivotSort(set_0.slice());
    //var x_data = set_0;
    var y_data = linspace(0.5 / x_data.length, 1.0 - 0.5 / x_data.length, x_data.length);

    // 2) transform y-data
    var y_data_transformed = icdf_normal(y_data);

    var data = new Array(x_data.length);
    for (let i = 0; i < x_data.length; ++i) {
        data[i] = {x: x_data[i], y: y_data_transformed[i]};
        //data[i] = {x: x_data[i], y: y_data[i]};
    }
    build_icdf_data(data, true);

    return [set_0, set_1, data];
}

function calc_ooc(set_0, set_1) {
    var y_data = linspace(0.5 / set_1.length, 1.0 - 0.5 / set_1.length, set_1.length);
    var y_data_transformed = icdf_normal(y_data);

    var quants1 = set2conf(set_0.slice(), set_1.length, 500, 0.90);
    var result1 = conf2ooc(quants1, set_1.slice());

    var quants = new Array();
    var layers = new Array();
    var x_data = new Array();
    for (let i = 0; i < set_1.length; ++i) {
        x_data.push({x: quants1.conf_l[i], y: y_data_transformed[i]});
    }    
    for (let i = set_1.length - 1; i >= 0; --i) {
        x_data.push({x: quants1.conf_r[i], y:y_data_transformed[i]});
    }
    layers.push(x_data);
    quants.push(quants1);

    var quants2 = set2conf(set_0.slice(), set_1.length, 1000, 0.95);
    var result2 = conf2ooc(quants2, set_1.slice());

    x_data = [];
    for (let i = 0; i < set_1.length; ++i) {
        x_data.push({x: quants2.conf_l[i], y: y_data_transformed[i]});
    }    
    for (let i = set_1.length - 1; i >= 0; --i) {
        x_data.push({x: quants2.conf_r[i], y:y_data_transformed[i]});
    }
    layers.push(x_data);
    quants.push(quants2);

    var quants3 = set2conf(set_0.slice(), set_1.length, 2000, 0.90);
    var result3 = conf2ooc(quants3, set_1.slice());

    x_data = [];
    for (let i = 0; i < set_1.length; ++i) {
        x_data.push({x: quants3.conf_l[i], y: y_data_transformed[i]});
    }    
    for (let i = set_1.length - 1; i >= 0; --i) {
        x_data.push({x: quants3.conf_r[i], y:y_data_transformed[i]});
    }
    layers.push(x_data);
    quants.push(quants3);

    var quants4 = set2conf(set_0.slice(), set_1.length, 4000, 0.95);
    var result4 = conf2ooc(quants4, set_1.slice());

    x_data = [];
    for (let i = 0; i < set_1.length; ++i) {
        x_data.push({x: quants4.conf_l[i], y: y_data_transformed[i]});
    }    
    for (let i = set_1.length - 1; i >= 0; --i) {
        x_data.push({x: quants4.conf_r[i], y:y_data_transformed[i]});
    }
    layers.push(x_data);
    quants.push(quants4);

    build_layer_data(layers, true);
    build_quant_data(quants, true);

    var ooc_data = Array(4);
    ooc_data[0] = result1.ooc;
    ooc_data[1] = result2.ooc;
    ooc_data[2] = result3.ooc;
    ooc_data[3] = result4.ooc;
    build_ooc_data(ooc_data, true);
}

export { ready_data, calc_ooc };