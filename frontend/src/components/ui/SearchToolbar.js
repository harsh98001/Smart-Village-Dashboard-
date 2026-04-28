import React from "react";
import { h } from "../../utils/h";

const SearchToolbar = ({ search, filters, states, types, onChange }) =>
  h("div", { className: "search-toolbar premium-card" }, [
    h("div", { key: "searchWrap", className: "search-toolbar-field search-toolbar-search" }, [
      h("span", { key: "label", className: "search-toolbar-label" }, "Place Search"),
      h("input", {
        key: "search",
        className: "form-control search-toolbar-input",
        placeholder: "Patna, Mumbai, Varanasi, Mandi...",
        value: search,
        onChange: (event) => onChange("search", event.target.value)
      })
    ]),
    h("div", { key: "stateWrap", className: "search-toolbar-field" }, [
      h("span", { key: "label", className: "search-toolbar-label" }, "State Lens"),
      h(
        "select",
        {
          key: "state",
          className: "form-select search-toolbar-select",
          value: filters.state,
          onChange: (event) => onChange("state", event.target.value)
        },
        [h("option", { key: "all" }, "All states")].concat(
          states.map((state) => h("option", { key: state, value: state }, state))
        )
      )
    ]),
    h("div", { key: "typeWrap", className: "search-toolbar-field" }, [
      h("span", { key: "label", className: "search-toolbar-label" }, "Result Type"),
      h(
        "select",
        {
          key: "type",
          className: "form-select search-toolbar-select",
          value: filters.resultType,
          onChange: (event) => onChange("resultType", event.target.value)
        },
        [h("option", { key: "all" }, "All results")].concat(
          types.map((type) => h("option", { key: type, value: type }, type))
        )
      )
    ])
  ]);

export default SearchToolbar;
