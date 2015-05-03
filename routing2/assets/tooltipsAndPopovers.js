function tooltipsAndPopovers(){
        // Para mensaje de lalerta
        $(".alert").delay(2000).addClass("in").fadeOut(6000);

        // Para los tooltips y popovers
        $(document).ready(function () {
            $(".popover-top").popover({
                placement: 'top'
            });
            $(".popover-right").popover({
                placement: 'right'
            });
            $(".popover-bottom").popover({
                placement: 'bottom'
            });
            $(".popover-left").popover({
                placement: 'left'
            });
            $('[data-toggle="tooltip-top"]').tooltip({
                placement: 'top'
            });
            $('[data-toggle="tooltip-bottom"]').tooltip({
                placement: 'bottom'
            });
            $('[data-toggle="tooltip-right"]').tooltip({
                placement: 'right'
            });
            $('[data-toggle="tooltip-left"]').tooltip({
                placement: 'left'
            });
        });
};

tooltipsAndPopovers();