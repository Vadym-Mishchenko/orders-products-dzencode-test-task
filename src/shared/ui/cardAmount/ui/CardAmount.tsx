import './CardAmount.css';

type Price = {
  value: number;
  symbol: string;
  isDefault: 0 | 1;
};

interface Product {
  price: Price[];
}

interface IProps {
  products: Product[];
  width: string;
}

export const CardAmount = ({ products, width }: IProps) => {
  const defaultSymbols = ['UAH', 'USD'];

  const totals = products.reduce<Record<string, number>>((acc, product) => {
    product.price.forEach(({ symbol, value }) => {
      acc[symbol] = (acc[symbol] || 0) + value;
    });
    return acc;
  }, {});

  defaultSymbols.forEach((symbol) => {
    if (!(symbol in totals)) {
      totals[symbol] = 0;
    }
  });

  return (
    <div className="amount" style={{ width }}>
      {defaultSymbols.map((symbol) => (
        <div key={symbol} className={symbol === 'UAH' ? 'amount--primary' : 'amount--secondary'}>
          {totals[symbol].toFixed(2)} {symbol}
        </div>
      ))}
    </div>
  );
};
