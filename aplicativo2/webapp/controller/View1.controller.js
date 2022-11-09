sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("TRA.aplicativo2.controller.View1", {
            onInit: function () {



                this._carregarCarrossel();
                
            },
// Área de codificação \\

            _carregarCarrossel: function () {

                // Resgata o carrossel \\
                let oCarrossel = this.getView().byId("produtos");

                // Resgata o Modelo \\
                let oModel = this.getOwnerComponent().getModel();

                // Cria uma instância do JSON Model \\
                let oModeloProdutos = new JSONModel();

                oCarrossel.setModel(oModeloProdutos, "modeloProdutos")

                // Chamada GET nos valores \\
                oModel.read("/Products", {
                    success: function(oData, response) {
                        oModeloProdutos.setProperty("/", oData.results);
                    },
                    error: function(oError) {
                        debugger;
                    }
                });

                debugger;

            },

            aoPressionarCard: function (oEvent) {
                
                //let oModel = this.getOwnerComponent().getModel();
                let oCarrossel = this.getView().byId("produtos");
                let oModel = oCarrossel.getModel("modeloProdutos");
                let sPath = oEvent.getSource().getBindingContext("modeloProdutos").getPath();

                // Resgatar a instância do roteador para navegação \\
                let oRouter = this.getOwnerComponent().getRouter();

                // Efetuar a navegação com um objeto correspondente à propriedade "pattern"
                // do descritor (manifest.json) \\
                oRouter.navTo("detalheProduto", {
                    ProductID: oModel.getProperty(sPath).ProductID
                })
                

            }


        });
    });
