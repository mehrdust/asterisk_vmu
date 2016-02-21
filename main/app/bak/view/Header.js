Ext.define('VRU.view.Header', {
    extend: 'Ext.Container',
    alias: 'widget.appHeader',
    id: 'app-header',
    height: 40,
    cls: 'appHeader',
    layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'start'
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'component',
                id: 'app-header-logo',
//                html: "<div> <img style='width:120px;' src='resources/images/HotelLogo.jpg'></div>",
//                html: "Hotel Management System",
                width: 150
            }, {
                xtype: 'component',
                id: 'app-header-title',
//                html: "<img src='resources/images/HotelLogo.png'>",
//                html: "<span style=\"color:white;font-size:23px;opacity: 0.75;font-weight:bold;text-shadow:0 1px 0 #4e691f;\">Hotel Management System</span>",
                flex: 1
            }, {
                xtype: 'button',
                id: 'btnDashboard',
                tooltip: 'Front Desk',
                cls: 'FDBtn',
                glyph: '79@fontello',
//                text: 'Dashboard',
                scale: 'medium',
                width: 40
            }, {
                xtype: 'button',
                id: 'btnSettings',
                cls: 'SettingsBtn',
                tooltip: 'Settings',
                glyph: '119@fontello',
//                text: 'Settings',
                scale: 'large',
                width: 50
            }, {
                xtype: 'button',
                tooltip: 'Logout',
                id: 'btnLogout',
                cls: 'ExitBtn',
                action: 'logout',
                glyph: '88@fontello',
//                text: 'Logout',
                scale: 'medium',
                width: 40
            }
        ];

        this.callParent();
    }
});