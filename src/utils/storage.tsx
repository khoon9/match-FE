import React from "react";
import { ClientVisitor } from "../types/ClientVisitor";

const storage = {
  set: (key: string, value: ClientVisitor) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key: string): ClientVisitor => {
    const defaultValue: ClientVisitor = {
      uuid: "",
    };
    const value = localStorage.getItem(key);
    return (value ? JSON.parse(value) : defaultValue) as ClientVisitor;
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};

export default storage;
