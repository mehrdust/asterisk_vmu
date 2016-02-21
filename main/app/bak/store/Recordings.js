Ext.define('VRU.store.Recordings', {
    extend: 'Ext.data.Store',
    model: 'VRU.model.Recording',

    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'php/remote/getRecordings.php',
        method: 'POST',
        reader: new Ext.data.JsonReader(
            {
                type: 'json',
                root: 'sound_files'
            }
        )

    }
});