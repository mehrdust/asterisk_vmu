Ext.define('HMS.view.cards.settings.users.ACLModules', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.aclmodules',

    title: "HMS Available Modules",
    autoScroll: true,
    useArrows: true,
    frame: true,
    border: true,
    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start'
    },
    tools: [
        {
            type: 'refresh',
            handler: function(grid, rowIndex, colIndex) {
                Ext.widget('guestsearch').show();
            }
        }
    ],
    items: [
        {
            xtype: 'treepanel',
            layout: 'fit',
            store: 'ACL',
            rootVisible: false,
            scroll: true,
            autoload: true,
            useArrows: true            
        }
    ],
    iconCls: 'SystemSettings'
});
