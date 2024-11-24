export default function  Footer () {
    return (
      <footer className={"flex justify-between p-5 items-center bg-gray-900 shadow-lg object-bottom"}>
        <div className="flex flex-col gap-1">
            <span className="text-green-700 text-xs italic">SHOPPER RIDES</span>
            <span className="text-gray-300 text-xs">(31) 3462-1658</span>
            <span className="text-gray-300 text-xs">contato@shopperrides.com.br</span>
        </div>
        <h1 className={`text-gray-400 text-sm font-400 text-center`}>
          SHOPPER RIDES© 2024 - Todos os direitos reservados.
        </h1>
        <span className="text-green-700 text-xs italic">Isadora Perdigão</span>
      </footer>
    );
  };