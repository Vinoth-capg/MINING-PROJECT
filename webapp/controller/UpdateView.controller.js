sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";
 
    return Controller.extend("app.miningdetails.controller.UpdateView", {
        onInit() {
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this._onRouteMatched, this);

            let oRoute = oRouter.getRoute("RouteUpdateView");
           oRoute.attachPatternMatched(this._onPatternMatched, this);
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
 
        onToMining: function(){
            var oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteMiningView")
        },
       
        onUpdate: function(){
 
            //PAYLOAD
            let oLocaId = this.getView().byId("idLocIdup");
            let oLocaDesc = this.getView().byId("idLocDesup");
            let oResoAlloc = this.getView().byId("idResAllocup");
            let oTotaCost = this.getView().byId("idTotcostup");
            let oRepoPoss = this.getView().byId("idRepPossup");
            let oNoDrills = this.getView().byId("idDrillsup");
            let oTypeM = this.getView().byId("idTypeup");
           
       
            let sLocaId = oLocaId.getValue();
            let sLocaDesc = oLocaDesc.getValue();
            let sResoAlloc = oResoAlloc.getValue();
            let sTotaCost = oTotaCost.getValue();
            let sRepoPoss = oRepoPoss.getValue();
            let sNoDrills = oNoDrills.getValue();
            let sTypeM = oTypeM.getValue();
          
       
            // Define keys
            let key1 = sLocaId;
            let key2 = sLocaDesc;
            let key3 = sResoAlloc;
            key2=key2.replace(/ /g, "%20");
        

            let payload= {
                // "LocationId": sLocaId,
                // "Description": sLocaDesc,
                // "MineralResource": sResoAlloc,
                "TotalCost": sTotaCost,
                "ReportOfMinerals": sRepoPoss,
                "NoOfDrills": sNoDrills,
                "TypeOfMineral": sTypeM
                
            };
            //objects of the input field
            let oModel=this.getOwnerComponent().getModel()
            let entity=`/Z9279_MININGSet(LocationId='${key1}',Description='${key2}',MineralResource='${key3}')`;
            var that= this;
            oModel.update(entity, payload,{
                success:function(response){
                    MessageBox.success("record inserted",{
                        onClose:function(){
                            var oRouter= that.getOwnerComponent().getRouter()
                            oRouter.navTo("RouteMiningView")
                            oLocaId.setValue("")
                            oLocaDesc.setValue("")
                            oResoAlloc.setValue("")
                            oTotaCost.setValue("")
                            oRepoPoss.setValue("")
                            oNoDrills.setValue("")
                            oTypeM.setValue("")
                           
                        }.bind(this)
                    })
                },
                error:function(error){
                    MessageBox.error("record failed")
                }
            })
        }
 
    });
});