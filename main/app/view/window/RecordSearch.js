Ext.define('VRU.view.window.RecordSearch', {
    extend: 'Ext.window.Window',
    alias: 'widget.recordingsearch',
    title: 'Search for Recordings',

    autosize: true,
    draggable: true,
    glyph: '90@fontello',
    autoscroll: true,
    modal: true,
    headerPosition: 'top',
    minWidth: 500,
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            width: 450,
            bodyPadding: '0 10 10 10',
            defaults: {
                anchor: '100%',
                allowBlank: false,
                msgTarget: 'side',
                labelWidth: 120,
                headerPosition: 'top',
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'container',
                    anchor: '100%',
                    height: 60,
                    layout: 'hbox',
                    defaults: {
                        labelAlign: 'top',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Unique Id',
                            labelAlign: 'top',
                            padding: '10 5 5 5',
                            name: 'uniqueid',
                            flex: 1
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Caller Id',
                            labelAlign: 'top',
                            padding: '10 5 5 5',
                            name: 'clid',
                            flex: 1
                        }
                    ]
                }, {
                    xtype: 'fieldset',
                    title: 'Call Date/Time Range',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            margin: '0 0 15 0',
                            items: [
                                {
                                    xtype: 'container',
                                    anchor: '90%',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start',
                                        align: 'left'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            labelAlign: 'top',
                                            allowBlank: false,
                                            fieldLabel: 'From Date',
                                            name: 'from_date',
                                            format: 'Y-m-d',
                                            padding: '10 5 5 5',
        //                                    vtype: 'daterange',
                                            endDateField: 'toDt'
                                        }, {
                                            xtype: 'timefield',
                                            labelAlign: 'top',
                                            allowBlank: false,
                                            name: 'from_time',
                                            fieldLabel: 'From Time',
                                            minValue: '00:00',
                                            maxValue: '23:59',
                                            format: 'H:i',
                                            padding: '10 5 5 5',
                                            increment: 30,
                                            anchor: '100%'
                                        },
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            labelAlign: 'top',
                                            padding: '5 5 5 5',
                                            allowBlank: false,
                                            flex: 1,
                                            anchor: '100%',
                                            fieldLabel: 'To Date',
                                            name: 'to_date',
                                            format: 'Y-m-d',
        //                                    vtype: 'daterange',
                                            startDateField: 'fromDt'
                                        }, {
                                            xtype: 'timefield',
                                            labelAlign: 'top',
                                            allowBlank: false,
                                            flex: 1,
                                            name: 'to_time',
                                            padding: '5 5 5 5',
                                            fieldLabel: 'To Time',
                                            minValue: '00:00',
                                            maxValue: '23:59',
                                            format: 'H:i',
                                            increment: 30,
                                            anchor: '100%'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 15 0',
                    items: [{
                        xtype: 'grid',
                        tools: [
                            {
                                type: 'refresh',
                                tooltip: 'refresh the list',
                                callback: function (pnl) {
                                    pnl.getStore().reload();
                                }
                            }
                        ],
                        title: 'Select Agents',
                        flex: 1,
                        padding: '0 5 0 0',
                        store: 'Agents',
                        selType: 'checkboxmodel',
                        maxHeight: 144,
                        columns: [
                            {text: 'Agent', dataIndex: 'extension', flex: 1, align: 'center'},
                            {text: 'Agent Name', dataIndex: 'agent_name', flex: 1, align: 'center'}
                        ]
                    }, {
                        xtype: 'grid',
                        title: 'Select Queues',
                        tools: [
                            {
                                type: 'refresh',
                                tooltip: 'refresh the list',
                                callback: function (pnl) {
                                    pnl.getStore().reload();
                                }
                            }
                        ],
                        store: 'Queues',
                        padding: '0 0 0 5',
                        maxHeight: 144,
                        flex: 1,
                        selType: 'checkboxmodel',
                        columns: [
                            {text: 'Queue', dataIndex: 'queue', flex: 1, align: 'center'},
                            {text: 'Queue Name', dataIndex: 'queue_name', flex: 1, align: 'center'}
                        ]
                    }]
                }
            ],
            buttons: [
                {
                    text: 'Submit',
                    disabled: true,
                    cls: 'submitBtn',
                    glyph: '102@fontello'
                }, {
                    text: 'Reset',
                    cls: 'resetBtn',
                    glyph: '54@fontello',
                    handler: function () {
                        Ext.StoreManager.get('Guests').getProxy().extraParams = {};
                        this.up('form').getForm().reset();
                    }
                }
            ]
        }
    ]
});