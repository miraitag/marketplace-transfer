$(function() {

    function btnMenu(opt) {

        s.linkTrackVars='eVar25,events';
        s.linkTrackEvents='event30';
        s.eVar25=s.pageName+'|Home|' + opt;
        s.events='event30';
        s.tl(this,'o',s.pageName+'-Page Interaction');
    }
    
    $('#trx-header-main ul li:nth-child(1) a').on('click', function() {
        btnMenu('Conocenos');
    });
    
    $('#trx-header-main ul li:nth-child(2) a').on('click', function() {
        btnMenu('Servicios');
    });
    
    $('#trx-header-main ul li:nth-child(3) a').on('click', function() {
        btnMenu('Ayuda');
    });

    function redes(opt) {
        s.linkTrackVars='eVar46,events';
        s.linkTrackEvents='event33';
        s.eVar46=s.pageName+'|CentroAyuda|' + opt;
        s.events='event33';
        s.tl(this,'o',s.pageName+'-Social Interactions');

    }

    $('.exit-cta a').on('click', function() {
        var url = $(this).attr("href");
        if(url.indexOf("facebook") > -1) {
            redes("Facebook");
        } else if (url.indexOf("twitter") > -1) {
            redes("Twitter");
        }
    });


});



