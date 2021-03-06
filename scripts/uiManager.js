$(function () {
    'use strict';
    var game,
        selectedElement,
        colors = ['grey', 'red', 'yellow', 'purple', 'cyan', 'blue', 'green'],
        score = $('#score'),
        ballsSelector = colors.map(function (color) {
            return 'td.' + color;
        }).join(),
        dashboard = $('.dashboard').on('click', ballsSelector, function () {
            var element = $(this);

            if (element.hasClass('selected')) {
                return;
            }

            element.addClass('selected');
            selectedElement && selectedElement.removeClass('selected');
            selectedElement = element;
        }).on('click', 'td:not([class])', function () {
            var element = $(this);
            if (!selectedElement) {
                return;
            }
            game.moveBall(selectedElement.data('point'), element.data('point'));
            selectedElement = undefined;
            drawBoard(game.options.size);
        });
    $('#newGame').on('click', function () {
            var element = $(this);
        
            $('.settings').addClass('initial');
            element.addClass('none'); 
    })
    $('#play').on('click', init);
    
    $('.undo').click(function () {
        drawStep(game.undo());
    });
    $('.redo').click(function () {
        drawStep(game.redo());
    });

    function init() {
        game = new LinesGame(initOption());
        drawBoard(game.options.size);
        
        // $('<button>', {id: 'undo', class: 'undo', text: 'Undo'}).appendTo($('main'))
    }

    function drawBoard(size) {
        dashboard.empty();

        if (!game.gameOver()) {
            for (var i = 0; i < size; i++) {
                var tr = $('<tr>');
                for (var j = 0; j < size; j++) {
                    var color = game.dashboard[i][j];
                    $('<td>').addClass(colors[color])
                        .data('point', new Point(i, j))
                        .appendTo(tr);
                }
                dashboard.append(tr);
            }
            score.empty().text('Score:' + game.score).appendTo($('main'));
        }
        else {
            $('<p>').text('Game Over').appendTo(score);
        }
    }
    
    function drawStep(step) {
        if (!step) {
            return;
        }
        step.added.forEach(function (item) {
            $(getPointSelector(item.point)).addClass(colors[item.color - 1]);
        });

        step.removed.forEach(function (item) {
            $(getPointSelector(item.point)).removeAttr('class');
        });
    }
    function getPointSelector(point) {
        return 'tr:nth-child(' + (point.row + 1) + ') td:nth-child(' + (point.column + 1) + ')';
    }

    function initOption() {
        return {
            size: +$('#size').val(),
            ballsCount: +$('#ballsCount').val(),
            repeat: $('#repeat').is(':checked'),
            removingCount: +$('#removingCount').val()
        };
    }
})