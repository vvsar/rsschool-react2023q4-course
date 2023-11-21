import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mockData, mockPhoto } from "./mockData";
import { basicUrl, CLIENT_ID } from "../redux/services/photosApi";

const handlers = [
  http.get(`${basicUrl}photos/random?count=4&client_id=${CLIENT_ID}`, () => {
    return HttpResponse.json(mockData);
  }),

  http.get(`${basicUrl}photos/abc/?client_id=${CLIENT_ID}`, () => {
    return HttpResponse.json(mockPhoto);
  }),
];

export const mockServer = setupServer(...handlers);
