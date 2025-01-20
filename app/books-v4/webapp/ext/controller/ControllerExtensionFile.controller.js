sap.ui.define(
  ["sap/ui/core/mvc/ControllerExtension", "sap/m/MessageToast"],
  function (ControllerExtension, MessageToast) {
    "use strict";

    return ControllerExtension.extend(
      "booksv4.ext.controller.ControllerExtensionFile",
      {
        // this section allows to extend lifecycle hooks or hooks provided by Fiori elements
        override: {
          /**
           * Called when a controller is instantiated and its View controls (if available) are already created.
           * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
           * @memberOf booksv4.ext.controller.ControllerExtensionFile
           */
          onInit: function () {
            var oModel = this.base.getExtensionAPI().getModel();

            // Using JSON Model to store the edit state
            let oJSONModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oJSONModel, "editModel");
            oJSONModel.setProperty("/edit", false);

            // Save Button
            this.getView()
              .byId(
                "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext"
              )
              .bindProperty('visible', { path: 'editModel>/edit' });

            // Edit Button  
            this.getView()
              .byId(
                "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext2"
              )
              .bindProperty('visible', { path: 'editModel>/edit', formatter: (bValue) => !bValue });

          },
          onAfterRendering: function () {

            this.getView().getModel().attachDataReceived(function (oEvent) {
              oView.getModel("editModel").setProperty("/edit", false);
              let aColumns = oTable.getColumns();
              let aItems = oTable.getItems ? oTable.getItems() : [];
              if (!aItems.length) {
                MessageToast.show("No items available in the table.");
                return;
              }

              let aEditableColumns = ["stock"];
              aItems.forEach(
                function (oItem) {
                  let aCells = oItem.getCells();
                  let aColumnList = oTable.getColumns();

                  aCells.forEach(
                    function (oCell, index) {
                      let oColumn = aColumnList[index];
                      let sHeader = oColumn.getHeader().getText();

                      // Check if the column is in the editable list
                      if (aEditableColumns.includes(sHeader)) {
                        if (oCell.isA("sap.m.Text")) {
                          let sPath = oCell.getBindingInfo("text")?.parts[0]?.path;
                          if (sPath) {
                            // Replace Text control with Input control dynamically
                            let oInput = new sap.m.Input({
                              value: "{" + sPath + "}",
                              editable: "{editModel>/edit}",
                              change: (oEvent) => {
                                let bChanged = false;
                                let oRow = oEvent
                                  .getSource()
                                  .getBindingContext()
                                  .getObject();
                                console.log(oRow);
                                inputparams.forEach((value, index) => {
                                  if (value.ID === oRow.ID) {
                                    bChanged = true;
                                    inputparams[index].stock =
                                      oEvent.getParameter("newValue");
                                  }
                                });

                                if (!bChanged) {
                                  inputparams.push({
                                    ID: oRow.ID,
                                    stock: oEvent.getParameter("newValue"),
                                  });
                                }

                                return false;
                              },
                            });
                            oItem.removeCell(oCell);
                            oItem.insertCell(oInput, index);
                          }
                        }
                      }
                    }.bind(this)
                  );
                }.bind(this)
              );

            });
            let oView = this.getView();
            let oTable = this.getView().byId(
              "booksv4::BooksList--fe::table::Books::LineItem-innerTable"
            );
          }
        },
      }
    );
  }
);
