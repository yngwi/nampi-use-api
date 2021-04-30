import { IHydraClient } from "@hydra-cg/heracles.ts";
import { JSONPath } from "jsonpath-plus";
import { KeycloakInstance } from "keycloak-js";
import { namespaces } from "namespaces";

export interface CollectionNav {
  first?: undefined | (() => Promise<void>);
  previous?: undefined | (() => Promise<void>);
  next?: undefined | (() => Promise<void>);
  last?: undefined | (() => Promise<void>);
  page?: undefined | number;
}

export interface CollectionMeta {
  first: undefined | string;
  last: undefined | string;
  members: undefined | Record<string, unknown>[];
  next: undefined | string;
  previous: undefined | string;
  total: undefined | number;
  viewIri: string;
}

export interface ContextState {
  apiUrl: string;
  hydra: IHydraClient;
  initialized: boolean;
  keycloak: KeycloakInstance;
  namespaces: Namespaces;
  searchTimeout: number;
}

export interface Entity {
  idLocal?: string;
  labels: MultilangText[];
  types: string[];
}

export interface Event extends Item {
  date: EventDate;
}

export interface EventDate {
  sort: Date;
  exact?: Date;
  earliest?: Date;
  latest?: Date;
}

export type FetchFunction<T> = (json: JSONPathJson) => Promise<T>;

export interface FetchResult<T> {
  initialized: boolean;
  loading: boolean;
  data: undefined | T;
}

export interface FetchCollectionResult<T> extends FetchResult<T[]> {
  nav: CollectionNav;
  total: undefined | number;
}

export type FetchMapper<T> = (json: JSONPathJson, namespaces: Namespaces) => T;

export interface Item extends Entity {
  id: string;
}

export type JSONPathJson = Parameters<typeof JSONPath>[1];

export interface MultilangText {
  value: string;
  language?: string;
}

export type Namespaces = ReturnType<typeof namespaces>;

export interface NampiConfig {
  api: string;
  auth: string;
  client: string;
  realm: string;
  searchTimeout?: number;
}

export interface Person extends Item {
  bornIn?: Event[];
  diesIn?: Event[];
}

export interface PersonQuery {
  text?: string;
}

export type QueryParams = { [key: string]: unknown };

export type Timeout = undefined | ReturnType<typeof setTimeout>;

export interface User extends Entity {
  email: string;
  familyName: undefined | string;
  givenName: undefined | string;
  username: string;
  idAuthor: undefined | string;
  idAuthorLocal: undefined | string;
}

export interface UseAuth
  extends Pick<KeycloakInstance, "authenticated" | "login" | "logout"> {
  initialized: boolean;
}
