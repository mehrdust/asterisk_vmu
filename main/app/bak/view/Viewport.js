Ext.define('VRU.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
//        'VRU.view.Header',
//        'VRU.view.CenterPanel'
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
//        {
//            xtype: 'leftsidebar',
//            region: 'west'
//        },
        {
            xtype: 'centerpanel',
            collapsible: false,
            region: 'center'
        }
    ]
});
