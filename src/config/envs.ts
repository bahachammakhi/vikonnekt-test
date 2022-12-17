const envs = {
  API_URL:
    process.env.REACT_APP_API_URL || "https://api.nasa.gov/neo/rest/v1/neo",
  API_KEY: process.env.REACT_APP_API_KEY || "DEMO_KEY",
};

export default envs;
