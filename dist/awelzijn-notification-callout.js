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
            templateUrl: 'templates/template.html',
            scope:{
                croutonsMessages:"="
            }
        };
    }]);

    module.directive('aWelzijnNotificationCalloutMessage', ['$compile', 'aWelzijnNotificationService', '$timeout' , function ($compile, notificationService, $timeout) {

        var linker = function (scope, element, attrs) {

            scope.callOut.index = attrs.index;
		
            scope.removeCallOut = function () {
                notificationService.removeCallOut(scope.callOut);
            };
			
			// create callback function with standard params: callOut-object & callbackparams
			var getCallBackFunctionWrapper = function(callOut, callbackFn, callbackParams) {
				return function() {
					callbackFn(callOut, callbackParams);
				};
			};
			
			// register custom actions on scope if any defined
			if(scope.callOut.actions) {
				
				angular.forEach(scope.callOut.actions, function (action) {
					
					if($.trim(action.name) != "" && action.callback != undefined) {
						scope[action.name] = getCallBackFunctionWrapper(scope.callOut, action.callback, action.callbackParams);
					}
				});
			}

			var dismissible = (scope.callOut.dismissible == undefined || scope.callOut.dismissible == "") ? false : true;
            var showTitle = (scope.callOut.title == undefined || scope.callOut.title == "") ? false : true;
			
            var template = "<li ng-mouseover='cancelTimeout()' ng-mouseleave=\"" + scope.callOut.fade + " ? removeAfterFade() : ''\" ng-class=\"{ 'faden': " + scope.callOut.fade + " }\">" + 
                               "<div class='alert " + attrs.calloutClass + "' ng-class=\"{ 'alert-dismissible': " + dismissible + " }\" role=alert>\n" +
                               "<a ng-show='{{" + dismissible + " }}' class=\"close float-right\" data-dismiss=alert aria-label='Sluit' ng-click='removeCallOut()'><i class=\"fa fa-times\"></i></a>\n" +
                               "<strong ng-show='" + showTitle + "'>" + scope.callOut.title + "</strong>" + scope.callOut.message + "</div> </li>";

            element.html(template).show();
            $compile(element.contents())(scope);
            
            var timeout;
            scope.removeAfterFade = function () {
                timeout = $timeout(function () {
                    scope.removeCallOut();
                }, 6000)
            }

            if (scope.callOut.fade) {
                scope.removeAfterFade();
            }

            scope.cancelTimeout = function () {
                if (timeout) {
                    $timeout.cancel(timeout);
                }
            }
        }

        return {
            restrict: 'E',
            replace: true,
			scope: {
				callOut: "="				
			},
            link: linker
        };
    }]);
    
})();
;angular.module('awelzijn.notificationcallout').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/template.html',
    "<div ng-class=\"croutonsMessages == true? 'croutonsMessages': ''\"> <ul class=errorMessages> <a-welzijn-notification-callout-message ng-repeat=\"callout in $parent.errors\" call-out=callout callout-class=callout-danger index=\"{{$index}}\"> </ul> <ul class=successMessages> <a-welzijn-notification-callout-message ng-repeat=\"callout in $parent.notifications\" call-out=callout callout-class=callout-success index=\"{{$index}}\"> </ul> <ul class=warningMessages> <a-welzijn-notification-callout-message ng-repeat=\"callout in $parent.warnings\" call-out=callout callout-class=callout-warning index=\"{{$index}}\"> </ul> <ul class=messages> <a-welzijn-notification-callout-message ng-repeat=\"callout in $parent.messages\" call-out=callout callout-class=callout index=\"{{$index}}\"> </ul> </div>"
  );

}]);
