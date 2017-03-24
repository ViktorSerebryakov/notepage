'use strict';

import Backbone from 'backbone';
import Model from '../models/model_contact.js';

export default Backbone.Collection.extend({
    model: Model,
    url: '/api/'
});
