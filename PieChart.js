var width=400,height=325;
		var myEntireData;
           
            var myData_pie;
            var data1;
            var data1_pie=[]
            var maximum_bar=0,minimum_bar=0;
            
            var margin_pie = {top: 10, right: 10, bottom: 30, left: 20};
            var svgWidth_pie = width - margin_pie.left - margin_pie.right;
            var svgHeight_pie = height-margin_pie.top - margin_pie.bottom;

            var margin_pie2 = {top: 10, right: 10, bottom: 30, left: 20};
            var svgWidth_pie2 = width - margin_pie2.left - margin_pie2.right;
            var svgHeight_pie2 = height-margin_pie2.top - margin_pie2.bottom;
		/*var svg=d3.select("body").append("svg")
				   .attr("width",width).attr("height",height)
				   .style("background","pink");*/
		 function loadPieData()
            {
          d3.csv("https://raw.githubusercontent.com/apogaku/VAProject/e7e75ac959cc7b62a87db038b0ba75defc491d37/pqid_combined%20prodoffers.csv",function(data)
              {
                
                  myEntireData=data;
           
                 d3.select("#svg_pie")
                            .attr("width", svgWidth_pie + margin_pie.left + margin_pie.right)
                            .attr("height", svgHeight_pie + margin_pie.top + margin_pie.bottom)
                            .append("g")
                            .attr("id", "svg_pie_g_id")
                            .attr("transform", "translate(" + margin_pie.left + "," + margin_pie.top + ")");            
                   d3.select("#svg_pie2")
                            .attr("width", svgWidth_pie2 + margin_pie2.left + margin_pie2.right)
                            .attr("height", svgHeight_pie2 + margin_pie2.top + margin_pie2.bottom)
                            .append("g")
                            .attr("id", "svg_pie2_g_id")
                            .attr("transform", "translate(" + margin_pie2.left + "," + margin_pie2.top + ")");     
                generateDataPie();
                createPieChart();
                generateDataPie2();
                createPie2Chart();
                
              }     );
			        }
 			function generateDataPie2()
            {

var monthNames = {
  "Jan": 1,
  "Feb": 2,
  "March": 3,
  "April": 4,
  "May": 5,
  "June": 6,
  "july": 7,
  "Aug": 8,
  "Sep": 9,
 
};

     d3.select("#title_pie2").text("Pie Chart-Returning");
          var temp2 = {}
		         var temp_2 = d3.nest()
		                         .key(function(d) { return d.Created_On;})
		                          .key(function(d) { return d.Pqid_Type; })
  								            .rollup(function(v) { return v.length; })
                                   .entries(myEntireData); 

data1_pie=[];

              for(var i=0;i<temp_2.length;i++)
              {      
                temp2={}   

                temp2.key=temp_2[i].key;
                if(temp_2[i].key!="Jan"){
                temp2.value=temp_2[i].values[1].value;}
               
                data1_pie.push(temp2);
               // console.log(data1_pie);

              }
                console.log(data1_pie);
               



data1_pie.sort(function(a, b) {
   console.log(a);
  // sort based on the value in the monthNames object
  return monthNames[a.key] - monthNames[b.key];
});
}
      function generateDataPie()
            {

var monthNames = {
  "Jan": 1,
  "Feb": 2,
  "March": 3,
  "April": 4,
  "May": 5,
  "June": 6,
  "july": 7,
  "Aug": 8,
  "Sep": 9,
 
};

     d3.select("#title_pie").text("Pie Chart-New");
          var temp1 = {}
             var temp = d3.nest()
                             .key(function(d) { return d.Created_On;})
                              .key(function(d) { return d.Pqid_Type; })
                              .rollup(function(v) { return v.length; })
                                   .entries(myEntireData); 



              for(var i=0;i<temp.length;i++)
              {      
                temp1={}   
                temp1.key=temp[i].key;
                temp1.value=temp[i].values[0].value;
               
                data1_pie.push(temp1);
               // console.log(data1_pie);

              }
                console.log(data1_pie);
               



data1_pie.sort(function(a, b) {
   console.log(a);
  // sort based on the value in the monthNames object
  return monthNames[a.key] - monthNames[b.key];
});
}
function createPieChart(){

var r=100;
    /*var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);
    var data_pie =d3.pie().value(function(d) { return d.value; }) //this will create arc data for us given a list of values
//.value(function(d) { return d.value; }); */


var pie = d3.pie()
            .value(function(d) { return d.value })

var slices = pie(data1_pie);

var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(100);

// helper that returns a color based on an ID
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select('#svg_pie_g_id').attr("class","pie");

var g = svg.append('g')
  .attr('transform', 'translate(200, 75)');
// Define the div for the tooltip
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);
var arcGraph =g.selectAll('path.slice')
  .data(slices)
    .enter();
