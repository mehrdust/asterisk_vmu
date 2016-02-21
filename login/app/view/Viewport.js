Ext.define('VRUL.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'VRUL.view.Login'
    ],
    cls: 'LoginPage',
    layout: {
        type: 'hbox',
        padding: 1,
        align: 'middle',
        pack: 'center'
    },
    items: [
        {
            xtype: 'login'
        },
    ]
});
