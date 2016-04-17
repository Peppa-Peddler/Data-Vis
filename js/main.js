var radarVis = op.vis.radarVis({
  parentId: "radar-vis",
  height: 550,
  width: 850
});

d3.json("data.json", function(data) {

  var ic = 1;
  data.candidatos.forEach(function(elem) {
    var candidato = elem.candidato;
    $("#img-p" + ic).attr("src", candidato.field_foto);
    $("#label-p" + ic).text(candidato.field_nombres + " " + candidato.field_apellido_paterno);
    ic++;
  });

  radarVis.prerender(data.candidatos);
})


d3.select("#save").on("click", function() {
  var html = d3.select("#radar-vis svg")
    .attr("version", 1.1)
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .node().parentNode.innerHTML;

  var imgsrc = 'data:image/svg+xml;base64,' + btoa(html);
  var img = '<img src="' + imgsrc + '">';
  d3.select("#svgdataurl").html(img);


  var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

  var image = new Image;
  image.src = imgsrc;
  image.onload = function() {
    context.drawImage(image, 0, 0);

    var canvasdata = canvas.toDataURL("image/png");

    var pngimg = '<img src="' + canvasdata + '">';
    d3.select("#pngdataurl").html(pngimg);

    var a = document.createElement("a");
    a.href = canvasdata;
    a.click();
  };

});
