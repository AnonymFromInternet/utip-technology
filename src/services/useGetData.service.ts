import { useState } from "react";

export const useGetData = () => {
  //   const [data, setData] = useState([]);
  //   const [error, setError] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  // Можно попробовать useReducer, хотя нафиг. просто для чистоты кода?
  // Тогда уж лучше внутри компонентов вызывать диспатчи для чистоты
  //   fetch("https://jsonplaceholder.typicode.com/comments")
  //     .then((response) => setData(response)) // TODO: delete any
  //     .catch((e) => setError(e))
  //     .finally(() => setIsLoading(false));
  //   return {
  //     data,
  //     isLoading,
  //     error,
  //   };
};
