"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { TProduct } from "@/types/product.type";

export type TCartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
  shippingCost: number;
  maxQuantity: number;
};

type TGlobalContext = {
  cart: TCartItem[];
  wishList: TProduct[];
  compare: TProduct[];
  amount: number;
  orderId: string;
  setGlobalContext: (value: any) => void;
};

const GlobalContext = createContext<TGlobalContext>({
  cart: [],
  wishList: [],
  compare: [],
  amount: 0,
  orderId: "",
  setGlobalContext: () => {},
});

export const useCart = () => {
  const { cart, amount, orderId, setGlobalContext } = useContext(GlobalContext);

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
        maxQuantity: product.quantity,
        shippingCost: product.shippingCost,
      };
      setGlobalContext((prev: TGlobalContext) => ({
        ...prev,
        cart: [...prev.cart, newItem],
      }));
    } else {
      const newItem = cart[isAdded];

      if (newItem.quantity === newItem.maxQuantity) {
        return;
      } else {
        newItem.quantity += 1;

        const newCart = [...cart];
        newCart[isAdded] = newItem;

        setGlobalContext((prev: TGlobalContext) => ({
          ...prev,
          cart: newCart,
        }));
      }
    }
  };

  const plusToCart = (productId: string) => {
    const isAdded = cart.findIndex((item) => item._id === productId);
    let newCart: TCartItem[] = [];

    if (isAdded !== -1) {
      const newItem = cart[isAdded];

      if (newItem.quantity === newItem.maxQuantity) {
        return;
      } else {
        newItem.quantity += 1;
        newCart = [...cart];
        newCart[isAdded] = newItem;

        setGlobalContext((prev: TGlobalContext) => ({
          ...prev,
          cart: newCart,
        }));
      }
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

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item._id !== productId);

    setGlobalContext((prev: TGlobalContext) => ({
      ...prev,
      cart: newCart,
    }));
  };

  const clearCart = () => {
    setGlobalContext((prev: TGlobalContext) => ({
      ...prev,
      cart: [],
    }));
  };

  const setAmount = (amount: number) => {
    setGlobalContext((prev: TGlobalContext) => ({
      ...prev,
      amount,
    }));
  };

  const setOrderId = (orderId: string) => {
    setGlobalContext((prev: TGlobalContext) => ({
      ...prev,
      orderId,
    }));
  };

  return {
    cart,
    amount,
    orderId,
    addToCart,
    removeFromCart,
    plusToCart,
    minusFromCart,
    clearCart,
    setAmount,
    setOrderId,
  };
};

export const useCompare = () => {
  const { compare, setGlobalContext } = useContext(GlobalContext);

  const addToCompare = (product: TProduct) => {
    const isAdded = compare.findIndex((item) => item._id === product._id);

    if (isAdded === -1) {
      if (compare.length === 4) {
        const newCompare = compare.slice(1);

        setGlobalContext((prev: TGlobalContext) => ({
          ...prev,
          compare: [...newCompare, product],
        }));
      } else {
        setGlobalContext((prev: TGlobalContext) => ({
          ...prev,
          compare: [...prev.compare, product],
        }));
      }
    }
  };

  const removeFromCompare = (productId: string) => {
    const newCompare = compare.filter((item) => item._id !== productId);

    setGlobalContext((prev: TGlobalContext) => ({
      ...prev,
      compare: newCompare,
    }));
  };

  const clearCompare = () => {
    setGlobalContext((prev: TGlobalContext) => ({
      ...prev,
      compare: [],
    }));
  };

  return {
    compare,
    addToCompare,
    removeFromCompare,
    clearCompare,
  };
};

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalContext, setGlobalContext] = useState<TGlobalContext>(() => {
    if (typeof window !== "undefined") {
      const storedContext = localStorage.getItem("mg-context");
      return storedContext
        ? JSON.parse(storedContext)
        : { cart: [], amount: 0, wishList: [], compare: [], orderId: "" };
    } else {
      return { cart: [], amount: 0, wishList: [], compare: [], orderId: "" };
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mg-context", JSON.stringify(globalContext));
    }
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
