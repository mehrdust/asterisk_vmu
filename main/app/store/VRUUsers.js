Ext.define('VRU.store.VRUUsers', {
    extend: 'Ext.data.Store',
    model: 'VRU.model.VRUUser',

    autoLoad: false,
    autoSave: true,
    autoSync: false,
    pageSize: 25,

    proxy: {
        type: 'rest',
        api: {
            read: 'php/remote/ManageUsers.php/read',
            update: 'php/remote/ManageUsers.php/update',
            create: 'php/remote/ManageUsers.php/create',
            destroy: 'php/remote/ManageUsers.php/destroy'
        },
        reader: new Ext.data.JsonReader({
            type: 'json',
            root: 'users_list',
            totalProperty: 'totalCount',
            idProperty: 'user_id'
        }),
        writer: new Ext.data.JsonReader({
            type: 'json',
            root: 'users_list',
            writeAllFields: true
        })
    }
});