// Gün hesaplama fonksiyonu
export const calculateDay = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const difference = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return difference + 1; // Başlangıç günü dahil
  };
  
  // Tarih formatlama fonksiyonu
  export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  