'use strict';

/**
 * @ngdoc function
 * @name vidPenguin21App.controller:PasswordresetCtrl
 * @description
 * # PasswordresetCtrl
 * Controller of the vidPenguin21App
 */
angular.module('vidPenguin21App')
  .controller('PasswordresetCtrl', function ($scope, Ref, $location) {

    $scope.resetPassword = function(email){
    Ref.resetPassword({
      email: email
    }, function(error) {
      if (error) {
        switch (error.code) {
          case 'INVALID_USER':
            console.log('The specified user account does not exist.');
            window.alert('The specified user account does not exist.');
            break;
          default:
            console.log('Error resetting password:', error);
            window.alert('The specified user account does not exist.');
        }
      } else {
        console.log('Password reset email sent successfully!');
        window.alert('Your new temp password has been sent to your email. Please check your inbox or spam folder');
        $location.path('/feeds');
      }
    });
    };

  });
