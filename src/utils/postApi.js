import { response } from "express";
import tokenService from "./tokenService";

const BASE_URL = "/api/post";

export function create(data) {
  return fetch(BASE_URL, {
    method: "POST",
    body: data,
    headers: {},
  }).then((responseFromTheServer) => {
    if (responseFromTheServer.ok) return responseFromTheServer.json();

    throw new Error("Something went wrong in the create Post");
  });
}
