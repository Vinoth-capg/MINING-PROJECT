/*global QUnit*/

sap.ui.define([
	"app/miningdetails/controller/MiningView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MiningView Controller");

	QUnit.test("I should test the MiningView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
