Ext.define('VRU.view.cards.Recordings', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ccrecordings',
    html: 'test landing page'
});
/*Ext.define('VRU.view.cards.Recordings', {
    extend: 'Ext.grid.Panel',
    xtype: 'ccrecordings',
//    store: 'Recordings',
    requires: [
//        'Ext.ux.PreviewPlugin',
//        'Ext.ux.ToolbarDroppable',
//        'Ext.ux.BoxReorderer',
//        'Ext.selection.CheckboxModel'
    ],
    title: 'List of Recodings',
    columnLines: true,
    glyph: '75@fontello',
    selType: 'checkboxmodel',
//    viewConfig: {
//        id: 'gv',
//        trackOver: false,
////        plugins: [{
////            ptype: 'preview',
////            bodyField: 'audio',
////            expanded: false,
////            pluginId: 'preview',
//////            renderer: function (val) {
//////                console.log('')
//////            }
////        }]
//    },
    columns: [
        {text: 'filepath', dataIndex: 'filepath', flex: 1},
        {text: 'filename', dataIndex: 'filename', flex: 1},
        {text: 'Audio', flex: 1, dataIndex: 'audio', renderer: function (val) {
            ret = "<audio src='http://localhost/" + val + "' controls> HTML5 audio not supported by browser </audio>";
            return ret;
        }},
        {
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 50,
            items: [{
                iconCls: 'rec-del',
                tooltip: 'Play Audio',
                handler: function (grid, rowIndex, colIndex) {
                    var store = grid.getStore();
                    Ext.MessageBox.confirm('Confirm DELETE', ' Record will be removed. <br /> Are you sure you want to proceed?', function (btn) {
                        if (btn === 'yes') {
//                            store.removeAt(rowIndex);
//                            store.sync();
                        }
                    });
                }
            }, {
                iconCls: 'rec-setpwd',
                tooltip: 'Download',
                handler: function (grid, rowIndex, colIndex) {

                }

            }]
        }
    ],
    tbar: {
        ui: 'footer',
        items: [
            {
                text: 'Search',
                action: 'btnSearchGuest',
                glyph: '97@fontello'
            }, {
                text: 'Remove Filter',
                action: 'btnSearchGuestReset',
                cls: 'resetBtn',
                glyph: '54@fontello'
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: 'Recordings',
        displayInfo: true,
        displayMsg: 'Displaying topics {0} - {1} of {2}',
        emptyMsg: "No topics to display",
        items: [
            '-', {
                text: 'Show Preview',
                pressed: true,
                enableToggle: true,
                toggleHandler: function (btn, pressed) {
                    var preview = Ext.getCmp('gv').getPlugin('preview');
                    preview.toggleExpanded(pressed);
                }
            }
        ]
    },

});*/