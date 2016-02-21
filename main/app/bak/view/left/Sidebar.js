Ext.define('VRU.view.left.Sidebar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.leftsidebar',
    requires: [
    ],
    initComponent: function () {
        Ext.apply(this, {
            title: 'Main Menu',
            animCollapse: true,
            width: 300,
            minWidth: 150,
            maxWidth: 400,
            split: true,
            collapsible: true,
            collapsed: true,
            layout: {
                type: 'accordion',
                animate: true
            },
            iconCls: 'sidebarHouse',
            items: [
//                {
//                    xtype: 'hmsdesktop'
//                },
//                {
//                    xtype: 'guests'
//                },
//                {
//                    xtype: 'roomsreservation'
//                },
//                {
//                    xtype: 'reports'
//                },
//                {
//                    xtype: 'systemsettings'
//                }
            ]
        });
    this.callParent();
    }
});