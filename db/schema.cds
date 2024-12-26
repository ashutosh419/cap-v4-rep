namespace my.bookshop;

entity Books {
  key ID            : Integer;

      @Common.Label: 'Book Title'
      title         : String;
      Subtitle      : String;
      author        : String;
      stock         : Decimal(9, 2);
      price         : Decimal(9, 2);
      currency_code : String;

}
