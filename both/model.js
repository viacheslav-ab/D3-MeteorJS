// Learn data
Learn_data = new Mongo.Collection(null);
Learn_data = new Mongo.Collection('learn_data', {connection: null});

function build_learn_data(set, update) {
    var learn_data_id;
    if (Learn_data.find().count() === 0){
        Learn_data.insert({data: set});
        return;
    }
    if (update) {
        var findCollection = Learn_data.find().fetch();
        learn_data_id = findCollection[0]._id;
        Learn_data.update(learn_data_id, {data: set});
    }
}

function isequal_learn_data(set) {
    if (Learn_data.find().count() === 0) {
        return false;
    }
    var learn_data = Learn_data.findOne().data;
    if (learn_data.length == 0) {
        return false;
    }
    if (learn_data.length != set.length) {
        return false;
    }
    for (let i = 0; i < set.length; ++i) {
        if (set[i] != learn_data[i]) {
            return false;
        }
    }
    return true;
}

function remove_learn_data() {
    var findCollection = Learn_data.find().fetch();
    if (findCollection.length == 0) {
        return;
    }
    var learn_data_id = findCollection[0]._id;
    Learn_data.remove(learn_data_id);
}

// Window data
Window_data = new Mongo.Collection(null);
Window_data = new Mongo.Collection('window_data', {connection: null});

function build_window_data(set, update) {
    var window_data_id;
    if (Window_data.find().count() === 0){
        window_data_id = Window_data.insert({data: set});
        return;
    }
    if (update) {
        var findCollection = Window_data.find().fetch();
        window_data_id = findCollection[0]._id;
        Window_data.update(window_data_id, {data: set});
    }
}

function isequal_window_data(set) {
    if (Window_data.find().count() === 0) {
        return false;
    }
    var window_data = Window_data.findOne().data;
    if (window_data.length == 0) {
        return false;
    }
    if (window_data.length != set.length) {
        return false;
    }
    for (let i = 0; i < set.length; ++i) {
        if (set[i] != window_data[i]) {
            return false;
        }
    }
    return true;
}

function remove_window_data() {
    var findCollection = Window_data.find().fetch();
    if (findCollection.length == 0) {
        return;
    }
    var window_data_id = findCollection[0]._id;
    Window_data.remove(window_data_id);
}

// Histogram of learn data
Histogram_learndata = new Mongo.Collection(null);
Histogram_learndata = new Mongo.Collection('histogram_learndata', {connection: null});

function build_histogram_learndata(set, update) {
    var histogram_data_id;
    if (Histogram_learndata.find().count() === 0){
        histogram_data_id = Histogram_learndata.insert({data: set});
        return;
    }
    if (update) {
        var findCollection = Histogram_learndata.find().fetch();
        histogram_data_id = findCollection[0]._id;
        Histogram_learndata.update(histogram_data_id, {data: set});
    }
}

function remove_histogram_learndata() {
    var findCollection = Histogram_learndata.find().fetch();
    if (findCollection.length == 0) {
        return;
    }
    var histogram_data_id = findCollection[0]._id;
    Histogram_learndata.remove(histogram_data_id);
}

// Histogram of window data
Histogram_windowdata = new Mongo.Collection(null);
Histogram_windowdata = new Mongo.Collection('histogram_windowdata', {connection: null});

function build_histogram_windowdata(set, update) {
    var histogram_data_id;
    if (Histogram_windowdata.find().count() === 0){
        histogram_data_id = Histogram_windowdata.insert({data: set});
        return;
    }
    if (update) {
        var findCollection = Histogram_windowdata.find().fetch();
        var histogram_data_id = findCollection[0]._id;
        Histogram_windowdata.update(histogram_data_id, {data: set});
    }
}

function remove_histogram_windowdata() {
    var findCollection = Histogram_windowdata.find().fetch();
    if (findCollection.length == 0) {
        return;
    }
    var histogram_data_id = findCollection[0]._id;
    Histogram_windowdata.remove(histogram_data_id);
}

// Icdf normalized data
Icdf_data = new Mongo.Collection(null);
Icdf_data = new Mongo.Collection('icdf_data', {connection: null});

