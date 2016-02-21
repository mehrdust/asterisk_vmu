Ext.define('VRU.store.Queues', {
    extend: 'Ext.data.Store',
    model: 'VRU.model.Queue',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'php/remote/PreliminaryData.php',
        method: 'POST',
        extraParams: {qryType: 'queue'},
        reader: new Ext.data.JsonReader(
            {
                type: 'json',
                root: 'data'
            }
        )
    }
    
});