sap.ui.define(
  ["sap/m/MessageToast", "sap/ui/core/library"],
  function (MessageToast, coreLibrary) {
    "use strict";
    this.inputparams = [];
    return {
      onEdit: function (oEvent) {
        let oView = this.editFlow.getView();
        oView.getModel("editModel").setProperty("/edit", true);
      },
      onSave: function (oEvent) {
        let oView = this.editFlow.getView();
        let oModel = oView.getModel();
        oView.byId("booksv4::BooksList--fe::table::Books::LineItem").rebind();
        inputparams.forEach((value) => {
          const oBinding = oModel.bindContext("/updateStock(...)", null, {
            groupId: "BatchGroup",
          });
          oBinding.setParameter("ID", "" + value.ID);
          oBinding.setParameter("stock", "" + value.stock);
          oBinding.execute();
        });
        // Submit the batch group
        oModel
          .submitBatch("BatchGroup")
          .then(() => {
            console.log("Batch executed successfully");
            MessageToast.show("Batch executed successfully");
            inputparams = [];
            oView.getModel("editModel").setProperty("/edit", false);
          })
          .catch((oError) => {
            console.error("Error executing batch:", oError);
            MessageToast.show("Error executing batch");
          });
        oModel.refresh();
      },
    };
  }
);
