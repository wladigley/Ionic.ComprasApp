// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

// Conttroller HOME page
app.controller('PageHomeController', ['$scope','$ionicPopup','$ionicScrollDelegate','$location', function($scope, $ionicPopup,$ionicScrollDelegate,$location) {
      // $scope.popover = angular.element(document).find('');
      // Itens Data's
      $scope.items = [{ nome:'', valor:0, qtd:0}];
      // Itens Manage's
      // Eitar
      $scope.edit = function(item) {
        alert('Edit Item: ' + item.id);
      };
      // Deletar
      $scope.onItemDelete = function(item) {
      var ite = this.items.indexOf(item);
      this.items.splice(ite,1);
      $scope.listaTOTAL();
      };
      // Esconder Lista zerada
      while ($scope.items.length=0) {
        $scope.showList=false;
      }
      // Inserir
      $scope.insertItem = function(item){
        $scope.items.push(item);
      }
      // Fim Itens Manager's
      // Scroll Para o ultimo item da lista
      $scope.scrollTheLastItem = function(anchor) {
        $location.hash(anchor);
        $ionicScrollDelegate.anchorScroll();
      }

      $scope.listaTOTAL = function(){
        $scope.total = 0;
        var temp=0;
          for (var i = 0; i < $scope.items.length; i++)
          {
            var valor = parseFloat($scope.items[i].valor);
            var qtd = parseFloat( $scope.items[i].qtd);
            temp = valor * qtd;
            $scope.total = temp + $scope.total;
          }
        }
// PopUp Inserir item home
      $scope.showPopup = function(last) {
      // An elaborate, custom popup

        $scope.data = {};
        $ionicPopup.show({
          template:
          '<input ng-model="data.nome" type="text" placeholder="Descrição" autofocus ></br><input ng-model="data.valor" type="number" placeholder="Valor"></br><input ng-model="data.qtd" type="number" placeholder="Quantidade">',
          title: 'Adicionar novo item a lista',
          subTitle: 'Please use normal things',
          scope: $scope,
          buttons:
          [
            {text: 'OK',
            onTap: function(e){
              $scope.insertItem($scope.data);
              $scope.scrollTheLastItem(last);
              $scope.listaTOTAL();
            }
          },
            {text: 'Cancelar'}
          ]
        });
     };


}]);
