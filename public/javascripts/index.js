$(document).ready(function () {
    $('#calendar').fullCalendar({
        events: '/events',
        customButtons: {
            myCustomButton: {
                text: 'Agregar Evento',
                click: function () {
                    $('#modal-title').val('');
                    $('#modal-date').val('');
        
                     $('#modal-start').val('');
                     $('#modal-end').val('');
                     $('#modal-users').html('');

                    $("#event").modal();
                }
            }
        },
        header: {
            left: 'month,basicWeek',
            center: 'prev title next',
            right: 'myCustomButton'
        },
        views: {
            agenda1Day: {
                type: 'agenda',
                dayCount: 1,
                allDaySlot: false,
                minTime:'08:00:00',
                maxTime:'21:00:00'
            }
        },
        dayClick: function (date, view) {
            debugger;
            $('#calendar').fullCalendar('changeView', 'agenda1Day', date);
        },
        eventClick: function (calEvent, jsEvent, view) {
            debugger;
            $('#modal-title').val(calEvent.title);
            $('#modal-date').val(calEvent.start.format("YYYY-MM-DD"));

            $('#modal-start').val(calEvent.start.format("HH:MM"));
            $('#modal-end').val(calEvent.end.format("HH:MM"));


            var users = ["hernan", "brian", "lore", "juan", "hernan", "brian", "lore", "juan"];
            var labels = ["primary", "secondary", "success", "danger", "warning", "info"];
            var divContent = users.map(function (u, i) {
                return '<a href=""><span class="badge badge-' + labels[i % labels.length] + '">' + u + '</span></a>&nbsp;'
            }).reduce(function (u1, u2) { return u1 + u2 });

            $('#modal-users').html(divContent);
            $("#event").modal();


        }
    });

    $('#modal-save').click(function () {
        let event = {};
        event.start = new Date($('#modal-date').val() + " " + $('#modal-start ').val());
        event.end = new Date($('#modal-date').val() + " " + $('#modal-end ').val());
        event.title = $('#modal-title').val();

        $.ajax({
            type: 'POST', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
            dataType: 'json', // Set datatype - affects Accept header
            url: "http://18.216.155.225:3000/events/", // A valid URL
            headers: { "X-HTTP-Method-Override": "POST" }, // X-HTTP-Method-Override set to PUT.
            data: event,
            success: successCallback,
            error: errorCallback
        });

    });
    function successCallback(data) {
        console.log(data);
        jQuery("#event").modal("hide");
        window.open("http://18.216.155.225:3000/","_self");

    }
    function errorCallback(e) {
        console.log(e)
    }
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});