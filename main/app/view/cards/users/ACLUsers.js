Ext.define('HMS.view.cards.settings.users.ACLUsers', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.acl_userlist',
    
    store: 'HMSUsers',
    title: 'List of Available Users',
    frame: true,
    columnLines: true,
    glyph: '75@fontello',
    initComponent: function() {
        Ext.apply(this, {
            selType: 'checkboxmodel',
            columns: [
                {text: 'User Id', dataIndex: 'hms_user_id', flex: 1 },
                {text: 'Login Id', dataIndex: 'user_login', flex: 1 },
                {text: 'Full Name', dataIndex: 'user_fullname', flex: 1}
            ]
        });
        this.callParent();
    }
});