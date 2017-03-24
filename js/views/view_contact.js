'use strict';

import Backbone from 'backbone';
import template from '../../templates/template_contact.jade';

export default Backbone.View.extend({

    events: {
        'click .delete': 'remove_contact'
    },

    'tagName': 'tr',
    'className': 'contact',

    initialize() {
        this.template = template;
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render() {
        let json = this.model.toJSON();
        let html = this.template(json);
        this.$el.html(html);
        return this.$el;
    },

    remove_contact() {
        this.model.destroy();
    }
});