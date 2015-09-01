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
