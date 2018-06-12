$(document).ready(function () {
    var server = "18.216.155.225";
    $('#calendar').fullCalendar({
        lang: 'es',
        events: '/events/formated',
        customButtons: {
            myCustomButton: {
                text: 'Agregar Evento',
                click: function () {
                    openEventModal();
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
                minTime: '08:00:00',
                maxTime: '21:00:00'
            }
        },
        dayRender: function (date, element, view) {
            element.bind('dblclick', function () {
                openEventModal();
            });
            // element.bind('click', function () {
            //     $('#calendar').fullCalendar('changeView', 'agenda1Day', date);
            // });
        },
        eventClick: function (calEvent, jsEvent, view) {
            $('#modal-title').val(calEvent.title);
            $('#modal-startDate').val(moment(calEvent.startDate).utcOffset(3 * 60).format("YYYY-MM-DD"));
            $('#modal-endDate').val(moment(calEvent.endDate).utcOffset(3 * 60).format("YYYY-MM-DD"));

            $('#modal-startTime').val(calEvent.startTime);
            $('#modal-endTime').val(calEvent.endTime);
            $('#modal-frequency').val(calEvent.frequency);
            $('#modal-id').val(calEvent._id);

            calEvent.days.forEach(e => {
                $("input[type=checkbox][value="+e+"]").prop("checked",true);
            })

            var users = ["hernan", "brian", "lore", "juan", "hernan", "brian", "lore", "juan"];
            var labels = ["primary", "secondary", "success", "danger", "warning", "info"];
            var divContent = users.map(function (u, i) {
                return '<a href=""><span class="badge badge-' + labels[i % labels.length] + '">' + u + '</span></a>&nbsp;'
            }).reduce(function (u1, u2) { return u1 + u2 });

            $('#modal-users').html(divContent);
            $("#event").modal();


        }
    });
    function validate(title) {
        return $.ajax({
            type: 'GET', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
            dataType: 'json', // Set datatype - affects Accept header
            url: "http://"+server+":3000/events/find/" + title, // A valid URL
            headers: { "X-HTTP-Method-Override": "GET" }, // X-HTTP-Method-Override set to PUT.
        });
    }
    $('#modal-save').click(function () {
        let event = {};
        debugger;
        event._id = $('#modal-id').val();
        var days = $("input[type='checkbox']:checked").map((i, e) => Number(e.value)).toArray()
        event.startDate = new Date($('#modal-startDate').val());
        event.endDate = new Date($('#modal-endDate').val());
        event.startTime = $('#modal-startTime').val();
        event.endTime = $('#modal-endTime').val();
        event.title = $('#modal-title').val();
        event.frequency = $('#modal-frequency').val();
        event.days = days;
        $.ajax({
            type: event._id ? 'PUT' : 'POST', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
            dataType: 'json', // Set datatype - affects Accept header
            url: "http://"+server+":3000/events/"+(event._id ? event._id :""), // A valid URL
            headers: { "X-HTTP-Method-Override": "POST" }, // X-HTTP-Method-Override set to PUT.
            data: event,
            success: successCallback,
            error: errorCallback
        });
    });
    function successCallback(data) {
        console.log(data);
        jQuery("#event").modal("hide");
        window.open("http://"+server+":3000/", "_self");

    }
    function errorCallback(e) {
        console.log(e);
    }
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function openEventModal() {
        $('#modal-title').val('');
        $('#modal-date').val('');

        $('#modal-start').val('');
        $('#modal-end').val('');
        $('#modal-users').html('');

        $("#event").modal();
    }

});