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
        }, {
            xtype: 'manageusers',
            id: 'card-A2',
//            flex: 2,
            autoScroll: true,
            collapsed: false
        }
    ]
});