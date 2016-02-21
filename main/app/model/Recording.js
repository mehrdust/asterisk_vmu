Ext.define('VRU.model.Recording', {
    extend: 'Ext.data.Model',

    fields: [
        'datetime',
        'datetimeconnect',
        'datetimeend',
        'queue', 'queue_name',
        'agent', 'agent_name', 'extension',
        'event',
        'uniqueid',
        'incidentid',
        'clid',
        'position',
        'info1',
        'info2',
        'recording_audio',
        'cc_recordings_id'
    ]
});