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
