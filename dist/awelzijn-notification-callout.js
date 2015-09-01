'use strict';
(function (module) {
    try {
        module = angular.module('awelzijn.notificationcallout');
    } catch (e) {
        module = angular.module('awelzijn.notificationcallout', ['awelzijn.notificationservice']);
    }

    module.directive('aWelzijnNotificationCallout', [function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/template.html'
        };
    }]);

    module.directive('aWelzijnNotificationCalloutMessage', ['$compile', 'aWelzijnNotificationService', function ($compile, notificationService) {

        var linker = function (scope, element, attrs) {

            scope.removeCallOut = function (type, index) {
                notificationService.removeMessage(type, index);
            };

            var dismissible = (attrs.dismissible == undefined || attrs.dismissible == "") ? false : true;
            var showTitle = (attrs.title == undefined || attrs.title == "") ? false : true;

            var template = "<li> <div class='alert " + attrs.calloutClass + "' ng-class=\"{ 'alert-dismissible': " + dismissible + " }\" role=alert>\n" +
                               "<a ng-show='{{" + dismissible + " }}' class=\"close float-right\" data-dismiss=alert aria-label='Sluit' ng-click='removeCallOut(\"" + attrs.type + "\", " + attrs.index + ")'><i class=\"fa fa-times\"></i></a>\n" +
                               "<strong ng-show='" + showTitle + "'>" + attrs.title + "</strong>" + attrs.message + "</div> </li>";

            element.html(template).show();
            $compile(element.contents())(scope);
        }

        return {
            restrict: 'E',
            replace: true,
            link: linker
        };
    }]);
    
})();
;angular.module('awelzijn.notificationcallout').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/template.html',
    "<ul class=\"errorMessages\">\r" +
    "\n" +
    "      <a-welzijn-notification-callout-message ng-repeat='msg in errors' title='{{msg.title}}' message='{{msg.message}}' callout-class='callout-danger' dismissible='msg.dismissible' data-type='{{msg.type}}' index='{{$index}}' />\r" +
    "\n" +
    "</ul>\r" +
    "\n" +
    "<ul class=\"successMessages\">\r" +
    "\n" +
    "      <a-welzijn-notification-callout-message ng-repeat='msg in messages' title='{{msg.title}}' message='{{msg.message}}' callout-class='callout-success' dismissible='true' data-type='{{msg.type}}' index='{{$index}}' />\r" +
    "\n" +
    "</ul>\r" +
    "\n" +
    "<ul class=\"warningMessages\">\r" +
    "\n" +
    "      <a-welzijn-notification-callout-message ng-repeat='msg in warnings'' title='{{msg.title}}' message='{{msg.message}}' callout-class='callout-warning' dismissible='true' data-type='{{msg.type}}' index='{{$index}}' />\r" +
    "\n" +
    "</ul>\r" +
    "\n" +
    "<ul class=\"messages\">\r" +
    "\n" +
    "      <a-welzijn-notification-callout-message ng-repeat='msg in info'' title='{{msg.title}}' message='{{msg.message}}' callout-class='callout' dismissible='true' data-type='{{msg.type}}' data-item='{{msg}}' index='{{$index}}' />\r" +
    "\n" +
    "</ul>"
  );

}]);
