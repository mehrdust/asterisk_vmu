Ext.define('VRU.ux.TooltipBalloon', {
    statics: {

        msgCt: '',

        createBox: function (t, s) {
           return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
        },

        msg : function (title, format) {
            if (!this.msgCt) {
                this.msgCt = Ext.DomHelper.insertFirst(document.body, {id: 'msg-div'}, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1)),
                m = Ext.DomHelper.append(this.msgCt, this.createBox(title, s), true);

            m.hide();
            m.slideIn('t').ghost("t", { delay: 5000, remove: true});
        },
    /*
 * Shows the tooltip balloon when the agent receives a call
 * name: TooltipMsg
 * @param: HTML content of the tooltip body
 * @return: N/A
 *
 */
        TooltipMsg: function (title, HTML) {
            var w = Ext.getBody().getWidth() / 98,
                t = new Ext.ToolTip({
                    floating: {
                        shadow: true
                    },
                    style: {
                        'background-color': '#DFEAF2'
                    },
                    title: title,
                    html: HTML,
                    width: 200,
                    height: 100,
                    locked: false,
//                    autoHide: true
                    hideDelay: 5000,
                    closable: false
                });

            t.showAt([0, 0]); // ensure it's rendered and visible so that it has dimensions for following calc
            t.showAt(t.el.getAlignToXY(Ext.getBody(), 'bl-bl', [w, 30]));
            t.el.slideIn('b');
        }
    }
});