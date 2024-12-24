sap.ui.define(
  ["sap/m/MessageToast", "sap/ui/core/library"],
  function (MessageToast, coreLibrary) {
    "use strict";
    this.onChangeEv = (oEvent) => {
      console.log("Change Event Fired");
    };
    return {
      onSave: function (oEvent) {
        var oView = this.editFlow.getView();
        var oModel = oView.getModel();
        oView.byId("booksv4::BooksList--fe::table::Books::LineItem").rebind();
        // oView
        //   .byId(
        //     "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext2::ActionToolbarAction"
        //   )
        //   .setVisible(true);
        // oView
        //   .byId(
        //     "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext::ActionToolbarAction"
        //   )
        //   .setVisible(false);

        // const req1 = this.editFlow
        //   .invokeAction("/markAsRead", {
        //     model: oModel,
        //     skipParameterDialog: true,
        //     parameterValues: [{ name: "Title", value: "Harry Potter" }], // Payload sent in the request body
        //     invocationGrouping: "ChangeSet",
        //   })
        //   .then((oResponse) => {
        //     console.log("Action response:", oResponse);
        //   });
        // const req2 = this.editFlow
        //   .invokeAction("/markAsRead", {
        //     model: oModel,
        //     skipParameterDialog: true,
        //     parameterValues: [{ name: "Title", value: "Twilight" }], // Payload sent in the request body
        //     invocationGrouping: "ChangeSet",
        //   })
        //   .then((oResponse) => {
        //     console.log("Action response:", oResponse);
        //   });

        // Promise.all([req1, req2])
        //   .then(([data1, data2]) => {
        //     console.log(data1, data2);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });

        // this.editFlow
        //   .invokeAction("/markAsRead", {
        //     model: oModel,
        //     skipParameterDialog: true,
        //     parameterValues: [{ name: "Title", value: "Harry Potter" }], // Payload sent in the request body
        //     invocationGrouping: "ChangeSet",
        //   })
        //   .then((oResponse) => {
        //     console.log("Action response:", oResponse);
        //   })
        //   .catch((oError) => {
        //     console.error("Error calling action:", oError);
        //   });
        // debugger;
        // this.editFlow
        //   .invokeAction("/markAsRead", {
        //     model: oModel,
        //     skipParameterDialog: true,
        //     parameterValues: [{ name: "Title", value: "Twilight" }], // Payload sent in the request body
        //     invocationGrouping: "ChangeSet",
        //   })
        //   .then((oResponse) => {
        //     console.log("Action response:", oResponse);
        //   })
        //   .catch((oError) => {
        //     console.error("Error calling action:", oError);
        //   });

        // const aActions = [
        //   {
        //     name: "/markAsRead",
        //     parameterValues: [{ name: "Title", value: "Harry Potter" }],
        //   },
        //   {
        //     name: "/markAsRead",
        //     parameterValues: [{ name: "Title", value: "Twilight" }],
        //   },
        // ];

        // // const oModel = this.getView().getModel();

        // this.editFlow
        //   .invokeAction(aActions[0].name, {
        //     model: oModel,
        //     skipParameterDialog: true,
        //     parameterValues: aActions[0].parameterValues,
        //     invocationGrouping: "ChangeSet", // Group these actions in one batch
        //   })
        //   .then(() => {
        //     return this.editFlow.invokeAction(aActions[1].name, {
        //       model: oModel,
        //       skipParameterDialog: true,
        //       parameterValues: aActions[1].parameterValues,
        //       invocationGrouping: "ChangeSet", // Part of the same change set
        //     });
        //   })
        //   .then(() => {
        //     console.log("All actions executed in a single batch");
        //   })
        //   .catch((oError) => {
        //     console.error("Error in batch execution", oError);
        //   });

        const sActionPath = "/markAsRead"; // Unbound action path

        // Create the binding context for the unbound action
        const oContext = oModel.bindContext(sActionPath, null, {
          groupId: "BatchGroup",
        });

        // Set the action parameters
        oContext.setParameter("Title", "Harry Potter");

        // Execute the action
        oContext
          .execute()
          .then(() => {
            console.log("Action executed successfully");
          })
          .catch((oError) => {
            console.error("Error executing action", oError);
          });

        // Submit the batch (if needed for grouping multiple actions)
        oModel
          .submitBatch("BatchGroup")
          .then(() => {
            console.log("Batch submitted successfully");
          })
          .catch((oError) => {
            console.error("Error submitting batch", oError);
          });
      },
      onEdit: function (oEvent) {
        var oView = this.editFlow.getView();
        // oView
        //   .byId(
        //     "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext::ActionToolbarAction"
        //   )
        //   .setVisible(true);
        // oView
        //   .byId(
        //     "booksv4::BooksList--fe::table::Books::LineItem::CustomAction::ListReportext2::ActionToolbarAction"
        //   )
        //   .setVisible(false);

        var oTable = oView.byId(
          "booksv4::BooksList--fe::table::Books::LineItem-innerTable"
        );
        var aColumns = oTable.getColumns();

        /* Cell by Cell */

        var aItems = oTable.getItems ? oTable.getItems() : [];
        if (!aItems.length) {
          MessageToast.show("No items available in the table.");
          return;
        }

        var aEditableColumns = ["stock"];

        aItems.forEach(
          function (oItem) {
            var aCells = oItem.getCells();
            var aColumnList = oTable.getColumns();

            aCells.forEach(
              function (oCell, index) {
                var oColumn = aColumnList[index];
                var sHeader = oColumn.getHeader().getText();

                // Check if the column is in the editable list
                if (aEditableColumns.includes(sHeader)) {
                  if (oCell.isA("sap.m.Text")) {
                    var sPath = oCell.getBindingInfo("text")?.parts[0]?.path;
                    if (sPath) {
                      // Replace Text control with Input control dynamically
                      var oInput = new sap.m.Input({
                        value: "{" + sPath + "}",
                        editable: this._editableColumns,
                        change: (oEvent) => {
                          console.log(oEvent);
                          debugger;

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
      },
    };
  }
);
