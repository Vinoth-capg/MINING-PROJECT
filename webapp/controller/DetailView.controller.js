sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/m/MessageBox"
 ], ( BaseController, MessageBox) => {
     "use strict";
 
     return BaseController.extend("app.miningdetails.controller.DetailView", {
         onInit() {
           
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this._onRouteMatched, this);

            let oRoute = oRouter.getRoute("RouteDetailView");
           oRoute.attachPatternMatched(this._onPatternMatched, this);
        // this._getData();
 
         },
 
         _onRouteMatched: function(oEvent){
            this.index=oEvent.getParameter("arguments").index;
            let sPath= "MiningDetails>/" + this.index;
            let oView=this.getView();
            oView.bindElement(sPath);
 
         },
         _onPatternMatched: function() {
            this._getData();
        },
         _getData:function(){
            let enititySet = `/Z9279_MININGSet`;
            let oModel = this.getOwnerComponent().getModel();
            oModel.read(enititySet, {
                success: (oData, response) => {
                    var oModelData = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().setModel(oModelData, "MiningDetails");
                },
                error: () => {}
            })
        },
        onEdit:function(){
            var oRouter = this.getOwnerComponent().getRouter()
              oRouter.navTo("RouteUpdateView",{
                index: this.index
              })
         },
      

    });
});