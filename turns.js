(function (undefined) {
    'use strict';

    function get_json(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            var DONE = 4;
            var OK = 200;
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    if(callback !== undefined) {
                        callback(JSON.parse(xhr.responseText));
                    }
                } else {
                    console.error('turns.js::get_json: ' + xhr.status);
                }
            }
        }
    }

    function make_card(ob) {
        var container = $('<span>');
        var titlebar = $('<div>')
            .append(ob.type + ': ' + ob.name)
            .addClass('ui-state-default');
        container.append(titlebar);
        var info = $('<div>').addClass('info');
        for(var key in ob.info) {
            info.append('<div>' + key + ': ' + ob.info[key] + '</div>');
        }
        container.append(info);
        var card= $('<li>')
            .append(container)
            .addClass(ob.type + '-card');
        $('#' + ob.type + '-list').append(card);
    }
    
    (function init() {
        get_json('data.json', function(data) {
            data.forEach(make_card);
        });

        $(function() {
            $( '#turn-list' ).sortable({
                connectWith: '.PC-NPC-lists'
            }).disableSelection();
            $( '.PC-NPC-lists' ).sortable({
                connectWith: '#turn-list'
            }).disableSelection();
            $( '#add-all-players' ).click(function() {
                $('.PC-card').appendTo('#turn-list');
            });
            $( '#add-all-npcs' ).click(function() {
                $('.NPC-card').appendTo('#turn-list');
            });
            $( '#clear-turn-order' ).click(function() {
                $('.PC-card').appendTo('#PC-list');
                $('.NPC-card').appendTo('#NPC-list');
            });
            $( '#next-turn' ).click(function() {
                var first = $('#turn-list :first-child').first();
                console.log(first);
                first.appendTo('#turn-list');
            });
        });
    })();
}).call( this );
