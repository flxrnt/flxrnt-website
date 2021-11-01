import React, { useEffect, useState } from "react";
import "./App.css";
import Products from "./components/products";
import ProductLoadingComponent from "./components/productLoading";
import axiosInstance from "./axios";

function App() {
  const ProductLoading = ProductLoadingComponent(Products);
  const [appState, setAppState] = useState({
    loading: true,
    products: null,
  });

  useEffect(() => {
    axiosInstance.get().then((res) => {
      const allProducts = res.data;
      setAppState({ loading: false, Products: allProducts });
      console.log(res.data);
    });
  }, [setAppState]);

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `http://127.0.0.1:8000/api/`;
    fetch(apiUrl)
      .then((data) => data.json())
      .then((products) => {
        setAppState({ loading: false, products: products });
      });
  }, [setAppState]);
  return (
    <div className="App">
      <h1>Latest Listing</h1>
      <ProductLoading
        isLoading={appState.loading}
        products={appState.products}
      />
    </div>
  );
}

// export default App;

// function App() {
// 	const ProductLoading = ProductLoadingComponent(products);
// 	const [appState, setAppState] = useState({
// 		loading: true,
// 		products: null,
// 	});

// 	useEffect(() => {
// 		axiosInstance.get().then((res) => {
// 			const allProducts = res.data;
// 			setAppState({ loading: false, Products: allProducts });
// 			console.log(res.data);
// 		});
// 	}, [setAppState]);
// 	return (
// 		<div className="App">
// 			<h1>Latest Posts</h1>
// 			<ProductLoading isLoading={appState.loading} products={appState.products} />
// 		</div>
// 	);
// }

export default App;
