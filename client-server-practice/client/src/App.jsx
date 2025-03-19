import axios from "axios";
import Form from "./components/form/Form";
import Heading from "./components/Heading";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleFormSubmit = async (userData) => {
    try {
      const res = await axios.post(`${apiUrl}/api/form`, userData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Response:', res.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <>
      <Heading />
      <Form handleFormSubmit={handleFormSubmit} />
    </>
  );
}

export default App;