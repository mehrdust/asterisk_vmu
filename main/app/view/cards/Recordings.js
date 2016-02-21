Ext.define('VRU.view.cards.Recordings', {
    extend: 'Ext.grid.Panel',
    xtype: 'ccrecordings',
    title: 'List of Recodings',
    columnLines: true,
    glyph: '121@fontello',
//    selType: 'checkboxmodel',
    store: 'Recordings',
    columns: [
        {text: 'UniqueID', dataIndex: 'uniqueid', flex: 1, align: 'center'},
        {text: 'Incident Id', dataIndex: 'incidentid', flex: 1, align: 'center'},
        {text: 'Date/time', dataIndex: 'datetime', flex: 2,align: 'center'},
        {text: 'Call Connect Date/time', dataIndex: 'datetimeconnect', flex: 1, hidden: true},
        {text: 'Call Disconnect Date/time', dataIndex: 'datetimeend', flex: 1, hidden: true},
        {text: 'Queue', dataIndex: 'queue', flex: 1, align: 'center'},
        {text: 'Queue Name', dataIndex: 'queue_name', flex: 1, align: 'center'},
        {text: 'Agent', dataIndex: 'extension', flex: 1, align: 'center'},
        {text: 'Agent Name', dataIndex: 'agent_name', flex: 2, align: 'center'},
        {text: 'event', dataIndex: 'event', flex: 1, hidden: true},
        {text: 'Caller ID', dataIndex: 'clid', flex: 1, align: 'center'},
        {text: 'Position in queue', dataIndex: 'position', flex: 1, hidden: true},
        {text: 'Recording ID', dataIndex: 'cc_recordings_id', flex: 1, hidden: true},
        {text: 'Audio', width: 320, dataIndex: 'recording_audio', hidden: true, renderer: function (val) {
//            ret = "<audio src='http://192.168.1.146/" + val + "' controls> HTML5 audio not supported by browser </audio>";
            ret = "<audio src='" + val + "' controls> HTML5 audio not supported by browser </audio>";
            return ret;
        }},
        {
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 50,

            align: 'center',
            items: [{
                iconCls: 'rec-audio-play',
                tooltip: 'Download',
                text: 'Audio',
                handler: function (grid, rowIndex, colIndex) {
                    audio = Ext.ComponentQuery.query('ccrecordings')[0].getStore().getAt(rowIndex).get('recording_audio');
//                    location.href = audio;
                    window.open(audio);
                },
                isDisabled: function (view, rowIndex, colIndex, item, rec) {
                    if (rec.get('cc_recordings_id') === null) {
                        return true;
                    } else
                    return false;
                }
            }]
        }
    ],
    tbar: {
        ui: 'footer',
        items: [
            {
                text: 'Search',
                action: 'btnSearchRecord',
                glyph: '97@fontello'
            }, {
                text: 'Remove Filter',
                action: 'btnSearchRecordReset',
                cls: 'resetBtn',
                glyph: '54@fontello'
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        pageSize: 25,
        store: 'Recordings',
        displayInfo: true,
        displayMsg: 'Displaying topics {0} - {1} of {2}',
        emptyMsg: "No topics to display"
    }
});