//parameters of the route are going to come through $routeParams
myApp.controller('CheckInsController', ['$scope', '$rootScope', '$firebaseObject', '$firebaseArray', '$routeParams', '$location', function($scope, $rootScope, $firebaseObject, $firebaseArray, $routeParams, $location){
    
    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyBNhlCC_Z_V-111op052oYn-W_oqOvgUXI",
    authDomain: "angular-data-abf0f.firebaseapp.com",
    databaseURL: "https://angular-data-abf0f.firebaseio.com",
    storageBucket: "",
    };

    $scope.meetingId = $routeParams.mId;
    $scope.userId = $routeParams.uId;
    
    var ref = firebase.database().ref('users/' + $scope.userId + '/meetings/' + $scope.meetingId + '/checkins');
    
    var checkinsList = $firebaseArray(ref);
    $scope.checkins = checkinsList;
    
    $scope.order = "firstname";
    $scope.direction = null;
    $scope.query = '';
    $scope.recordId = '';
    
    $scope.addCheckin = function(){
        var checkinInfo = $firebaseArray(ref);
        var myData = {
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email,
            date: firebase.database.ServerValue.TIMESTAMP
        };//myData
        checkinInfo.$add(myData).then(function(){
            $location.path('/checkins/' + $scope.userId + '/' + $scope.meetingId + '/checkinsList');
        });//send data to firebase
    }; //AddCheckin
    
    $scope.deleteCheckin = function(id){
        var refDel = firebase.database().ref('users/' + $scope.userId + '/meetings/' + $scope.meetingId + '/checkins/' + id);
        var record = $firebaseObject(refDel);
        record.$remove(id);
    };
    
    
    $scope.pickRandom = function(){
        var randomRecordId = Math.round(Math.random()*(checkinsList.length - 1));
        $scope.recordId = checkinsList.$keyAt(randomRecordId);
    };
    
    $scope.showLove = function(myCheckin){
        myCheckin.show = !myCheckin.show;
        
        if(myCheckin.userState == 'expanded'){
            myCheckin.userState = '';
        }else{
            myCheckin.userState = 'expanded';
        }
    }; //show love
    
    $scope.giveLove = function(myCheckin, myGift){
        var refLove = firebase.database().ref('users/' + $scope.userId + '/meetings/' + $scope.meetingId + '/checkins/' + myCheckin.$id + '/awards');
        var  checkinsArray = $firebaseArray(refLove);
        var myData = {
            name: myGift,
            date: firebase.database.ServerValue.TIMESTAMP
        }; //myData
        checkinsArray.$add(myData);
    }; //give love
    
    $scope.deleteLove = function(checkinId, award){
        var refLove = firebase.database().ref('users/' + $scope.userId + '/meetings/' + $scope.meetingId + '/checkins/' + checkinId + '/awards');
        var record = $firebaseObject(refLove);
        record.$remove(award);
    }
}]);//controller