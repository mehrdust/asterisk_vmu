Ext.define('VRU.view.cards.users.ManageUsers', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.manageusers',

    store: 'VRUUsers',
    title: 'Manage System Users',
    columnLines: true,
    glyph: '75@fontello',
    initComponent: function () {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 2
        });
        Ext.apply(this, {
            plugins: [this.cellEditing],
            selType: 'checkboxmodel',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                ui: 'footer',
                items: [
                    {
                        text: 'Submit',
                        cls: 'submitBtn',
                        action: 'btnUserSubmit',
                        glyph: '102@fontello'
                    }, {
                        text: 'Reset',
                        action: 'btnUserReset',
                        cls: 'resetBtn',
                        glyph: '54@fontello'
                    }, {
                        text: 'Remove Users',
                        disabled: true,
                        cls: 'DelBtn',
                        action: 'btnUserDel',
                        glyph: '105@fontello'
                    }, '->', {
                        text: 'Add New User',
                        action: 'btnUserAdd',
                        glyph: '106@fontello'
                    }
                ]
            }],
            columns: [
                {text: 'User Id', dataIndex: 'user_id', flex: 0.25, hidden: false, hideable: true},
                {text: 'Login Id', dataIndex: 'user_login', flex: 1, hidden: false, hideable: true, editor: {allowBlank: true} },
                {text: 'PID', dataIndex: 'user_pid', flex: 2, sortable: false},
                {text: 'Full Name', dataIndex: 'user_fullname', flex: 1, hidden: false, hideable: true, editor: {allowBlank: true} },
                {text: 'Status', dataIndex: 'user_active', flex: 1, sortable: false, hidden: true, hideable: true},
                {
                    menuDisabled: true,
                    sortable: false,
                    text: 'Action',
                    xtype: 'actioncolumn',
                    width: 75,
                    items: [{
                        iconCls: 'rec-del',
                        tooltip: 'Remove User',
                        handler: function (grid, rowIndex, colIndex) {
                            var store = grid.getStore();
                            Ext.MessageBox.confirm('Confirm DELETE', ' Record will be removed. <br /> Are you sure you want to proceed?', function (btn) {
                                if (btn === 'yes') {
                                    store.removeAt(rowIndex);
                                    store.sync();
                                }
                            });
                        }
                    }, {
                        iconCls: 'rec-setpwd',
                        tooltip: 'Set Password',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            HMS.view.windows.SetPassword.curIdx = rowIndex;
                            Ext.widget('setpassword').show();
                        }
                    }]
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 25,
                store: 'VRUUsers',
                displayInfo: true
            }
        });
        this.callParent();
    }
});