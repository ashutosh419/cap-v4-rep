namespace my.bookshop;

entity Books {
  key ID    : Integer;

      @Common.Label: 'Book Title'
      title : String;
      
      stock : Integer;
      
}

