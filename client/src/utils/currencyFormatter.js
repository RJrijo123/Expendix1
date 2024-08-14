const currencyFormatter = (Symbol, amount) => {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: Symbol,
    }).format(amount);
  };
  
  export default currencyFormatter;