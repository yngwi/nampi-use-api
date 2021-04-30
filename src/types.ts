import { IHydraClient } from "@hydra-cg/heracles.ts";
import { JSONPath } from "jsonpath-plus";
import { KeycloakInstance } from "keycloak-js";
import { namespaces } from "namespaces";

export interface CollectionNav {
  first?: undefined | (() => Promise<void>);
  previous?: undefined | (() => Promise<void>);
  next?: undefined | (() => Promise<void>);
  last?: undefined | (() => Promise<void>);
}

export interface ContextState {
  apiUrl: string;
  hydra: IHydraClient;
  initialized: boolean;
  keycloak: KeycloakInstance;
  namespaces: Namespaces;
}

export interface Entity {
  idLocal?: string;
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

export type FetchMapper<T> = (
  json: Record<string, unknown>,
  namespaces: Namespaces
) => T;

export interface Item extends Entity {
  id: string;
  labels: MultilangText[];
  types: string[];
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
}

export interface Person extends Item {
  bornIn?: Event[];
  diesIn?: Event[];
}

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
