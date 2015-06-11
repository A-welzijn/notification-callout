'use strict';
(function (module) {
  try {
    module = angular.module('awelzijn.notificationcallout');
  } catch (e) {
    module = angular.module('awelzijn.notificationcallout', []);
  }
  module.directive('aWelzijnNotificationCallout', [function () {
    return {
      restrict: 'E',
      templateUrl: 'template.html'
    };
  }]);
})();
;