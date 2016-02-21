Ext.define('VRU.ux.FuncUtils', {
    statics: {
        required : '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        DateFormat: 'd-m-Y',
        TimeFormat: 'H:i',
        DateTimeFormat: 'd-m-Y H:i:s',

/* 
 * This function toggles the labels between "Add Guest" & "Modify Guests" 
 * Name: add_modify_guest
 */
       add_modify_guest: function(mode) {
            Ext.ComponentQuery.query('addguests')[0].setTitle(mode +' Guests');
            Ext.StoreManager.get('GuestItems').getAt(1).set('itemText', mode + ' Guests');
            Ext.StoreManager.get('GuestItems').sync();
       },
/*
 * This funciton calculates the check out date/time in the "Add Reservation" page and populates the fields accordingly
 * Name: calcCheckOut
 */
        calcCheckOut: function () {
            var interval = Ext.ComponentQuery.query('addreservation radiogroup')[0].getValue().interval,
                check_in_tm = Ext.ComponentQuery.query('addreservation timefield[name=start_tm]')[0],
                check_in_dt = Ext.ComponentQuery.query('addreservation datefield[name=start_dt]')[0],
                check_in = new Date(Ext.Date.format(check_in_dt.getValue(), 'Y-m-d')+' '+Ext.Date.format(check_in_tm.getValue(),'H:i'));
              // this will check if the selected date_time is not before current system time
//            if (check_in - new Date() < 0 && check_in_tm.getValue() !== null) {
//                Ext.ComponentQuery.query('addreservation datefield[name=start_dt]')[0].setValue(new Date());
//                var dt= new Date(),
//                hr=Ext.Date.format(dt, 'H'),
//                min=Ext.Date.format(dt, 'i');
//                if (min>'30') {
//                    if (hr === '23') 
//                        Ext.ComponentQuery.query('addreservation timefield[name=start_tm]')[0].setValue('00:00');
//                    else Ext.ComponentQuery.query('addreservation timefield[name=start_tm]')[0].setValue(++hr+':00');
//                } else
//                    Ext.ComponentQuery.query('addreservation timefield[name=start_tm]')[0].setValue(hr+':'+30);
//                Ext.MessageBox.alert('System Alert', 'Check-in date/time cannot be earlier than the current time');
//            }
            check_out = Ext.Date.add(check_in, Ext.Date.HOUR, interval);

            Ext.ComponentQuery.query('addreservation datefield[name=end_dt]')[0].setValue(check_out, Ext.Date.format("Y-m-d"));
            Ext.ComponentQuery.query('addreservation timefield[name=end_tm]')[0].setValue(check_out, Ext.Date.format("H:i"));
        },
/*
 * This function will proceed with recording the reservation
 * Name: RecordReservation()
 */
        RecordReservation: function (g_id) {
            var formReservation = Ext.ComponentQuery.query('addreservation form')[1].getForm(),
                room_sel = Ext.ComponentQuery.query('addreservation grid')[0].getSelectionModel().getSelection(),
                Rooms = new Array (),
                Guest_id = 0,
                male = [],
                female = [];
            if (VRU.view.cards.reservation.AddReservation.isNew) Guest_id = g_id;
            else Guest_id = Ext.ComponentQuery.query('addreservation form')[0].getForm().getRecord().get('guest_id')
            Ext.Array.each(room_sel, function (val, idx) {
                if (val.get('room_type') === 'Male') male.push(val.get('room_id'));
                if (val.get('room_type') === 'Female') female.push(val.get('room_id'));
            });
            Rooms.M = male;
            Rooms.F = female;
            formReservation.submit({
                method: 'POST',
                url: 'php/remote/HandleReservations.php',
                params: {
                    guest_id: Guest_id,
                    rooms_female: Ext.encode(Rooms.F),
                    rooms_male: Ext.encode(Rooms.M)
                },
                waitTitle: 'Connecting',
                waitMsg: 'Sending data...',

                success: function (form, action) {
                    var resp = Ext.JSON.decode(action.response.responseText);
                    if (resp.success) {
                        console.log('Reservation Successful');
                        button = Ext.ComponentQuery.query('addreservation button[action=btnResvReset]')[0];
                        button.fireEvent('click', button);
                    }
                    else console.log('cannot proceed. some issue with inserting the reservation');
                },
                failure: function (form, action) {
                    console.log('cannot proceed. some issue with inserting the reservation');
                }
            });
        }
    }
});