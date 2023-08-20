

// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // const useFetch = (url) => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(false);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       try {
// //         const res = await axios.get(url);
// //         setData(res.data);
// //         // console.log("asdfgh",res.data); // Log the response data to the console
// //       } catch (err) {
// //         setError(err);
// //       }
// //       setLoading(false);
// //     };
// //     fetchData();
// //   }, [url]);

// //   const reFetch = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(url);
// //       setData(res.data);
// //     } catch (err) {
// //       setError(err);
// //     }
// //     setLoading(false);
// //   };

// //   return { data, loading, error, reFetch };
// // };

// // export default useFetch;


import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error, reFetch };
};

export default useFetch;

