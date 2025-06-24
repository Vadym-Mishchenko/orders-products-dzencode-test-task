import './CardAmount.css';

type Price = {
  value: number;
  symbol: string;
  isDefault: 0 | 1;
};

interface IProrps {
  price: Price[];
}

export const CardAmount = ({ price }: IProrps) => {
  return (
    <div className="amount">
      {price.map(({ value, symbol, isDefault }) => (
        <div key={symbol} className={isDefault ? 'amount--primary' : 'amount--secondary'}>
          {value} {symbol}
        </div>
      ))}
    </div>
  );
};
