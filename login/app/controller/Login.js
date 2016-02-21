Ext.define('VRUL.controller.Login', {
    extend: 'Ext.app.Controller',

    views: [
//        'Login',
//        'VRU.ux.SessionHandler'
    ],
    init: function () {
        this.control({
            'login button[action=save]': {
                'click': this.formSubmit
            },
            'login textfield': {
                'keypress' : this.onPressEnter
            }
        });
    },
    formSubmit: function (button) {
        var win    = button.up('panel'),
            master = win.up('window'),
            form   = win.down('form');
        form.submit({
            method: 'POST',
            url: 'php/remote/Login.php',
            waitTitle: 'Connecting',
            waitMsg: 'Sending data...',

            success: function (form, action) {
                var resp = Ext.JSON.decode(action.response.responseText);
                Ext.Msg.alert('Status', 'Login Successful!', function (btn, text) {
                    if (btn === 'ok') {
                        VRUL.ux.SessionHandler.updateSession(resp.keepAlive, resp.user, resp.last_activity);
                        window.location = 'index.html';
                    }
                });
            },
            failure: function (form, action) {
                if (action.failureType === 'server') {
                    obj = Ext.JSON.decode(action.response.responseText);

                    Ext.Msg.alert('Login Failed!', obj.errors.reason);
                    Ext.getCmp('loginUsername').focus(true, 1000);
                } else {
                    Ext.Msg.alert('Warning!', 'Cannot Login with the given username or password');// + action.response.responseText);
//                    Ext.getCmp('loginUsername').focus(true, 1000);
                }
                form.reset();
            }
        });
    },

    onPressEnter: function (textfield, eventObject) {
        if (eventObject.getCharCode() === Ext.EventObject.ENTER) {
            var button = Ext.getCmp('btnLogin');
            button.fireEvent('click', button);
        }
    }
});
