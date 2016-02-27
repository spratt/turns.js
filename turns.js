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
        container.append('<div>Player: ' + ob.player + '</div>')
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
                connectWith: '.Player-NPC-lists'
            }).disableSelection();
            $( '.Player-NPC-lists' ).sortable({
                connectWith: '#turn-list'
            }).disableSelection();
            $( '#add-all-players' ).click(function() {
                $('.Player-card').appendTo('#turn-list');
            });
            $( '#clear-turn-order' ).click(function() {
                $('.Player-card').appendTo('#Player-list');
                $('.NPC-card').appendTo('#NPC-list');
            });
        });
    })();
}).call( this );
