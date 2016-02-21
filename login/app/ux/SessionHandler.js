Ext.define('VRUL.ux.SessionHandler', {
   statics: {
       LoggedIn: false,
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
            this.LoggedIn = true;
            Ext.state.Manager.set('VRUL_session_details', {
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
            this.LoggedIn = false;
            Ext.state.Manager.set('VRUL_session_details', {
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
//                        console.log(diff+"|"+active_user_last_activity);
                    if (active_user_name === '0' || (diff > 60 && active_keep_alive === 'off')) {
                        if (!VRUL.ux.SessionHandler.LoggedIn)
                            VRUL.ux.TooltipBalloon.msg('Session Terminated', 'Session has been terminated.');
                    } else {
                        window.location = 'index.html';
                        VRUL.ux.SessionHandler.updateSession(active_keep_alive, active_user_name, active_user_last_activity);
                    }
                },
                failure: function () {
                    Ext.Msg.alert('Connection Error', 'Connection not executed!', function (btn, text) {
                        if (btn === 'ok') {
                            VRUL.ux.SessionHandler.closeSession();
                            VRUL.ux.SessionHandler.LockWindow();
                        }
                    });
                }
            });
        },
    }
});