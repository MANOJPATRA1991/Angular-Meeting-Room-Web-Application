//service
myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', function($rootScope, $firebaseAuth, $firebaseObject, $location){

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyBNhlCC_Z_V-111op052oYn-W_oqOvgUXI",
    authDomain: "angular-data-abf0f.firebaseapp.com",
    databaseURL: "https://angular-data-abf0f.firebaseio.com",
    storageBucket: "",
    };
    
    //app should be initialized only once
    firebase.initializeApp(config);
    
    var auth = $firebaseAuth(firebase.auth());
    
    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
            var userRef = firebase.database().ref('users/' + authUser.uid);
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
        }else{
            $rootScope.currentUser = '';
        }
    })
    
    var myObject = {
        login: function(user){
          auth.$signInWithEmailAndPassword(user.email, user.password).then(function(){
              $location.path('/meetings');
          }).catch(function(error){
            $rootScope.message = error.message;
          });
        },//login

        logout: function(){
            return auth.$signOut();
        }, //logout
        
        requireAuth: function(){
            return auth.$requireSignIn();
        }, //require Authentication
                
        register: function(user){
            auth.$createUserWithEmailAndPassword(user.email, user.password).then(function(regUser){
                 firebase.database().ref('users/' + regUser.uid).set({
                    date: firebase.database.ServerValue.TIMESTAMP,
                    regUser: regUser.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }); //user info

                myObject.login(user);
                
            }).catch(function(error){
                $rootScope.message = error.message;
            });//createUser
        }//register
    };
    
    return myObject;
}]); //factory
