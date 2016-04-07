'use strict';

var myApp=angular.module('myApp',['ngRoute','ngAutocomplete','firebase']);

myApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/view1', {
		templateUrl:'view1/view1.html',
		controller:'view1Ctrl'
	});
}]);
myApp.controller('view1Ctrl',['$scope','$firebaseArray',function($scope,$firebaseArray){
	var ref=new Firebase('https://pgngapp.firebaseio.com/contacts_detail');

	$scope.records=$firebaseArray(ref);
	$scope.frm={};
	$scope.frmEdit={};
	
	$scope.addForm=function(){
		$scope.records.$add($scope.frm).then(function(ref){
			var id=ref.key();
			console.log('record added with id: ',id);
			$scope.frm={};
			$scope.frm.address='';
		});
		
		
	};
	
	$scope.editForm=function(){
		var id=$scope.frmEdit.id;
		var record=$scope.records.$getRecord(id);
		record.firstname=$scope.frmEdit.firstname;
		record.lastname=$scope.frmEdit.lastname;
		record.address=$scope.frmEdit.address;
		$scope.records.$save(record).then(function(response){
			$scope.frmEdit={};
			$scope.frmEdit.address='';
		});
		
	};
	
	$scope.editLink=function(r){
		$scope.frmEdit.firstname=r.firstname;
		$scope.frmEdit.lastname=r.lastname;
		$scope.frmEdit.address=r.address;
		$scope.frmEdit.id=r.$id;
		console.log($scope.frmEdit);
		
	};
	
	$scope.delecteLink=function(r){
		$scope.records.$remove(r);
	};
	
	
}]);