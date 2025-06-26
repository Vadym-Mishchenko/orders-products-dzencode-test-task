import './CardAmount.css';

type Price = {
  value: number;
  symbol: string;
  isDefault: 0 | 1;
};

interface Product {
  price: Price[];
}

interface IProrps {
  products: Product[];
  width: string;
}

export const CardAmount = ({ products, width }: IProrps) => {
  const totals: Record<string, number> = {};

  products.forEach((product) => {
    product.price.forEach(({ symbol, value }) => {
      if (!totals[symbol]) {
        totals[symbol] = 0;
      }
      totals[symbol] += value;
    });
  });

  return (
    <div className="amount" style={{ width }}>
      {Object.entries(totals).map(([symbol, value]) => (
        <div key={symbol} className={symbol === 'UAH' ? 'amount--primary' : 'amount--secondary'}>
          {value.toFixed(2)} {symbol}
        </div>
      ))}
    </div>
  );
};
