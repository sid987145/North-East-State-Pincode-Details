import { useState, useEffect } from 'react';
import StateSelector from './components/StateSelector';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';
import StatsDisplay from './components/StatsDisplay';

function App() {
  const [selectedState, setSelectedState] = useState('');
  const [pincodeCount, setPincodeCount] = useState(null);
  const [districtCount, setDistrictCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '579b464db66ec23bdd000001cad76a7732414aff499f3f6207ff3d39';

  useEffect(() => {
    if (!selectedState) return;

    const fetchData = async () => {
      setLoading(true);
      setError('');
      setPincodeCount(null);
      setDistrictCount(null);

      const url = `https://api.data.gov.in/resource/5c2f62fe-5afa-4119-a499-fec9d604d5bd?api-key=${API_KEY}&format=json&limit=all&filters[statename]=${encodeURIComponent(selectedState)}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data.records) {
          setError("No data found.");
          return;
        }

        const pincodes = new Set(data.records.map(item => item.pincode));
        const districts = new Set(data.records.map(item => item.district));

        setPincodeCount(pincodes.size);
        setDistrictCount(districts.size);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedState]);

  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>North East State Pincode Details</h1>

      <StateSelector selectedState={selectedState} onChange={setSelectedState} />
      {loading && <LoadingIndicator />}
      {error && <ErrorMessage message={error} />}
      {selectedState && !loading && !error && (
        <StatsDisplay
          state={selectedState}
          pincodeCount={pincodeCount}
          districtCount={districtCount}
        />
      )}
    </div>
  );
}

export default App;
