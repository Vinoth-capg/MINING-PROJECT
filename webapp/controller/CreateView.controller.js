sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";
 
    return Controller.extend("app.miningdetails.controller.CreateView", {
        onInit() {
           
        },
 
        onToMining: function(){
            var oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteMiningView")
        },
       
        onSubmit: function(){
 
            //PAYLOAD
            let oLocId = this.getView().byId("idLocIdCr");
            let oLocDesc = this.getView().byId("idLocDescCr");
            let oResAlloc = this.getView().byId("idResAllocCr");
            let oTotCost = this.getView().byId("idTotcostCr");
            let oRepPoss = this.getView().byId("idRepPossCr");
            let oDrills = this.getView().byId("idDrillsCr");
            let oType = this.getView().byId("idTypeCr");
            
       
            let sLocId = oLocId.getValue();
            let sLocDesc = oLocDesc.getValue();
            let sResAlloc = oResAlloc.getValue();
            let sTotCost = oTotCost.getValue();
            let sRepPoss = oRepPoss.getValue();
            let sDrills = oDrills.getValue();
            let sType = oType.getValue();
          
       
            let payload= {
                "LocationId": sLocId,
                "Description": sLocDesc,
                "MineralResource": sResAlloc,
                "TotalCost": sTotCost,
                "ReportOfMinerals": sRepPoss,
                "NoOfDrills": sDrills,
                "TypeOfMineral": sType,
               
            };
            //objects of the input field
            let oModel=this.getOwnerComponent().getModel()
            let entity="/Z9279_MININGSet"
 
            var that= this
            oModel.create(entity, payload,{
                success:function(response){
                    MessageBox.success("record inserted",{
                        onClose:function(){
                            var oRouter= that.getOwnerComponent().getRouter()
                            oRouter.navTo("RouteMiningView")
                            oLocId.setValue("")
                            oLocDesc.setValue("")
                            oResAlloc.setValue("")
                            oTotCost.setValue("")
                            oRepPoss.setValue("")
                            oDrills.setValue("")
                            oType.setValue("")
                          
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