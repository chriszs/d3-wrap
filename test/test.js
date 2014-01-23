(function () {
    var width = 900,
        height = 600;

    var container = d3.select('.testContainer');

    var svg = container.append('svg')
                .attr('width',width)
                .attr('height',height);

    var g, text, wrap;

    // test 1: simple text wraps at 100 pixels

    g = svg.append('g')
                    .attr('transform','translate(50 50)');

    text = g.append('text')
                    .attr('x',0)
                    .attr('y',10)
                    .text('This is some text, yo. It should wrap, yo.');

    wrap = d3.svg.textWrap(text,100);

    g.append('rect')
        .attr({
            'class': 'target bounds',
            'x': 0,
            'y': 0,
            'width': 100,
            'height': 100
        });


    // test 2: simple text wraps at 100 pixels, gets cut off if goes over height

    g = svg.append('g')
                    .attr('transform','translate(250 50)');

    text = g.append('text')
                    .attr('x',0)
                    .attr('y',10)
                    .text('This is some text, yo. It should wrap and get cut off, yo. This is some text, yo. It should wrap and get cut off, yo.');

    wrap = d3.svg.textWrap(text,100)
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


})();