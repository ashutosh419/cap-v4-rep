const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
  this.on("updateStock", async (req) => {
    const { ID, stock } = req.data;

    // Action logic: You can perform some business logic based on the Title
    // For example, just a simple message:
    console.log(`Updating Stock of Book with ID ${ID} to ${stock}.`);

    // You could perform database operations or modify other entities here
    await cds.run(UPDATE(`Books`).set({ stock }).where({ ID }));
    // Returning a response to the action
    return `Book ID "${ID}" has been marked as read.`;
  });
  this.on("UPDATE", "Books", async (req) => {
    console.log(`PATCH Request received for entity "Books"`);
    return `PATCH NOT IMPLEMENTED`;
  });
});
