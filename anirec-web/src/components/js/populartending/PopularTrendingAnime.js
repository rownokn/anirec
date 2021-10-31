
const fetchPopularTrendData = async () => {
  const response = await fetch('http://localhost:8000/anime/populartrend');
  return await response.json()
} 

export {fetchPopularTrendData}


