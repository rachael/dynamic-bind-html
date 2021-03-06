'use strict';

var app = angular
.module('demo', ['ngSanitize', 'dynamicBindHtml', 'hljs'])
.controller('demoCtrl', ['$scope', '$sce',
  function($scope, $sce) {

    // Example 1: Basic Usage
    $scope.htmlExample = `<div dynamic-bind-html="{{dynamicHtml}}"></div>`;
    $scope.controllerExample =
      `$scope.dynamicHtml = '<div ng-bind-html="html">Contents of $scope.dynamicHtml</div>';\
      \n$scope.ngHtml = '<p>Contents of $scope.ngHtml</p>';`;

    $scope.dynamicHtml = '<div ng-bind-html="ngHtml">Contents of $scope.dynamicHtml</div>';
    $scope.ngHtml = '<p>Contents of $scope.ngHtml</p>';

    // Example 2: Modifying Contents
    $scope.updatableDynamicHtml = '<div ng-bind-html="updatableHtml"></div>';
    $scope.updatableHtml = '<p>Change me!</p>';

    // Example 3: Event Update
    $scope.eatSleepCodeRepeat = [
      {id: 2, text: "code"},
      {id: 0, text: "eat"},
      {id: 1, text: "sleep"},
      {id: 3, text: "repeat"},
    ];
    $scope.eatSleepHackRepeat = [
      {id: 2, text: "hack"},
      {id: 0, text: "eat"},
      {id: 1, text: "sleep"},
      {id: 3, text: "repeat"},
    ];
    $scope.displayedCollection = 'eatSleepCodeRepeat';
    $scope.order = 'id';

    $scope.needsBroadcastHtmlExample = '<div dynamic-bind-html="{{generateDynamicHtml(displayedCollection)}}"></div>';
    $scope.needsBroadcastControllerExample =
      `$scope.eatSleepCodeRepeat = [ ... {id: 2, text: "code"} ... ];\
        \n$scope.eatSleepHackRepeat = [ ... {id: 2, text: "hack"} ... ];\
        \n$scope.displayedCollection = "eatSleepCodeRepeat";\
        \n$scope.order = "id";\
        \n\n$scope.generateDynamicHtml = function(collectionToDisplay) {\
        \n\tlet _html =\
        \n\t\t\`<div>\
        \n\t\t\t<p ng-repeat="item in \$\{collectionToDisplay\} | orderBy:order">\\\
        \n\t\t\t\t{{item.id + 1}}. {{item.text}}\\\
        \n\t\t\t</p>\
        \n\t\t</div>\`;\
        \n\treturn $sce.trustAsHtml(_html);\
      \n}`;

    $scope.generateDynamicHtml = function(collectionToDisplay) {
      let _html =
        `<div>\
          <p ng-repeat="item in ${collectionToDisplay} | orderBy:order">\
            {{item.id + 1}}. {{item.text}}\
          </p>\
        </div>`;
      return $sce.trustAsHtml(_html);
    };

  }
])
.config(function (hljsServiceProvider) {
  hljsServiceProvider.setOptions({
    // replace tab with 2 spaces
    tabReplace: '  '
  });
});
