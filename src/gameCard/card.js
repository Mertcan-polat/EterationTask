const GameCard = ({ game }) => {
    const handleBuy = () => {
      // Satın alma işlemini gerçekleştir
    };
  
    const handleInstall = () => {
      // Yükleme işlemini gerçekleştir
    };
  
    const handleRemove = () => {
      // Kütüphaneden kaldırma işlemini gerçekleştir
    };
  
    const handleShare = () => {
      // Paylaşma modalını aç
    };
  
    const handleStopSharing = () => {
      // Paylaşımı durdurma işlemini gerçekleştir
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <img src={game.image} alt={game.title} className="h-48 w-full object-cover" />
        <h3 className="mt-4 text-xl font-semibold">{game.title}</h3>
        <p className="text-gray-500">{game.category}</p>
        <p className="mt-2 text-gray-700">{game.description}</p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={handleBuy}
            >
              Satın Al
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md ml-2"
              onClick={handleInstall}
            >
              Yükle
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md ml-2"
              onClick={handleRemove}
            >
              Kaldır
            </button>
          </div>
          <div>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-full"
              onClick={handleShare}
            >
              Paylaş
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full ml-2"
              onClick={handleStopSharing}
            >
              Paylaşımı Durdur
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default GameCard;