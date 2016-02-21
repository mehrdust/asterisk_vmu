Ext.define('VRU.store.Agents', {
    extend: 'Ext.data.Store',
    model: 'VRU.model.Agent',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'php/remote/PreliminaryData.php',
        method: 'POST',
        extraParams: {qryType: 'agent'},
        reader: new Ext.data.JsonReader(
            {
                type: 'json',
                root: 'data'
            }
        )
    }
    
});