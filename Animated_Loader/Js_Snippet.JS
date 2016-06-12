$(function(){
    var $container = $('.chart-container'),
        τ = 2 * Math.PI,
        width = $container.width(),
        height = $container.height(),
        outerRadius = Math.min(width,height)/2,
        innerRadius = (outerRadius/5)*4,
        fontSize = (Math.min(width,height)/6);
    
    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0);

    var svg = d3.select('.chart-container').append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
        .attr('preserveAspectRatio','xMinYMin')
        .append("g")
        .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

    var text = svg.append("text")
        .text('0%')
        .attr("text-anchor", "middle")
        .style("font-size",fontSize+'px')
        .attr("dy",fontSize/3)
        .attr("dx",2);
    
    var background = svg.append("path")
        .datum({endAngle: τ})
        .style("fill", "#7cc35f")
        .attr("d", arc);

    var foreground = svg.append("path")
        .datum({endAngle: 0 * τ})
        .style("fill", "#57893e")
        .attr("d", arc);

    setInterval(function() {
      foreground.transition()
          .duration(750)
          .call(arcTween, Math.random() * τ);
    }, 1500);

    function arcTween(transition, newAngle) {

        transition.attrTween("d", function(d) {
    
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            
            return function(t) {
                
                d.endAngle = interpolate(t);
                
                text.text(Math.round((d.endAngle/τ)*100)+'%');
                
                return arc(d);
            };
        });
    }
});
