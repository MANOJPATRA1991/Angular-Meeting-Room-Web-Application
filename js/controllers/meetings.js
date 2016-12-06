myApp.controller('MeetingsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', function($scope, $rootScope, $firebaseAuth, $firebaseArray){
                                        
    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyBNhlCC_Z_V-111op052oYn-W_oqOvgUXI",
    authDomain: "angular-data-abf0f.firebaseapp.com",
    databaseURL: "https://angular-data-abf0f.firebaseio.com",
    storageBucket: "",
    };
                                        
    var auth = $firebaseAuth(firebase.auth());
                                    
    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
            var meetingsRef = firebase.database().ref('users/' + $rootScope.currentUser.$id + '/meetings');
            var meetingsInfo = $firebaseArray(meetingsRef);
            $scope.meetings = meetingsInfo;
            
            meetingsInfo.$loaded().then(function(data){
                $rootScope.meetingsCount = meetingsInfo.length;
            });//make sure meeting data is loaded
            
            meetingsInfo.$watch(function(data){
                $rootScope.meetingsCount = meetingsInfo.length;
            });
            
            $scope.addMeeting = function(){
                meetingsInfo.$add({
                    name: $scope.meetingname,
                    date: firebase.database.ServerValue.TIMESTAMP
                }).then(function(){
                    $scope.meetingname = '';
                });//promise
            };//addMeeting
            
            $scope.deleteMeeting = function(key){
                meetingsInfo.$remove(key);
            };//delete meeting
        }//User authenticated
    });//onAuthStateChanged
}]);//controller