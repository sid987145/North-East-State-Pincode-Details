const states = [
    "Assam", "Mizoram", "Meghalaya", "Manipur",
    "Nagaland", "Tripura", "Sikkim"
  ];
  
  function StateSelector({ selectedState, onChange }) {
    return (
      <>
        <label htmlFor="state-select">Select a state:</label>
        <select
          id="state-select"
          onChange={(e) => onChange(e.target.value)}
          value={selectedState}
        >
          <option value="" disabled>Select...</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </>
    );
  }
  
  export default StateSelector;
  