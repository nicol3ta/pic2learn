var Main = function() {
    var myParam = location.search.split('myParam=')[1];
    var urlParams = myParam.split('&');
    if (urlParams) {
        urlParams = urlParamns[0].replace(/\s+/g, '');
        // Create request to Bing Translator API
        var xhttp = new XMLHttpRequest();
        var url = 
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        var response = JSON.parse(xhttp.responseText);        
    }
}

//Main();
