function StatsDisplay({ state, pincodeCount, districtCount }) {
    return (
      <div style={{ marginTop: '1.5rem' }}>
        <h2>You have selected {state}</h2>
        <p><strong>{state}</strong> has {pincodeCount} Pincodes & {districtCount} districts</p>
      </div>
    );
  }
  
  export default StatsDisplay;
  