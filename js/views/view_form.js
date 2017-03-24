'use strict';

import Backbone from 'backbone';
import Coll from '../collections/collection.js';
import template from '../../templates/template_form.jade';
import Contact from './view_contact.js';

export default Backbone.View.extend({

    events: {
        'click .buttonAdd': 'addObj',
        'click .sort': 'sort'
    },

    initialize() {
        this.coll = new Coll();
        this.coll.fetch();
        this.template = template;
        this.listenTo(this.coll, 'add', this.renderContact);
        this.render();
    },

    render() {
        let html = this.template();
        this.$el.html(html);
        this.coll.each(model => this.renderContact(model));
    },

    addObj() {
        this.coll.add({});
    },

    renderContact(model) {
        if ( model.isNew() ) {
            model.set({
                Name: this.$el.find('#addName').val(),
                LastName: this.$el.find('#addLastName').val(),
                Age: this.$el.find('#addAge').val(),
                Phone: this.$el.find('#addPhone').val()
            });
            model.save();
            let contact = new Contact({
                model: model
            });
            this.$el.find('.List').append(contact.render());
            this.$el.find('#addName').val('');
            this.$el.find('#addLastName').val('');
            this.$el.find('#addAge').val('');
            this.$el.find('#addPhone').val('');
        } else {
            let contact = new Contact({
                model: model
            });
            this.$el.find('.List').append(contact.render());
        }
    },

    sort( event ) {
        let target = event.target;

        switch (target.className) {
            case 'SortAge':
                this.coll.comparator = function(model) {
                    return parseInt(model.get('Age'));
                };
                break;
            case 'SortPhone':
                this.coll.comparator = function (model) {
                    return model.get('Phone');
                };
                break;
            case 'SortName':
                this.coll.comparator = function (model) {
                    return model.get('Name');
                };
                break;
            case 'SortLastName':
                this.coll.comparator = function (model) {
                    return model.get('LastName');
                };
                break;
        }
        this.coll.sort();
        this.$el.find('.List').html('');
        this.coll.each(model => {
            let contact = new Contact({
                model: model
            });
            this.$el.find('.List').append(contact.render());
        });
    }
});
