Ext.application({
    name: 'VRUL',

    autoCreateViewport: true,
    appFolder: 'login/app',
    controllers: [
        'Login'
    ],
    requires: [
        'VRUL.ux.SessionHandler',
//        'VRU.ux.FuncUtils',
        'VRUL.ux.TooltipBalloon'
    ],
    init: function () {
        var utils = VRUL.ux.SessionHandler;
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
        isActive = utils.session_verify();
    }
});
