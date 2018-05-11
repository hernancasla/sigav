$(document).ready(function () {
    $('#calendar').fullCalendar({
        events: '/events',
        customButtons: {
            myCustomButton: {
                text: 'Agregar Evento',
                click: function () {
                    alert('clicked the custom button!');
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
            }
        },
        dayClick: function (date, view) {
            debugger;
            $('#calendar').fullCalendar('changeView', 'agenda1Day', date);
        },
        eventClick: function (calEvent, jsEvent, view) {
            debugger;
            $('#modal-tittle').html(calEvent.title);
            $('#modal-date').html(calEvent.start.format("DD/MM/YYYY"));

            $('#modal-start').html(calEvent.start.format("HH:MM:SS"));
            $('#modal-end').html(calEvent.end.format("HH:MM:SS"));

            var users = ["hernan", "brian", "lore", "juan","hernan", "brian", "lore", "juan"];
            var labels = ["primary", "secondary", "success", "danger", "warning", "info"];
            var divContent = users.map(function (u, i) {
                return '<a href=""><span class="badge badge-' + labels[i % labels.length] + '">' + u + '</span></a>&nbsp;'
            }).reduce(function (u1, u2) { return u1 + u2 });

            $('#modal-users').html(divContent);
            $("#myModal").modal()


        }
    });

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});

