Ext.define('HMS.view.cards.settings.users.ACL', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.useracl',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    glyph: '75@fontello',
    title: 'Access Control Level Settings',
        dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        items: [
            {
                text: 'Submit',
                cls: 'submitBtn',
                glyph: '102@fontello'
            },{
                text: 'Reset',
                cls: 'resetBtn',
                glyph: '54@fontello'
            },{
                text: 'Remove Rooms',
                disabled: true,
                cls: 'DelBtn',
                glyph: '105@fontello'
            },'->',{
                text: 'Add New Room',
                glyph: '106@fontello'
            }
        ]
    }],
    items: [
        {
            xtype: 'acl_userlist',
            padding: '0 2.5 0 0',
            flex: 1
        }, {
            xtype: 'panel',
            border: false,
            width: 3            
        }, {
            xtype: 'aclmodules',
            padding: '0 0 0 2.5',
            flex: 2
        }
        
    ]
});