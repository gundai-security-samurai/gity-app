import type React from "react";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Mock data fetching
    const fetchProducts = async () => {
      const data = [
        { id: 1, name: "Laptop", price: 999.99 },
        { id: 2, name: "Smartphone", price: 499.99 },
      ];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
