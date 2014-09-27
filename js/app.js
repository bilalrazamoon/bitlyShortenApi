/**
 * Created by hafizbilalraza on 9/19/2014.
 */
angular.module('app',[])
    .run(function($rootScope){

    })
    .controller('main',function($scope,$http){
        $scope.p_text='put url to be shorten';
        $scope.copy=false;
        $scope.title='Shorten Url';
        var flag=true;
        $scope.btn_text='Shorten';
        $scope.submit=function(){
                shorten_url();
        };
        var shorten_url=function(){
            console.log($scope.url);
            $http.get('http://api.bitly.com/v3/shorten?login=o_2o5mc6f9a5&apiKey=R_36dc9eb9de6d4d7fa4d89da59a52e491&longUrl='+$scope.url)
                .success(function (data) {
                    $scope.url=data.data.url;
                    $scope.copy=true;
                })
                .error(function(err){
                    console.log(err)
                })
        };
        var client = new ZeroClipboard( document.getElementById("copy-button") );
        client.on( "ready", function( readyEvent ) {
            //alert( "ZeroClipboard SWF is ready!" );

            client.on( "copy", function (event) {
                var clipboard = event.clipboardData;
                clipboard.setData( "text/plain", $scope.url );
                $scope.url='';
                $scope.p_text='Copied, put another url to be shorten';
            });

            client.on( "aftercopy", function( event ) {
                $scope.copy=false;
                $scope.$digest();
             } );

        } );
    });