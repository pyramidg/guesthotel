angular.module('listApp', [])
  .controller('ListController', ['$http', function($http) {
    var vm = this;
    vm.events = [];
    vm.showError = false;
    $http.get("https://www.eventbriteapi.com/v3/events/search/?token=LI4K746SRRDAZCJBCWVK&location.address=atlanta+ga")
    .success(function(data) {
        vm.events = data.events;
    }).error(function() {
      vm.showError = true;
    })
  }]);
