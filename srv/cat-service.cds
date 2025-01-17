using my.bookshop as my from '../db/schema';

service CatalogService {
    @UI.Identification: [{
        $Type : 'UI.DataFieldForAction',
        Label : 'Reset Stock',
        Action: 'CatalogService.resetStock'
    }]
    entity Books as projection on my.Books
        actions {
            @Common.DefaultValuesFunction: 'CatalogService.defaultStock'
            action   resetStock(stock : String) returns Books;
            function defaultStock(ID : String)  returns Books;
        }

    action updateStock(ID : String, stock : String) returns String;

}
