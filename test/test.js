(function () {
    var width = 900,
        height = 600,
        margin = 50;

    var tests = [];
    
    var container, svg;

    // test 1: simple text wraps at 100 pixels

    tests.push(function (x,y) {
        var g = svg.append('g')
                        .attr('transform','translate(' + x + ' ' + y + ')');

        var text = g.append('text')
                        .attr('x',0)
                        .attr('y',10)
                        .text('This is some text, yo. It should wrap and not get cut off, yo. This is some text, yo. It should wrap and not get cut off, yo.');

        d3.svg.textWrap(text,100);

        g.append('rect')
            .attr({
                'class': 'target bounds',
                'x': 0,
                'y': 0,
                'width': 100,
                'height': '6em'
            });
    });


    // test 2: simple text wraps at 100 pixels, gets cut off if goes over height

    tests.push(function (x,y) {

        var g = svg.append('g')
                        .attr('transform','translate(' + x + ' ' + y + ')');

        var text = g.append('text')
                        .attr('x',0)
                        .attr('y',10)
                        .text('This is some text, yo. It should wrap and get cut off, yo. This is some text, yo. It should wrap and get cut off, yo.');

        var wrap = d3.svg.textWrap(text,100)
                        .height(6); // height is in ems

        if (wrap.overflow() === false) {
            console.error('test 2: wrap overflow should not equal false');
        }

        g.append('rect')
            .attr({
                'class': 'target bounds',
                'x': 0,
                'y': 0,
                'width': 100,
                'height': '6em'
            });
    });


    function init () {
        container = d3.select('.testContainer');

        svg = container.append('svg')
                    .attr('width',width)
                    .attr('height',height);

        var curX = margin,
            curY = margin;

        tests.forEach(function (test) {
            test(curX,curY);

            curX += 200;

            if (curX > width-margin) {
                curY += 200;
                curX = margin;
            }
        });
    }

    init();

})();