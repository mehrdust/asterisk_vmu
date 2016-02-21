Ext.define('VRU.model.VRUUser', {
    extend: 'Ext.data.Model',
    fields: [
        'user_id',
        'user_login',
        'user_fullname',
        'user_pid',
        'user_password',
        'user_active'
    ]
});