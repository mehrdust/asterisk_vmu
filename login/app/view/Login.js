Ext.define('VRUL.view.Login', {
    extend: 'Ext.form.Panel',

    alias: 'widget.login',
    title: 'Please Login',
    layout: 'fit',
    frame: true,

    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                padding: '15 15 10 20',
                border: false,
                style: 'background-color: #fff;',
                fieldDefaults: {
                    labelAlign: 'right',
                    msgTarget: 'side',
                    bodyPadding: 5
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'User',
                        id: 'loginUsername',
                        name: 'loginUsername',
                        allowBlank: false,
                        listeners:
                            {
                                'afterrender': function (field) {
                                   field.focus(true, 1000);
                                }
                            }
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Password',
                        name: 'loginPassword',
                        inputType: 'password',
                        allowBlank: false,
                        enableKeyEvents: true
                    },
                    {
                        xtype: 'checkbox',
                        id: 'chbRemember',
                        name: 'keepAlive',
                        fieldLabel: 'remember me'
                    }
                ]
            }
        ];
        this.buttons = [
            {
                text: 'Login',
                id: 'btnLogin',
                glyph: '84@fontello',
                action: 'save'
            }
        ];
        this.callParent(arguments);
    }
});
