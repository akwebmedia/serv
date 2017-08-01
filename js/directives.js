/**
 *Directives used in the application such as : Add/ Remove defect Category from Open ticket / issue
 */
angular.module('starter.directives', ['ionic']).directive("dynamicName",function($compile){
    return {
        restrict:"A",
        terminal:true,
        priority:1000,
        link:function(scope,element,attrs){
            element.attr('name', scope.$eval(attrs.dynamicName));
            element.removeAttr("dynamic-name");
            $compile(element)(scope);
        }
    }
}).directive("addbuttonsbutton", function() {
	return {
		restrict : "E",
		template : "<div ng-show='show_section.systemmodule' class='whiteBg achierarHead'>"
	}
}).directive("closeddiv", function() {
	return {
		restrict : "E",
		template : "</div>'>"
	}
});
