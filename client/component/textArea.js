import '/both/model.js';

function display_learn_data(data) {
    $('#reference').val('');
    
    var values = '';
    for (let i = 0; i < data.length; ++i) {
        values = values + data[i] + "\n";
    }

    $('#reference').val(values);
}

function display_window_data(data) {
    $('#test').val('');
    
    var values = '';
    for (let i = 0; i < data.length; ++i) {
        values = values + data[i] + "\n";
    }

    $('#test').val(values);
}


function display_input_data() {
    // get learn data
    var learn_data = Learn_data.findOne().data;
    if (!learn_data.length) return;
    display_learn_data(learn_data);

    var window_data = Window_data.findOne().data;
    if (!window_data) return;
    display_window_data(window_data);
}


export { display_input_data };