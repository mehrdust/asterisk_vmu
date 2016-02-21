Ext.define('VRU.controller.Recordings', {
    extend: 'Ext.app.Controller',

    views: [
        'cards.Recordings',
        'window.RecordSearch',
        'cards.RecordSearchPanel',
        'Viewport'
    ],

    models: [
        'Recording',
        'Agent',
        'Queue'
    ],

    stores: [
        'Recordings',
        'Agents',
        'Queues'
    ],

    init: function () {
        this.control({
            'viewport': {
                beforerender: this.BeforeAppLoad
            },
            'ccrecordings button[action=btnSearchRecord]': {
                click: this.openSearchGuest
            },
            'ccrecordings button[action=btnSearchRecordReset]': {
                click: this.resetSearchGuest
            },
            'recordingsearch textfield': {
                change: this.searchRecordingWin
            },
            'searchpanel textfield': {
                change: this.searchRecording
            },
            'searchpanel grid': {
                selectionchange: this.searchRecording
            },
        });
    },

    BeforeAppLoad: function (vp) {
        var utils = VRU.ux.SessionHandler;
        isActive = utils.session_verify();
    },
/*
 * This function is called to open the Search Recordings Window
 * Name: openSearchGuest
 */
    openSearchGuest: function () {
        Ext.widget('recordingsearch').show();
    },
/*
 * This function is called when the reset search button is clicked
 * Name: resetSearchGuest
 */
    resetSearchGuest: function () {
        Ext.StoreManager.get('Recordings').getProxy().extraParams = {};
        Ext.StoreManager.get('Recordings').load();
    },
/*
 * This function will be called when any text field is being changed in the 
 * "search for recording" window and refines the search
 * Name: searchRecordingWin
 */
    searchRecordingWin: function () {

        var uniqueid = Ext.ComponentQuery.query('recordingsearch textfield[name=uniqueid]')[0].getValue(),
            clid = Ext.ComponentQuery.query('recordingsearch textfield[name=clid]')[0].getValue(),
            from_date = Ext.ComponentQuery.query('recordingsearch textfield[name=from_date]')[0].getValue(),
            from_time = Ext.ComponentQuery.query('recordingsearch textfield[name=from_time]')[0].getValue(),
            to_date = Ext.ComponentQuery.query('recordingsearch textfield[name=to_date]')[0].getValue(),
            to_time = Ext.ComponentQuery.query('recordingsearch textfield[name=to_time]')[0].getValue(),
            agent_sel = Ext.ComponentQuery.query('recordingsearch grid')[0].getSelectionModel().getSelection(),
            queue_sel = Ext.ComponentQuery.query('recordingsearch grid')[1].getSelectionModel().getSelection(),
            agents = "(",
            queues = "(";

        Ext.Array.each(agent_sel, function (v, k) {
            agents += "'" + v.get('extension') + "',";
        });
        agents = agents.replace(/,$/, "") + ")";

        Ext.Array.each(queue_sel, function (v, k) {
            queues += "'" + v.get('queue') + "',";
        });
        queues = queues.replace(/,$/, "") + ")";


        Ext.StoreManager.get('Recordings').getProxy().extraParams = {
            clid : clid,
            from_date_time : from_date,
            from_time : from_time,
            to_date : to_date,
            to_time : to_time,
            agents : agents,
            queues : queues
        };
        Ext.StoreManager.get('Recordings').load();
    },
/*
 * This function will be called when any text field is being changed in the 
 * "search for recording" panel and refines the search
 * Name: searchRecording
 */
    searchRecording: function () {

        var uniqueid = Ext.ComponentQuery.query('searchpanel textfield[name=uniqueid]')[0].getValue(),
            incidentid = Ext.ComponentQuery.query('searchpanel textfield[name=incidentid]')[0].getValue(),
            clid = Ext.ComponentQuery.query('searchpanel textfield[name=clid]')[0].getValue(),
            from_date = Ext.ComponentQuery.query('searchpanel textfield[name=from_date]')[0].getValue(),
            from_time = Ext.ComponentQuery.query('searchpanel textfield[name=from_time]')[0].getValue(),
            to_date = Ext.ComponentQuery.query('searchpanel textfield[name=to_date]')[0].getValue(),
            to_time = Ext.ComponentQuery.query('searchpanel textfield[name=to_time]')[0].getValue(),
            agent_sel = Ext.ComponentQuery.query('searchpanel grid')[0].getSelectionModel().getSelection(),
            queue_sel = Ext.ComponentQuery.query('searchpanel grid')[1].getSelectionModel().getSelection(),
            agents = "(",
            queues = "(";

        Ext.Array.each(agent_sel, function (v, k) {
            agents += "'" + v.get('extension') + "',";
        });
        agents = agents.replace(/,$/, "") + ")";

        Ext.Array.each(queue_sel, function (v, k) {
            queues += "'" + v.get('queue') + "',";
        });
        queues = queues.replace(/,$/, "") + ")";


        Ext.StoreManager.get('Recordings').getProxy().extraParams = {
            uniqueid: uniqueid,
            incidentid: incidentid,
            clid : clid,
            from_date_time : from_date,
            from_time : from_time,
            to_date : to_date,
            to_time : to_time,
            agents : agents,
            queues : queues
        };
        Ext.StoreManager.get('Recordings').load();
    }
});