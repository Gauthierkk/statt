import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function App() {
  const [tableData, setTableData] = useState([]);
  const [tableKeys, setTableKeys] = useState(null);

  /* populate table headers with keys */
  async function fetchKeys() {
    try {
      const keys = await getTableKeys();
      setTableKeys(keys);
    } catch (error) {
      console.error("Error fetching table keys:", error);
    }
  }

  /* Fetch table keys on component mount */
  useEffect(() => {
    fetchKeys();
  }, []);

  return (
    <>
      <RequestForm setTableData={setTableData} filters={tableKeys} />
      <Table tableData={tableData} tableKeys={tableKeys} />
    </>
  );
}

/* populates the form input component and sends request on submit */
function RequestForm({ setTableData, filters }) {
  const filterKeys = filters ? Object.keys(filters) : [];

  /* row limit options */
  const rowLimits = [10, 25, 50, 100, 500, 1000];

  /* handle form submission */
  /* waits for API call to complete before setting the table data with the result */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const filterSelect = document.getElementById("filter-select");
    const filterBool = filterSelect.value !== "all";

    const filterValue = document.getElementById("filter").value;
    const filterStr = `${filterKeys[0]}=${filterValue}`;

    console.log(filterBool, filterStr);

    const data = await getTableData(filterBool, filterStr);

    await setTableData(data);
  };

  /* sets the row limit */
  const handleNumResults = async (event) => {
    const numResults = event.target.value;
    await setRowLimit(numResults);
  };

  return (
    <div className="form-container">
      <form>
        <select id="filter-select">
          {filterKeys.map((key) => (
            <option key={key}>{filters[key]}</option>
          ))}
          <option value="all">All</option>
        </select>
        <input type="text" id="filter" />
        <button type="submit" onClick={handleSubmit}>
          Get
        </button>
        <label>Number of result</label>
        <select id="num-results" onChange={handleNumResults}>
          {rowLimits.map((limit) => (
            <option key={limit}>{limit}</option>
          ))}
        </select>
      </form>
    </div>
  );
}

/* populates the table component */
function Table({ tableKeys, tableData }) {
  /* Split keys and values in separate arrays to populate the table */
  const keyLabels = tableKeys ? Object.values(tableKeys) : [];
  const keys = tableKeys ? Object.keys(tableKeys) : [];

  return (
    <table>
      <thead>
        <tr>
          {keyLabels.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <tr key={tableData.indexOf(row)}>
            {keys.map((k) => (
              <td key={k}>{row[k] ? row[k] : "no data"}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* API calls */
/* Fetch table keys */
async function getTableKeys() {
  try {
    /* GET request for table keys */
    const response = await fetch("http://localhost:8080/keys");
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null; // Return null in case of an error
  }
}

async function setRowLimit(num) {
  try {
    /* POST request with row limit to change to */
    const response = await fetch(`http://localhost:8080/limit/${num}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null; // Return null in case of an error
  }
}

/* Fetch table data */
async function getTableData(filterBool, filterStr) {
  if (!filterBool) {
    /* GET request for all data */
    try {
      const response = await fetch("http://localhost:8080/all");
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(error.message);
      return null; // Return null in case of an error
    }
  } else {
    /* GET request for filtered data */
    try {
      const response = await fetch(`http://localhost:8080/filter/${filterStr}`);

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(error.message);
      return null; // Return null in case of an error
    }
  }
}

/* prop validation */
RequestForm.propTypes = {
  filters: PropTypes.object,
  setTableData: PropTypes.func,
};

Table.propTypes = {
  tableKeys: PropTypes.object,
  tableData: PropTypes.array,
};
