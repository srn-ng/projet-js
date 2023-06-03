var series = [];
var labels = [];
var data = [{week: "", women: "", men: "", children: ""}];
var weeksElement = document.getElementById('weeks');
var reducedData = {};
var updatedData = [{week: "", visits: "", sex: 'women'}, {week: "", visits: "", sex: 'men'}, {week: "", visits: "", sex: 'men'}];
var updatedSeries = [];
var updatedLabels = [];

for (var i = 0; i < data.length; i++) {
  var weekData = data[i];
  var weekLabel = 'W' + weekData.week;
  labels.push(weekLabel);

  var womenSeries = {name: 'women', data: []};
  womenSeries.data.push(weekData.women);
  series.push(womenSeries);

  var menSeries = {name: 'men', data: []};
  menSeries.data.push(weekData.men);
  series.push(menSeries);

  var childrenSeries = {name: 'children', data: []};
  childrenSeries.data.push(weekData.children);
  series.push(childrenSeries);
}

for (var i = 0; i < labels.length; i++) {
  var weekLabel = labels[i];
  weeksElement.innerHTML += weekLabel + ' ';
}

for (var i = 0; i < updatedData.length; i++) {
  var weekData = updatedData[i];
  var weekNumber = weekData.week;
  reducedData[weekNumber] = reducedData[weekNumber] || {};
  reducedData[weekNumber][weekData.sex] = weekData.visits;
  var weekLabel = 'W' + weekNumber;
  updatedLabels.push(weekLabel);
}

for (var weekNumber in reducedData) {
  if (reducedData.hasOwnProperty(weekNumber)) {
    var weekVisits = reducedData[weekNumber];
    for (var sexCategory in weekVisits) {
      if (weekVisits.hasOwnProperty(sexCategory)) {
        var seriesObj = updatedSeries.find(function(series) {
          return series.name === sexCategory;
        });

        if (!seriesObj) {
          seriesObj = {name: sexCategory, data: []};
          updatedSeries.push(seriesObj);
        }
        seriesObj.data.push(weekVisits[sexCategory]);
      }
    }
  }
}
