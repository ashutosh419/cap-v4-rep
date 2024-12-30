sap.ui.define(
  ["sap/m/MessageToast", "sap/ui/core/library"],
  function (MessageToast, coreLibrary) {
    "use strict";
    this.onChangeEv = (oEvent) => {
      console.log("Change Event Fired");
    };
    this.inputparams = [];
    this.onEdit = function (oEvent) {
      let oView = this.editFlow.getView();
      let oModel = oView.getModel();
      oModel.setDefaultBindingMode("OneWay");
      oView
        .byId(
          "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext"
          // "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext::ActionToolbarAction"
        )
        .setVisible(true);
      oView
        .byId(
          "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext2"
          // "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext2::ActionToolbarAction"
        )
        .setVisible(false);

      let oTable = oView.byId(
        "booksv4::BooksList--fe::table::Books::LineItem-innerTable"
      );
      let aColumns = oTable.getColumns();

      /* Cell by Cell */

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
                      editable: this._editableColumns,
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
    };

    return {
      onSave: function (oEvent) {
        let oView = this.editFlow.getView();
        let oModel = oView.getModel();
        oModel.setDefaultBindingMode("TwoWay");
        oView.byId("booksv4::BooksList--fe::table::Books::LineItem").rebind();
        // titles.forEach((title) => {
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
          })
          .catch((oError) => {
            console.error("Error executing batch:", oError);
            MessageToast.show("Error executing batch");
          });
        oModel.refresh();
        oView
          .byId(
            "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext"
            // "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext::ActionToolbarAction"
          )
          .setVisible(false);
        oView
          .byId(
            "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext2"
            // "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext2::ActionToolbarAction"
          )
          .setVisible(true);
        let oTable = oView.byId(
          "booksv4::BooksList--fe::table::Books::LineItem-innerTable"
        );
        let aColumns = oTable.getColumns();

        /* Cell by Cell */

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
                  if (oCell.isA("sap.m.Input")) {
                    let sPath = oCell.getBindingInfo("value")?.parts[0]?.path;
                    if (sPath) {
                      // Replace Text control with Input control dynamically
                      let oText = new sap.m.Text({
                        text: "{" + sPath + "}",
                      });
                      oItem.removeCell(oCell);
                      oItem.insertCell(oText, index);
                    }
                  }
                }
              }.bind(this)
            );
          }.bind(this)
        );
      },
      onEdit: this.onEdit,
    };
  }
);
