Ext.define('VRU.view.CenterPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.centerpanel',
    id: 'placeHolder',
    layout: 'card',
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'ccrecordings',
            id: 'card-A1',
//            flex: 2,
            autoScroll: true,
            collapsed: false
        },
//        {
//            xtype: 'addguests',
//            id: 'card-B2',
////            flex: 2,
//            autoScroll: true,
//            collapsed: false
//        }, {
//            xtype: 'addreservation',
//            id: 'card-C1',
//            autoScroll: true,
//            collapsed: false
//        }, {
//            xtype: 'viewreservations',
//            id: 'card-C2',
//            autoScroll: true,
//            collapsed: false
//        }, {
//            xtype: 'checkin',
//            id: 'card-C3',
//            autoScroll: true,
//            collapsed: false
//        }, {
//            xtype: 'managerooms',
//            id: 'card-E1',
//            autoScroll: true,
//            collapsed: false
//        }, {
//            xtype: 'managestaff',
//            id: 'card-E2',
//            autoScroll: true,
//            collapsed: false
//        }, {
//            xtype: 'manageusers',
//            id: 'card-E3-1',
//            autoScroll: true,
//            collapsed: false
//        }, {
//            xtype: 'useracl',
//            id: 'card-E3-2',
//            autoScroll: true,
//            collapsed: false
//        }
    ]
});