arcGraph.append('path')
        .attr('class', 'slice')
        .attr('d', arc)
        .attr('fill', function(d) {
          return color(d.data.key);
        })
    .on("mouseover", function(d) {    
            div.transition()    
                .duration(200)    
                .style("opacity", .9);    
            div .html(d.data.value)  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })          
        .on("mouseout", function(d) {   
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });
/*arcGraph.append("text")
.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })

    .attr("dy", "0.35em")
    .text(function(d){return d.data.value});
*/


// building a legend is as simple as binding
// more elements to the same data. in this case,
// <text> tags
// define legend
var legend = svg.append('g')
.selectAll('.legend') // selecting elements with class 'legend'
  .data(slices) // refers to an array of labels from our dataset
  .enter() // creates placeholder
  .append('g') // replace placeholders with g elements
  .attr('class', 'legend')
  .attr('transform', function(d, i) {                   
    var height = 25; // height of element is the height of the colored square plus the spacing      
    var offset = slices.length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
    var horz =  10; // the legend is shifted to the left to make room for the text
    var vert = i * height - offset; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'               
      return 'translate(' + horz + ',' + vert + ')'; //return translation       
   });
 // each g is given a legend class
 
// adding colored squares to legend
legend.append('rect') // append rectangle squares to legend                                   
  .attr('width', 25) // width of rect size is defined above                        
  .attr('height', 25) // height of rect size is defined above                      
  //.style('fill', color)
  .attr('fill', function(d) { return color(  d.data.key); }) // each fill is passed a color
  .style('stroke', color); // each stroke is passed a color
legend.append('text')                                    
  .attr('x', 25 + 6)
  .attr('y', 25 - 6)
  .text(function(d) { return d.data.key; });

/*var legend=svg.append('g')
  .attr('class', 'legend')
    .selectAll('text')
    .data(slices)
      .enter()
        .append('text')
          .text(function(d) { return '* ' + d.data.key; })
          .attr('fill', function(d) { return color(  d.data.key); })
          .attr('y', function(d, i) { return 20 * (i + 1); }) ;

  legend.append('rect') // append rectangle squares to legend                                   
  .attr('width', 25) // width of rect size is defined above                        
  .attr('height', 10) // height of rect size is defined above                      
  .style('fill', color) // each fill is passed a color
  .style('stroke', color) // each stroke is passed a color
*/
}
function createPie2Chart(){

var r=100;
    /*var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);
    var data_pie =d3.pie().value(function(d) { return d.value; }) //this will create arc data for us given a list of values
//.value(function(d) { return d.value; }); */


var pie = d3.pie()
            .value(function(d) { return d.value })

var slices = pie(data1_pie);

var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(100);

// helper that returns a color based on an ID
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select('#svg_pie2_g_id').attr("class","pie");

var g = svg.append('g')
  .attr('transform', 'translate(200, 75)');
// Define the div for the tooltip
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);
var arcGraph =g.selectAll('path.slice')
  .data(slices)
    .enter();
arcGraph.append('path')
        .attr('class', 'slice')
        .attr('d', arc)
        .attr('fill', function(d) {
          return color(d.data.key);
        })
    .on("mouseover", function(d) {    
            div.transition()    
                .duration(200)    
                .style("opacity", .9);    
            div .html(d.data.value)  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })          
        .on("mouseout", function(d) {   
            div.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });
/*arcGraph.append("text")
.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })

    .attr("dy", "0.35em")
    .text(function(d){return d.data.value});
*/


// building a legend is as simple as binding
// more elements to the same data. in this case,
// <text> tags
svg.append('g')
  .attr('class', 'legend')
    .selectAll('text')
    .data(slices)
      .enter()
        .append('text')
          .text(function(d) { return '* ' + d.data.key; })
          .attr('fill', function(d) { return color(  d.data.key); })
          .attr('y', function(d, i) { return 20 * (i + 1); }) 

}
window.onload = loadPieData;