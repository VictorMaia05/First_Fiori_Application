sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, Fragment) {
        "use strict";

        return Controller.extend("TRA.aplicativo2.controller.View2", {
            onInit: function () {

                this._carregarFragmentoFornecedor();

                this.oRouter = this.getOwnerComponent().getRouter();
                var oRotaDetalheProduto = this.oRouter.getRoute("detalheProduto");
                var oModel = this.getOwnerComponent().getModel();
                var oView = this.getView();

                oRotaDetalheProduto.attachPatternMatched(function(oEvent){
                    var sIDProduto = oEvent.getParameter("arguments").ProductID;
                    var sPath = oModel.createKey("/Products", {
                        ProductID: sIDProduto
                    });
                    oView.bindElement(sPath, {
                        expand: "Supplier"
                    });
                });

            },
            // Área de codificação \\
            aoPressionarVoltar: function (oEvent) {
                
                // Chama rota da View1 \\
                //oRouter.navTo("RouteView1");

                // Voltar para a tela Carrossel com BACK do histórico de navegação Windows \\
                var oHistory = History.getInstance();
			    var sPreviousHash = oHistory.getPreviousHash();

			    if (sPreviousHash !== undefined) {
			        window.history.go(-1);
			    }
                else {
				    this.oRouter.navTo("RouteView1");
			    }

             },

             _carregarFragmentoFornecedor: function () {

                // Resgata a VIEW \\   
                let oView = this.getView();

                // Resgatar a subseção Fornecedor \\
                let oSubSecaoFornecedor = oView.byId("subsecaoFornecedor");

                if(!oView.byId("formFornecedor")){

                    // Carrega o Fragmento caso ele não exista na VIEW ainda \\
                    Fragment.load({
                        name: "TRA.aplicativo2.view.fragment.Fornecedor",
                        id:   oView.getId(),
                        Controller: this
                    }).then(function(oFragment){
                        oView.addDependent(oFragment);

                        // Caso a promessa seja cumprida, adiciona o bloco na subseção \\
                        oSubSecaoFornecedor.addBlock(oFragment);
                    });

             }
        
            }

        });
    });
