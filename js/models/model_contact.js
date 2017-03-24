'use strict';

import Backbone from 'backbone';

export default Backbone.Model.extend({

    defaults: {
        Name: 'Jon',
        LastName: 'Smith',
        Age: 25,
        Phone: 89161234567
    }
});