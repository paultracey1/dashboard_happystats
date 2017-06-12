queue()
   .defer(d3.json, "/happystats/projects")
   .await(makeGraphs);
 
function makeGraphs(error, projectsJson) {
 
   //Clean projectsJson data
   var happystatistics = projectsJson;



   happystatistics.forEach(function (d) {
       if(d['Happiness Score'] > 5)
           d["Sentiment"] = "Happy";
        else
           d["Sentiment"] = "Unhappy";

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


 
 
   //Calculate metrics
   var numProjectsByCountry = countryDim.group();
   var numProjectsByRegion = regionDim.group();
   var numProjectsByFamily = familyDim.group();
   var sentimentCount = sentimentDim.group();

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
   var regionHappiness = dc.barChart("#time-chart");
   var resourceTypeChart = dc.rowChart("#resource-type-row-chart");
   var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
    var regionHappinessChart = dc.barChart("#region-happiness-chart")
//    var numberProjectsND = dc.numberDisplay("#number-projects-nd");
//    var totalDonationsND = dc.numberDisplay("#total-donations-nd");
   var fundingStatusChart = dc.pieChart("#funding-chart");

 
 
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
 
 regionHappiness
       .width(1250)
       .height(200)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
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
       .group(averagehappinessbyregion)
       .valueAccessor(function(p){
           return p.value.average;
       })

       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)
       .elasticY(true)
       .xAxisLabel("Year")
       .yAxis().ticks(4);
 
   resourceTypeChart
       .width(300)
       .height(250)
       .dimension(sentimentDim)
       .group(sentimentCount)
       .xAxis().ticks(10);
 
    povertyLevelChart
       .width(300)
       .height(250)
       .dimension(regionDim)
       .group(numProjectsByRegion)
       .xAxis().ticks(4);
 
   fundingStatusChart
       .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(regionDim)
       .group(numProjectsByRegion);

 
 
   dc.renderAll();
}