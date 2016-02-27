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

    function make_player_card(player) {
        var card= $('<li>' + player.player + '</li>')
            .addClass('ui-state-default');
        $('#player-list').append(card);
    }

    function make_npc_card(npc) {
        var card= $('<li>' + npc.type + '</li>')
            .addClass('ui-state-default');
        $('#npc-list').append(card);
    }
    
    (function init() {
        get_json('PCs.json', function(PCs_json) {
            PCs_json.forEach(make_player_card);
        });
        get_json('NPCs.json', function(NPCs_json) {
            NPCs_json.forEach(make_npc_card);
        });

        $(function() {
            $( ".sortable" ).sortable({
                revert: true,
                axis: "x"
            });
            $( "ul, li" ).disableSelection();
        });
    })();
}).call( this );
