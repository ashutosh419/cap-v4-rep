const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
  this.on("updateStock", async (req) => {
    const { ID, stock } = req.data;
    console.log(`Updating Stock of Book with ID ${ID} to ${stock}.`);
    await cds.run(UPDATE(`Books`).set({ stock }).where({ ID }));
    return `Book ID "${ID}" has been marked as read.`;
  });
  this.on("UPDATE", "Books", async (req) => {
    console.log(`PATCH Request received for entity "Books"`);
    return `PATCH NOT IMPLEMENTED`;
  });
  this.on("defaultStock", async (req) => {
    const oDefaultStock = { ID: req.params[0], stock: "10" };
    console.log(`Fetching default stock for books.`, oDefaultStock);
    return oDefaultStock;
  });
  this.on("resetStock", async (req) => {
    const { ID, stock } = { ID: req.params[0], stock: req.data.stock };
    console.log(`Resetting stock for the book.`, { ID, stock });
    await cds.run(UPDATE(`my.bookshop.Books`).set({ stock }).where({ ID }));
    return { ID, stock };
  });
});
