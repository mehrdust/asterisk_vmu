Ext.define('VRU.controller.Recordings', {
    extend: 'Ext.app.Controller',

    views: [
        'cards.Recordings'
    ],

    models: [
        'Recording'
    ],

    stores: [
        'Recordings'
    ],

    init: function () {
        this.control({

        });
    }

});