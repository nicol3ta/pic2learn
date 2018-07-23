var Main = function() {
    var myParam = location.search.split('myParam=')[1];
    var urlParams = myParam.split('&');
    console.log(urlParams);
}

Main();
