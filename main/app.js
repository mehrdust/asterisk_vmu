Ext.application({
    name: 'VRU',

    autoCreateViewport: true,
    appFolder: 'main/app',

    controllers: [
//        'MenuItems',
        'Recordings',
        'Header',
        'VRUUsers'
    ],

    requires: [
        'VRU.ux.SessionHandler',
//        'VRU.ux.FuncUtils',
        'VRU.ux.TooltipBalloon'
    ],
    init: function () {
        var utils = VRU.ux.SessionHandler;
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
        isActive = utils.session_verify();
    }
});
