queue()
   .defer(d3.json, "/happystats/projects")
   .await(makeGraphs);
 
function makeGraphs(error, projectsJson) {
 
   //Clean projectsJson data
   var happystatistics = projectsJson;



   happystatistics.forEach(function (d) {
       if(d['Happiness Score'] > 6.6)
           d["Sentiment"] = "High Happiness";
        else if(d['Happiness Score'] > 5.2)
            d["Sentiment"] = "Medium Happiness";
        else if(d['Happiness Score'] > 3.8)
            d["Sentiment"] = "Low Happiness";
        else
           d["Sentiment"] = "Very Low Happiness";
   });


   happystatistics.forEach(function (d) {
       if(d['Family'] > 1.1)
           d["familylvl"] = "High Family Count";
        else if(d['Family'] > 0.9)
            d["familylvl"] = "Medium Family Count";
        else
           d["familylvl"] = "Low Family Count";
   });

   happystatistics.forEach(function (d) {
       if(d['Health (Life Expectancy)'] > .75)
           d["healthlvl"] = "High";
        else if(d['Health (Life Expectancy)'] > .6)
            d["healthlvl"] = "Medium";
        else
           d["healthlvl"] = "Low";
   });

   happystatistics.forEach(function (d) {
       if(d['Economy (GDP per Capita)'] > 1.05)
           d["economylvl"] = "High GDP";
        else if(d['Economy (GDP per Capita)'] > .65)
            d["economylvl"] = "Medium GDP";
        else
           d["economylvl"] = "Low GDP";
   });

   happystatistics.forEach(function (d) {
       if(d['Freedom'] > .48)
           d["freedomlvl"] = "High Freedom";
        else if(d['Freedom'] > .35)
            d["freedomlvl"] = "Medium Freedom";
        else
           d["freedomlvl"] = "Low Freedom";
   });

    happystatistics.forEach(function (d) {
       if(d['Trust (Government Corruption)'] > .137)
           d["trustlvl"] = "High Trust";
        else if(d['Trust (Government Corruption)'] > .06)
            d["trustlvl"] = "Medium Trust";
        else
           d["trustlvl"] = "Low Trust";
   });

   happystatistics.forEach(function (d) {
       if(d['Generosity'] > .25)
           d["generositylvl"] = "High Generosity";
        else if(d['Generosity'] > .15)
            d["generositylvl"] = "Medium Generosity";
        else
           d["generositylvl"] = "Low Generosity";
   });
 
 
   //Create a Crossfilter instance
   var ndx = crossfilter(happystatistics);


   //Define Dimensions
   var countryDim = ndx.dimension(function (d) {
       return d["Country"];
   });
   var regionDim = ndx.dimension(function (d) {
       return d["Region"];
   });
   var familyDim = ndx.dimension(function (d) {
       return d["Family"];
   });
   var sentimentDim = ndx.dimension(function (d) {
       return d["Sentiment"];
   });
   var familylvlDim = ndx.dimension(function (d) {
       return d["familylvl"];
   });
    var healthlvlDim = ndx.dimension(function (d) {
       return d["healthlvl"];
   });
   var economylvlDim = ndx.dimension(function (d) {
       return d["economylvl"];
   });
   var freedomlvlDim = ndx.dimension(function (d) {
       return d["freedomlvl"];
   });
   var trustlvlDim = ndx.dimension(function (d) {
       return d["trustlvl"];
   });
   var generositylvlDim = ndx.dimension(function (d) {
       return d["generositylvl"];
   });

   var happyCountriesDim = ndx.dimension(function (d) {
       return d["Happiness Score"];
   });




 
 
   //Calculate metrics
   var numProjectsByCountry = countryDim.group();
   var numProjectsByRegion = regionDim.group();
   var numProjectsByFamily = familyDim.group();
   var sentimentCount = sentimentDim.group();

   var familylvlCount = familylvlDim.group();
   var healthlvlCount = healthlvlDim.group();
   var economylvlCount = economylvlDim.group();
   var freedomlvlCount = freedomlvlDim.group();
   var trustlvlCount = trustlvlDim.group();
   var generositylvlCount = generositylvlDim.group();

   var happyCountries = happyCountriesDim.group();

   var totalhappinessbyregion = regionDim.group().reduceSum(function(d){
       return d["Happiness Score"]
   })
   var averagehappinessbyregion = regionDim.group().reduce(
    function (p, v){
        p.total += v['Happiness Score'];
        p.count +=1;
        if (p.total == 0) {
            p.average = 0;
        } else {
            p.average = p.total/p.count;
        }
        return p;
    },

    function(p, v){
        p.total -= v['Happiness Score'];
        p.count -= 1;
        if (p.count == 0) {
            p.total = 0;
            p.average = 0;
        } else {
            p.average = p.total/p.count;
        }
        return p;
    },

    function() {
        return {total:0, count:0, average:0}
    } 
   )





   var totalfamilybyregion = regionDim.group().reduceSum(function(d){
       return d["Family"]
   })
   var averagefamilybyregion = regionDim.group().reduce(
    function (p, v){
        p.total += v['Family'];
        p.count +=1;
        if (p.total == 0) {
            p.average = 0;
        } else {
            p.average = p.total/p.count;
        }
        return p;
    },

    function(p, v){
        p.total -= v['Family'];
        p.count -= 1;
        if (p.count == 0) {
            p.total = 0;
            p.average = 0;
        } else {
            p.average = p.total/p.count;
        }
        return p;
    },

    function() {
        return {total:0, count:0, average:0}
    } 
   )



   var totalhealthbyregion = regionDim.group().reduceSum(function(d){
       return d["Health (Life Expectancy)"]
   })
   var totalhealthbyregion = regionDim.group().reduce(
    function (p, v){
        p.total += v['Health (Life Expectancy)'];
        p.count +=1;
        if (p.total == 0) {
            p.average = 0;
        } else {
            p.average = p.total/p.count;
        }
        return p;
    },

    function(p, v){
        p.total -= v['Health (Life Expectancy)'];
        p.count -= 1;
        if (p.count == 0) {
            p.total = 0;
            p.average = 0;
        } else {
            p.average = p.total/p.count;
        }
        return p;
    },

    function() {
        return {total:0, count:0, average:0}
    } 
   )


   var totaleconomybyregion = regionDim.group().reduceSum(function(d){
       return d["Economy (GDP per Capita)"]
   })
   var totaleconomybyregion = regionDim.group().reduce(
    function (p, v){
        p.total += v['Economy (GDP per Capita)'];
        p.count +=1;
        if (p.total == 0) {
            p.average = 0;
        } else {
            p.average = p.total/p.count;
        }
        return p;
    },

    function(p, v){
        p.total -= v['Economy (GDP per Capita)'];
        p.count -= 1;
        if (p.count == 0) {
            p.total = 0;
            p.average = 0;
        } else {
            p.average = p.total/p.count;
        }
        return p;
    },

    function() {
        return {total:0, count:0, average:0}
    } 
   )




 
 
   var all = ndx.groupAll();

 
   //Charts
   var regionHappiness = dc.barChart("#regionHappiness");
   var resourceTypeChart = dc.rowChart("#resource-type-row-chart");
   var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
    var regionHappinessChart = dc.barChart("#region-happiness-chart")
//    var numberProjectsND = dc.numberDisplay("#number-projects-nd");
//    var totalDonationsND = dc.numberDisplay("#total-donations-nd");
   var familypiechart = dc.pieChart("#family-chart");
   var healthpiechart = dc.pieChart("#health-chart");
   var happyCounts = dc.pieChart("#happy-counts");
   var economypiechart = dc.pieChart("#economy-chart");
   var freedompiechart = dc.pieChart("#freedom-chart");
   var trustpiechart = dc.pieChart("#trust-chart");
   var generositypiechart = dc.pieChart("#generosity-chart");


   

 
 
//    selectField = dc.selectMenu('#menu-select')
//        .dimension(stateDim)
//        .group(stateGroup);
 
 
//    numberProjectsND
//        .formatNumber(d3.format("d"))
//        .valueAccessor(function (d) {
//            return d;
//        })
//        .group(all);
 
//    totalDonationsND
//        .formatNumber(d3.format("d"))
//        .valueAccessor(function (d) {
//            return d;
//        })
//        .group(totalDonations)
//        .formatNumber(d3.format(".3s"));
 
 
happyCounts
       .height(200)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(sentimentDim)
       .group(sentimentCount);


 regionHappiness
       .width(1000)
       .height(200)
       .margins({top: 10, right: 50, bottom: 80, left: 80})
       .dimension(regionDim)
       .group(averagehappinessbyregion)
       .valueAccessor(function(p){
           return p.value.average;
       })
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)
       .elasticY(true)
       .xAxisLabel("Regions")
       .yAxis().ticks(4)
       ;

 regionHappinessChart
       .width(800)
       .height(200)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(regionDim)
       .group(sentimentCount)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)
       .elasticY(true)
       .xAxisLabel("Year")
       .yAxis().ticks(4);
 
   resourceTypeChart
       .width(300)
       .height(200)
       .elasticX(true)
       .dimension(sentimentDim)
       .group(sentimentCount)
       .xAxis().ticks(10);




    povertyLevelChart
       .width(300)
       .height(250)
       .dimension(regionDim)
       .group(numProjectsByRegion)
       .xAxis().ticks(4);
 
   familypiechart
       .height(220)
       .width(180)
       .radius(90)
       .innerRadius(0)
       .transitionDuration(1500)
       .dimension(familylvlDim)
       .group(familylvlCount)
       ;



    healthpiechart
       .height(220)
       .width(180)
       .radius(90)
       .innerRadius(0)
       .transitionDuration(1500)
       .dimension(healthlvlDim)
       .group(healthlvlCount);

    economypiechart
       .height(220)
       .width(180)
       .radius(90)
       .innerRadius(0)
       .transitionDuration(1500)
       .dimension(economylvlDim)
       .group(economylvlCount);

    freedompiechart
       .height(220)
       .width(180)
       .radius(90)
       .innerRadius(0)
       .transitionDuration(1500)
       .dimension(freedomlvlDim)
       .group(freedomlvlCount);

    trustpiechart
       .height(220)
       .width(180)
       .radius(90)
       .innerRadius(0)
       .transitionDuration(1500)
       .dimension(trustlvlDim)
       .group(trustlvlCount);

    generositypiechart
       .height(220)
       .width(180)
       .radius(90)
       .innerRadius(0)
       .transitionDuration(1500)
       .dimension(generositylvlDim)
       .group(generositylvlCount);



    selectField = dc.selectMenu('#menu-select')
       .dimension(happyCountriesDim)
       .group(happyCountries)


    //    happyCounts
    //    .height(220)
    //    .radius(90)
    //    .innerRadius(40)
    //    .transitionDuration(1500)
    //    .dimension(regionDim)
    //    .group(averagehappinessbyregion)
    //    .valueAccessor(function(p){
    //        return p.value.average;
    //    })



// var chartWidth = $("pieChart").width();
// var pieRadius = 200;
// if(chartWidth >= 480){
//     pieRadius = 200;
// } else {
//     pieRadius = chartWidth * 0.3;
// }

// .width(chartWidth)
// .radius(pieRadius)




 
 
   dc.renderAll();



function AddXAxis(chartToUpdate, displayText)
{
    chartToUpdate.svg()
                .append("text")
                .attr("class", "x-axis-label")
                .attr("text-anchor", "middle")
                .attr("x", chartToUpdate.width()/2)
                .attr("y", chartToUpdate.height()+.3)
                .text(displayText);
}
AddXAxis(resourceTypeChart, "Number of countries");
}