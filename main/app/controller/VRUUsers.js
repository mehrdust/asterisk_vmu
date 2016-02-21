Ext.define('VRU.controller.VRUUsers', {
    extend: 'Ext.app.Controller',

    views: [
        'cards.users.ManageUsers'
    ],

    stores: [
        'VRUUsers',
    ],

    models: [
        'VRUUser',
    ],

    init: function () {
        this.control({
            'manageusers button[action=btnUserSubmit]': {
                click: this.submitForm
            },
            'manageusers button[action=btnUserAdd]': {
                click: this.addNewUser
            },
            'manageusers button[action=btnUserDel]': {
                click: this.removeUser
            },
            'manageusers button[action=btnUserReset]': {
                click: this.resetForm
            },
            'manageusers': {
                selectionchange: this.selectionChange
            },
            'setpassword textfield': {
                'keypress' : this.onPressEnter
            },
            'setpassword form': {
                validitychange: this.checkFormValidity
            },
            'setpassword button[cls=submitBtn]': {
                click: this.resetPassword
            }
        });
    },
/*
 * This function resets the form to its earlier state
 * name: resetForm
 */
    resetForm: function (btn) {
        var store = Ext.StoreManager.get('VRUUsers');
        store.load();
    },
/*
 * This function handles the form submit procedure
 * name: submitForm
 */
    submitForm: function (btn) {
        var store = Ext.StoreManager.get('VRUUsers');
        store.sync();
        store.load();
    },
/*
 * This adds an empty row for a new User
 * name: addUser
 */
    addNewUser: function (btn) {
        var rec = new VRU.model.VRUUser(
                    {}),
            store = Ext.StoreManager.get('VRUUsers');
    
        store.insert(0,rec);
        
        store.sync();
        store.load();
    },
/*
 * This toggles the delete button 
 * name: selectionChange
 */
    selectionChange: function (sm, sel) {
        if (sel.length === 0)
            Ext.ComponentQuery.query("manageusers button[cls=DelBtn]")[0].disable();
        else
            Ext.ComponentQuery.query("manageusers button[cls=DelBtn]")[0].enable();
    },
/* 
 * This function removes the selected Users
 * name: removeUser
 */
    removeUser: function (btn) {
        var selmod = Ext.ComponentQuery.query("manageusers")[0].getSelectionModel().getSelection(),
            selcount = selmod.length,
            store = Ext.StoreManager.get('VRUUsers');
        Ext.MessageBox.confirm('Confirm DELETE', selcount + ' records will be removed. <br /> Are you sure you want to proceed?', function (btn) {
            if (btn === 'yes') {

                Ext.Array.each(selmod, function (val, idx) {
                    store.remove(val);
                });
                store.sync();
            }
        });
    },
/* 
 * This function will submit the form once the user presses return key
 * name: onPressEnter
 */
    onPressEnter: function (textfield, eventObject) {
        if (eventObject.getCharCode() === Ext.EventObject.ENTER) {
            var button = Ext.ComponentQuery.query('setpassword form button[text=Submit]')[0];
            button.fireEvent('click', button);
        }
    },
/*
 * This toggles the submit button depending on the form validation state
 * name: checkFormValidity
 */
    checkFormValidity: function (frm, isValid) {
        if (isValid) Ext.ComponentQuery.query('setpassword button[cls=submitBtn]')[0].enable();
        else Ext.ComponentQuery.query('setpassword button[cls=submitBtn]')[0].disable();
    },
    resetPassword: function (btn) {
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            var pwd = Ext.ComponentQuery.query('setpassword textfield[itemId=newPwd]')[0].value,
                idx = VRU.view.windows.SetPassword.curIdx,
                store = Ext.StoreManager.get('VRUUsers');

            store.getAt(idx).set('user_password', pwd);
            store.sync();
//            Ext.getCmp('csvuploader').close();
            Ext.ComponentQuery.query('setpassword')[0].hide();
        }
    }
});