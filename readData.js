
    function filesObj(){
  		this.csvFiles = ["domain-explicit-communication-1.csv", "domain-implicit-communication-1.csv", "domain-permission-enforcement-1.csv", 
  							"domain-permission-granted-1.csv", "domain-permission-usage-1.csv"];
  		this.xmlFiles = ["analysisResults-0.xml", "app-edu.uci.seal.fungame.xml", "app-edu.uci.seal.messaging.xml"];
  	}

    function readCsvFiles(fObject){
    	csvObjArr = []; //implicit, explicit, enforcement, granted, uses
    	csvOrderArr = ["implicit", "explicit", "enforcement", "granted", "use"]
        var result = [];
    	fObject.csvFiles.forEach(function(element) {
    		if(element.indexOf("implicit")>=0){
    			result = readCsv1(element);
    		}
		});
        return result;
    }
    
    function getJsonLength(json){
        var jsonLength=0;
            for (var i in json) {
                jsonLength++;
            }
        return jsonLength;
    }

    /*function readCsv(file){
    	var nodes = [];
    	var links = [];
    	var apps = [];
        var rowNum = 0;
        d3.csv(file)
            .row(function(data){
                var app = ""+data.Package;
                if(apps.indexOf(app) < 0){
                    apps.push(app);
                } 
            }).get(function(error, rows) { console.log(rows); });
    	d3.csv(file)
    		.row(function(data) {
    			var group = 0;
    			var node = {id:rowNum, group:app};
    			nodes.push(node);
    			for(var i=0;i<getJsonLength(data)-4;i++){
    				if(data[i] == 1){
    					var link={source:rowNum, target:i, value:10};
    					links.push(link);
    					for(var j=0; j<apps.length;j++){
    						if(nodes[i].group == apps[j]){
    							var link1 = {source:apps[j], target:nodes[i].group, value:3};
    							links.push(link1);
                                break;
    						}
    					}
    				}
    			}
                rowNum = rowNum+1;
    		}).get(function(error, rows) { console.log(rows); });
        for(var i=0;i<apps.length;i++){
            for(var j=0;j<nodes.length;j++){
                if(apps[i]==nodes[j].group){
                    var link = {source:apps[i], target:nodes[j].id, value:1};
                    links.push(link);
                }
            }
        }

        for(var i=0;i<apps.length;i++){
            var node = {id:apps[i], group:apps[i]};
            nodes.push(node);
        }
    	var result = {nodes:nodes, links:links};
    	return result;
    }*/

    async function readCsv1(file){ 
        result = {nodes:[], links:[]};       
        d3.csv(file, function(error,data){
            var nodes = [];
            var links = [];
            var apps = [];
            for(var i=0; i<data.length;i++){
                var app = data[i].Package;
                if(apps.indexOf(app) < 0){
                    apps.push(app);
                } 
                var node = {id:data[i].ID, group:app}
                nodes.push(node);
            }
            for(var rowNum=0;rowNum<data.length;rowNum++){
                var app = data[rowNum].Package;
                for(var i=0;i<getJsonLength(data[rowNum])-4;i++){
                    if(data[rowNum][i] == 1){
                        var link={source:rowNum, target:i, value:1};
                        links.push(link);
                        for(var j=0; j<apps.length;j++){
                            if(nodes[i].group == apps[j] && app != apps[j]){
                                var link1 = {source:app, target:nodes[i].group, value:4};
                                links.push(link1);
                                break;
                            }
                        }
                    }
                }
            }
            for(var i=0;i<nodes.length;i++){
                for(var j=0;j<apps.length;j++){
                    if(nodes[i].group == apps[j]){
                        var link = {source:apps[j], target:i, value:1};
                        links.push(link);
                    }
                }
            }
            for(var i=0;i<apps.length;i++){
                var node = {id:apps[i], group:apps[i]};
                nodes.push(node);
            }
            result = {nodes:nodes, links:links};
            console.log(result);
        });
        await sleep(2000);
        console.log(result);
        return result;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getResult(){
    	var fObject = new filesObj();
    	return readCsvFiles(fObject);
	}

    Window.getResult = getResult;	