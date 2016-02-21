Ext.define('VRU.controller.Header', {
    extend: 'Ext.app.Controller',

    views: 'Header',

    init: function () {
        this.control({
            'appHeader button[action=logout]': {
               click: this.appLogout
            },
            'appHeader button[cls=SettingsBtn]': {
               click: this.systemSettings
            },
            'appHeader button[cls=FDBtn]': {
               click: this.DesktopShow
            }
        });
    },
/*
 * This will to logout the user from the portal
 * name: appLogout
 * @param: btn
 * @return: N/A
 */
    appLogout: function (btn) {
        VRU.ux.SessionHandler.appLogout();
    },
/* 
 * this function will open the users settings page
 * Name: systemSettings
 */
    systemSettings: function (btn) {
        Ext.getCmp('placeHolder').layout.setActiveItem('card-A2');
        Ext.StoreManager.get('VRUUsers').load();
    },
/* 
 * this function will open desktop page
 * Name: DesktopShow
 */
    DesktopShow: function (btn) {
        Ext.getCmp('placeHolder').layout.setActiveItem('card-A1');
        Ext.StoreManager.get('Recordings').load();
    }
});