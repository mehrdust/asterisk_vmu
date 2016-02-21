Ext.define('VRU.ux.SessionHandler', {
   statics: {
/*
 * exceeds the session timeout
 * name: checkSession
 * @param: remember     :
 * @param: name         :
 * @param: lastactive   :
 * @return: boolean
 */
        updateSession: function (remember, name, lastactive) {
//            console.log('update session in progress');
            Ext.state.Manager.set('VRU_session_details', {
                remember: remember,
                user_name: name,
                user_lastactivity: lastactive
            });
        },
/*
 * exceeds the session timeout
 * name: checkSession
 * @param: N/A
 * @return: N/A
 */
        closeSession: function () {
            Ext.state.Manager.set('VRU_session_details', {
                remember: false,
                user_name: '',
                user_lastactivity: ''
            });
//            Ext.Msg.alert('Session Expired', 'Force log out. Session is expired now.');
//            window.location.href = 'index.php';
        },
/*
 * uses AJAX to check to see if session is expired
 * name: session_verify
 * @param: N/A
 * @return: locks the window in case the session is expired
 */
        session_verify: function (callback) {
            Ext.Ajax.request({
                url: 'php/remote/session_handler.php',
                method: 'POST',
                success: function (response, request) {
                    var obj = Ext.JSON.decode(response.responseText),
                        active_user_name = obj.user_name,
                        active_keep_alive = obj.keep_alive,
                        active_user_last_activity = new Date(obj.user_last_activity),
                        now = new Date(),
                        diff = (now - active_user_last_activity) / 60000;
                    if (active_user_name === '0' || (diff > 60 && active_keep_alive === 'off')) {
                        if (!VRU.ux.SessionHandler.LoggedIn) VRU.ux.TooltipBalloon.msg('Session Expired', 'Session has been expired.');
                        VRU.ux.SessionHandler.UserLogout();
                        window.location = 'login.html';
                } else {
                        VRU.ux.SessionHandler.updateSession(active_keep_alive, active_user_name, active_user_last_activity);
                    }
                },
                failure: function () {
                    Ext.Msg.alert('Connection Error', 'Connection not executed!', function (btn, text) {
                        if (btn === 'ok') {
                            VRU.ux.SessionHandler.UserLogout();
                            window.location = 'login.html';
                        }
                    });
                }
            });
        },
/*
 * Locks the window 
 * name: LockWindow
 * @param: N/A
 * @return: locks the window 
 */
        LockWindow: function () {
            window.location = 'login.html';
            return true;
            var me = this,
                win = new Ext.Window({
                    closable: false,
                    header: false,
                    plain: true,
                    border: false,
                    frame: false,
                    modal: true,
                    maximized: true,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    bodyStyle: {
                        background: 'rgb(88, 137, 199)',
                        padding: '10px'
                    },

                    items: [
//                        {
//                            xtype: 'component',
//                            id: 'app-header-logo',
//                            border: false,
//                            padding: '50 50 50 50',
//                            html: "<div> <img style='width:328px;' src='resources/images/HotelLogo.jpg'></div>",
            //                html: "Hotel Management System",
//                            width: 150
//                        }, 
                        {
                            xtype: 'login'
                        }
                    ]
                });
            win.show();
        },
/*
 * Log out function
 * name: UserLogout
 * @param: N/A
 * @return: N/A
 */
        UserLogout: function () {
            Ext.Ajax.request({
                url: 'php/remote/Logout.php',
                method: 'POST',
                success: function (response, request) {
                    VRU.ux.SessionHandler.closeSession();
                    VRU.ux.SessionHandler.LockWindow();
                    //~ window.location = 'admin.html';
                }
            });
        },
/*
 * This will to logout the user from the portal
 * name: appLogout
 * @param:  N/A
 * @return: N/A
 */
        appLogout: function () {
            Ext.MessageBox.confirm('Confirm Logout', 'Are you sure you want to log out?', function (btn) {
                if (btn === 'yes') {
                    VRU.ux.SessionHandler.UserLogout();
                }
            });
        }
    }
});