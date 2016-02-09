var fp = fp || {
  'version': 0.1,
  'controller': {},
  'viz': {}
};

fp.viz.topContributors = function(options) {

  var self = {};

  for (var key in options) {
    self[key] = options[key];
  }

  self.color = ["#FF848E", "#FFF9E7", "white", "#5ADAFF", "#43A1BD", "#424242", "#FF8978", "black", "#FFC7BD", "#424242"];
  self.candidato = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462'];
  self.parentSelect = "#" + self.parentId;
  self.semaforoC = ['#ffffd4','#fed98e','#fe9929','#cc4c02'];
  self.rugrosC = ["Empleo","Recursos Naturales","Estándares Ambientales","Diversificación productiva","Justicia Económica"];

  self.iniangle = 54*Math.PI/180;

  self.candidatos = 6;
  self.rugros = 5;
  self.semaforo = 4;
  self.rad = self.width/2-150;
  self.cx = self.rad+150;
  self.cy = self.rad+20;

  self.init = function() {
    self.svg = d3.select(self.parentSelect).append("svg")
      .attr("width", self.width)
      .attr("height", self.height);
  };

  self.prerender = function() {

    self.vals = self.svg.selectAll(".txt")
      .data(new Array(self.rugros))
      .enter()
      .append("line")
      .style();

    self.radar = self.svg.selectAll(".radar")
      .data(new Array(self.semaforo))
      .enter()
      .append("polygon")
      .style("fill-opacity", 1)
      .style("fill","#424242")
      .style("stroke", "white")
      .style("stroke-width","0.5")
      .attr("points", function(d, i) {
        var ans = "";
        for (var j = 0 ; j < self.rugros; j++) {
          var angle = 2 * Math.PI / self.rugros;
          var radius = self.rad * (self.semaforo-i) / self.semaforo;
          var pointX = radius * Math.cos(angle * j+self.iniangle);
          var pointY = radius * Math.sin(angle * j+self.iniangle);
          ans += (self.cx + pointX) + "," + (self.cy + pointY) + " ";
        }
        return ans;
      });

      self.lines = self.svg.selectAll(".lin")
        .data(new Array(self.rugros))
        .enter()
        .append("line")
        .attr("stroke","white")
        .attr("stroke-width","0.5")
        .attr("x1",self.cx)
        .attr("y1",self.cy)
        .attr("x2",function(d,i){
          var angle = 2 * Math.PI / self.rugros;
          var radius =  self.rad;
          var pointX = radius * Math.cos(angle * i + self.iniangle);
          return pointX+self.cx;
        })
        .attr("y2",function(d,i){
          var angle = 2 * Math.PI / self.rugros;
          var radius =  self.rad;
          var pointY = radius * Math.sin(angle * i + self.iniangle);
          return pointY+self.cy;
        });

    self.values = self.svg.selectAll(".values")
      .data(new Array(self.candidatos))
      .enter()
      .append("polygon")
      .style("stroke",function(d,i){
        return self.candidato[i];
      }).style("stroke-width",2)
      .style("fill-opacity", 0.05)
      .style("fill", function(d,i){
        return self.candidato[i];
      })
      .attr("points", function(d, i) {
        var ans = "";
        for (var j = 0; j < self.rugros; j++) {
          ans += (self.cx) + "," + (self.cx) + " ";
        }
        return ans;
      });

    self.anchor = ["middle","middle","end","middle","start"];
    self.xD = [0,0,-10,0,+10];
    self.yD = [20,20,0,-5,0];

    self.NI = self.svg.selectAll(".vals")
      .data( self.rugrosC )
      .enter()
      .append("text")
      .attr("class","names")
      .attr("x", function(d,i){
        var angle = 2 * Math.PI / self.rugros;
        var radius =  self.rad;
        var pointX = radius * Math.cos(angle * i+self.iniangle);
        return pointX+self.cx+self.xD[i];
      })
      .attr("y", function(d,i){
        var angle = 2 * Math.PI / self.rugros;
        var radius = self.rad;
        var pointY = radius * Math.sin(angle * i + self.iniangle);
        return pointY+self.cy+self.yD[i];
      })
      .style("text-anchor",function(d,i){
        return self.anchor[i];
      })
      .text(function(d){return d;})
      .style("font-size", 1.5 * self.dx + "px")
      .style("fill", "black");

  };


  self.render = function(data) {
    self.data = data;
    self.values.transition().duration(500).attr("points", function(d, i) {
      var ans = "";
      for (var j = 0; j < self.rugros; j++) {
        var angle = 2 * Math.PI / self.rugros;
        var radius = self.rad * (self.data[i].value[j]) / self.semaforo;
        var pointX = radius * Math.cos(angle * j+self.iniangle);
        var pointY = radius * Math.sin(angle * j+self.iniangle);
        ans += (self.cx + pointX) + "," + (self.cy + pointY) + " ";
      }
      return ans;
    });
  };

  self.removeChords = function() {};
  self.init();
  return self;
};

var data = [{
  value: [0, 0, 0, 0, 0]
}, {
  value: [0, 0, 0, 0, 0]
}, {
  value: [0, 0, 0, 0, 0]
}, {
  value: [0, 0, 0, 0, 0]
}, {
  value: [0, 0, 0, 0, 0]
}, {
  value: [0, 0, 0, 0, 0]
}];

var vals = [{
  value: [1 , 2, 1, 1, 1]
}, {
  value: [2, 1, 4, 4, 1]
}, {
  value: [4, 3, 1, 2, 4]
}, {
  value: [1, 4, 1, 2, 3]
}, {
  value: [2, 1, 3, 1, 4]
}, {
  value: [3, 1, 4, 2, 1]
}];

var topContributorsViz = fp.viz.topContributors({
  parentId: "top-contributors-viz",
  height: 550,
  width: 850
});

topContributorsViz.prerender();

var valsx = [0, 0, 0, 0, 0, 0];

d3.select("#data1")
  .on("click", function() {
    var j = 0;
    if (valsx[j] % 2 === 0) data[j] = vals[j];
    else data[j] = {
      value: [0, 0, 0, 0, 0]
    };
    topContributorsViz.render(data);
    valsx[j]++;
  });

d3.select("#data2")
  .on("click", function() {
    var j = 1;
    if (valsx[j] % 2 === 0) data[j] = vals[j];
    else data[j] = {
      value: [0, 0, 0, 0, 0]
    };
    topContributorsViz.render(data);
    valsx[j]++;
  });
d3.select("#data3")
  .on("click", function() {
    var j = 2;
    if (valsx[j] % 2 === 0) data[j] = vals[j];
    else data[j] = {
      value: [0, 0, 0, 0, 0]
    };
    topContributorsViz.render(data);
    valsx[j]++;
  });

d3.select("#data4")
  .on("click", function() {
    var j = 3;
    if (valsx[j] % 2 === 0) data[j] = vals[j];
    else data[j] = {
      value: [0, 0, 0, 0, 0]
    };
    topContributorsViz.render(data);
    valsx[j]++;
  });

d3.select("#data5")
  .on("click", function() {
    var j = 4;
    if (valsx[j] % 2 === 0) data[j] = vals[j];
    else data[j] = {
      value: [0, 0, 0, 0, 0]
    };
    topContributorsViz.render(data);
    valsx[j]++;
  });
d3.select("#data6")
  .on("click", function() {
    var j = 5;
    if (valsx[j] % 2 === 0) data[j] = vals[j];
    else data[j] = {
      value: [0, 0, 0, 0, 0]
    };
    topContributorsViz.render(data);
    valsx[j]++;
  });
