import { useState, useRef, useEffect } from "react";

//const baseUrl = process.env.REACT_APP_API_BASE_URL;
//const baseUrl = "http://localhost:8083/";
const baseUrl = "http://localhost:3000/";

export default function useFetch(url) {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        console.log("fetching from url" + baseUrl + url);
        const response = await fetch(baseUrl + url);
        if (response.ok) {

         // alert("response ok")
          const json = await response.json();

          //alert("json received :: " + json)
          if (isMounted.current) setData(json);
        } else {

        //  alert("response not ok")
          throw response;
        }
      } catch (e) {
      //  alert("Caught error ::" + e)
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    init();

    return () => {
      isMounted.current = false;
    };
  }, []);//[url, data]

  return { data, setData, loading, error };
}
