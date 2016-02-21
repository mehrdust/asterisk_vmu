Ext.define('VRU.controller.Header', {
    extend: 'Ext.app.Controller',

    views: 'Header',

    init: function () {
        this.control({
            'appHeader button[action=logout]': {
               click: this.appLogout
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
    }
});