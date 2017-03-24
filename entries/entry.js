'use strict';

import Form from '../js/views/view_form.js'
import '../styles/style_form.styl'
function ready() {
    new Form({
        el: '.wrapper'
    });
}

document.addEventListener('DOMContentLoaded', ready);