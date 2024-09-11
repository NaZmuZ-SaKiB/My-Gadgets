"use client";

import { TProduct } from "@/types/product.type";
import { createContext, useContext, useEffect, useState } from "react";

export type TCartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
};

type TGlobalContext = {
  cart: TCartItem[];
  wishList: TProduct[];
  compare: TProduct[];
  setGlobalContext: (value: any) => void;
};

const GlobalContext = createContext<TGlobalContext>({
  cart: [],
  wishList: [],
  compare: [],
  setGlobalContext: () => {},
});

export const useGlobalContext = () => {
  const { cart, setGlobalContext } = useContext(GlobalContext);

  const addToCart = (product: TProduct, quantity: number = 1) => {
    const isAdded = cart.findIndex((item) => item._id === product._id);

    if (isAdded === -1) {
      const newItem: TCartItem = {
        _id: product._id,
        name: product.name,
        price: product.salePrice,
        quantity: quantity,
        image: product.images[0].secureUrl,
        slug: product.slug,
      };
      setGlobalContext((prev: TGlobalContext) => ({
        ...prev,
        cart: [...prev.cart, newItem],
      }));
    } else {
      const newItem = cart[isAdded];
      newItem.quantity += 1;

      const newCart = [...cart];
      newCart[isAdded] = newItem;

      setGlobalContext((prev: TGlobalContext) => ({
        ...prev,
        cart: newCart,
      }));
    }
  };

  const plusToCart = (productId: string) => {
    const isAdded = cart.findIndex((item) => item._id === productId);
    let newCart: TCartItem[] = [];

    if (isAdded !== -1) {
      const newItem = cart[isAdded];
      newItem.quantity += 1;
      newCart = [...cart];
      newCart[isAdded] = newItem;

      setGlobalContext((prev: TGlobalContext) => ({
        ...prev,
        cart: newCart,
      }));
    }
  };

  const minusFromCart = (productId: string) => {
    const isAdded = cart.findIndex((item) => item._id === productId);
    let newCart: TCartItem[] = [];

    if (isAdded !== -1) {
      const newItem = cart[isAdded];

      if (newItem.quantity > 1) {
        newItem.quantity -= 1;
        newCart = [...cart];
        newCart[isAdded] = newItem;
      } else {
        newCart = cart.filter((item) => item._id !== productId);
      }

      setGlobalContext((prev: TGlobalContext) => ({
        ...prev,
        cart: newCart,
      }));
    }
  };

  const clearCart = () => {
    setGlobalContext((prev: TGlobalContext) => ({
      ...prev,
      cart: [],
    }));
  };

  return { cart, addToCart, plusToCart, minusFromCart, clearCart };
};

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalContext, setGlobalContext] = useState(
    JSON.parse(localStorage.getItem("mg-context") || "") || {
      cart: [],
      wishList: [],
      compare: [],
    }
  );

  useEffect(() => {
    localStorage.setItem("mg-context", JSON.stringify(globalContext));
  }, [globalContext]);

  return (
    <GlobalContext.Provider
      value={{ ...globalContext, setGlobalContext: setGlobalContext }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
