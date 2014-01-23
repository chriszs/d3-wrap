d3.svg.textWrap = function (text, width, height) {
    var overflow = false,
        separator = ' ',
        lineHeight = 1.4; // ems

    /* core wrap code by Mike Bostock
    https://github.com/mbostock/d3/issues/1642
    modified by Chris Zubak-Skees */

    function wrap () {
        text.each(function() {
            var text = d3.select(this);

            var splitOn = /\s+/;
            if (separator !== ' ') {
                splitOn = separator;
            }

            var words = text.text().split(splitOn).reverse();
            
            var word,
                line = [],
                lineNumber = 0,
                x = text.attr('x'),
                y = text.attr('y'),
                dy = parseFloat(text.attr('dy')),
                tspan = text.text(null)
                            .append('tspan')
                            .attr('x', x)
                            .attr('y', y)
                            .attr('dy', dy + 'em');

            if (!dy) dy = 0;

            word = words.pop();

            while (word || word === '') {
                if (!height || (lineNumber * lineHeight + dy) < height) {
                    line.push(word);
                    tspan.text(line.join(separator) + separator);
                    if (tspan.node().getComputedTextLength() > width && line.length > 1) {
                            line.pop();
                            tspan.text(line.join(separator) + separator);
                            if (!height || ((lineNumber+1) * lineHeight + dy) < height) {
                                line = [word];
                                tspan = text.append('tspan')
                                                .attr('x', x)
                                                .attr('y', y)
                                                .attr('dy', (++lineNumber * lineHeight + dy) + 'em')
                                                .text(word);
                            }
                            else {
                                overflow = true;
                                break;
                            }
                    }
                }
                else {
                    overflow = true;
                }

                word = words.pop();
            }
        });
    }

    wrap.separator = function (sep) {
        if (!arguments.length) return separator;
        separator = sep;

        wrap();

        return wrap;
    };

    wrap.height = function (ems) {
        if (!arguments.length) return height;
        height = ems;

        wrap();

        return wrap;
    };

    wrap.width = function (pixels) {
        if (!arguments.length) return width;
        width = pixels;

        wrap();

        return wrap;
    };

    wrap.lineHeight = function (ems) {
        if (!arguments.length) return lineHeight;
        lineHeight = ems;

        wrap();

        return wrap;
    };

    wrap.overflow = function () {
        return overflow;
    };

    wrap();

    return wrap;
};