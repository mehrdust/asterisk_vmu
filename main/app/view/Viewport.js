Ext.define('VRU.view.Viewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'vruviewport',
    requires: [
//        'VRU.view.Header',
        'VRU.view.CenterPanel'
    ],
    layout: {
        type: 'border',
        padding: 1
    },
    items: [
        {
            xtype: 'appHeader',
            region: 'north'
        },
        {
            xtype: 'searchpanel',
            collapsible: true,
            region: 'west'
        }, {
            xtype: 'centerpanel',
            collapsible: false,
            region: 'center'
        }
    ]
});
