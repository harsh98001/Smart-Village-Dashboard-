import React from "react";
const SearchToolbar = ({ search, filters, states, types, onChange }) =>
  <div className="search-toolbar premium-card">
  <div key="searchWrap" className="search-toolbar-field search-toolbar-search">
    <span key="label" className="search-toolbar-label">Place Search</span>
    <input key="search" className="form-control search-toolbar-input" placeholder="Patna, Mumbai, Varanasi, Mandi..." value={search} onChange={(event) => onChange("search", event.target.value)} />
  </div>
  <div key="stateWrap" className="search-toolbar-field">
    <span key="label" className="search-toolbar-label">State Lens</span>
    <select key="state" className="form-select search-toolbar-select" value={filters.state} onChange={(event) => onChange("state", event.target.value)}>
      {[<option key="all">All states</option>].concat(
                states.map((state) => <option key={state} value={state}>
        {state}
      </option>)
              )}
    </select>
  </div>
  <div key="typeWrap" className="search-toolbar-field">
    <span key="label" className="search-toolbar-label">Result Type</span>
    <select key="type" className="form-select search-toolbar-select" value={filters.resultType} onChange={(event) => onChange("resultType", event.target.value)}>
      {[<option key="all">All results</option>].concat(
                types.map((type) => <option key={type} value={type}>
        {type}
      </option>)
              )}
    </select>
  </div>
</div>;

export default SearchToolbar;