function build_icdf_data(idata, update) {
    var icdf_data_id;
    if (Icdf_data.find().count() === 0) {
        icdf_data_id = Icdf_data.insert({data: idata});
        return;
    }
    if (update) {
        var findCollection = Icdf_data.find().fetch();
        var icdf_data_id = findCollection[0]._id;
        Icdf_data.update(icdf_data_id, {data: idata});
    }
}

function remove_icdf_data() {
    var findCollection = Icdf_data.find().fetch();
    if (findCollection.length == 0) {
        return;
    }
    var icdf_data_id = findCollection[0]._id;
    Icdf_data.remove(icdf_data_id);
}

// Ooc result data
Ooc_data = new Mongo.Collection(null);
Ooc_data = new Mongo.Collection('ooc_data', {connection: null});

function build_ooc_data(ooc, update) {
    var ooc_data_id;
    if (Ooc_data.find().count() === 0) {
        ooc_data_id = Ooc_data.insert({data: ooc});
        return;
    }
    if (update) {
        var findCollection = Ooc_data.find().fetch();
        var ooc_data_id = findCollection[0]._id;
        Ooc_data.update(ooc_data_id, {data: ooc});
    }
}

function remove_ooc_data() {
    var findCollection = Ooc_data.find().fetch();
    if (findCollection.length == 0) {
        return;
    }
    var ooc_data_id = findCollection[0]._id;
    Ooc_data.remove(ooc_data_id);
}

// Quant intermediate data
Quant_data = new Mongo.Collection(null);
Quant_data = new Mongo.Collection('quant_data', {connection: null});

function build_quant_data(quant, update) {
    var quant_data_id;
    if (Quant_data.find().count() === 0) {
        quant_data_id = Quant_data.insert({data: quant});
        return;
    }
    if (update) {
        var findCollection = Quant_data.find().fetch();
        var quant_data_id = findCollection[0]._id;
        Quant_data.update(quant_data_id, {data: quant});
    }
}

function remove_quant_data() {
    var findCollection = Quant_data.find().fetch();
    if (findCollection.length == 0) {
        return;
    }
    var quant_data_id = findCollection[0]._id;
    Quant_data.remove(quant_data_id);
}

// Layer data (consist of quant.conf_l and quant.conf_r)
Layer_data = new Mongo.Collection(null);
Layer_data = new Mongo.Collection('layer_data', {connection: null});

function build_layer_data(layer, update) {
    var layer_data_id;
    if (Layer_data.find().count() === 0) {
        layer_data_id = Layer_data.insert({data: layer});
        return;
    }
    if (update) {
        var findCollection = Layer_data.find().fetch();
        var layer_data_id = findCollection[0]._id;
        Layer_data.update(layer_data_id, {data: layer});
    }
}

function remove_layer_data() {
    var findCollection = Layer_data.find().fetch();
    if (findCollection.length == 0) {
        return;
    }
    var layer_data_id = findCollection[0]._id;
    Layer_data.remove(layer_data_id);
}

function remove_all_data(removewindow) {
    remove_learn_data();
    if ( removewindow) {
        remove_window_data();
    }
    remove_histogram_learndata();
    remove_icdf_data();
    remove_ooc_data();
    remove_quant_data();
    remove_layer_data();
}

module.exports.build_learn_data     = build_learn_data;
module.exports.build_window_data    = build_window_data;
module.exports.build_histogram_learndata = build_histogram_learndata;
module.exports.build_histogram_windowdata = build_histogram_windowdata;
module.exports.build_ooc_data       = build_ooc_data;
module.exports.build_icdf_data      = build_icdf_data;
module.exports.build_quant_data     = build_quant_data;
module.exports.build_layer_data     = build_layer_data;
module.exports.remove_learn_data    = remove_learn_data;
module.exports.remove_window_data   = remove_window_data;
module.exports.remove_histogram_learndata = remove_histogram_learndata;
module.exports.remove_histogram_windowdata = remove_histogram_windowdata;
module.exports.remove_icdf_data     = remove_icdf_data;
module.exports.remove_ooc_data      = remove_ooc_data;
module.exports.remove_quant_data    = remove_quant_data;
module.exports.remove_layer_data    = remove_layer_data;
module.exports.remove_all_data      = remove_all_data;
module.exports.isequal_learn_data   = isequal_learn_data;
module.exports.isequal_window_data  = isequal_window_data;
