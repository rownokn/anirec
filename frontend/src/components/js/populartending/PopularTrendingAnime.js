
const fetchPopularTrendData = async () => {
  const response = await fetch('http://localhost:5000/anime/populartrend');
  return await response.json()
} 

export {fetchPopularTrendData}


