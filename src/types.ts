import { NodeObject } from "jsonld";
import { KeycloakInstance } from "keycloak-js";
import { namespaces } from "namespaces";

/** An aspect */
export interface Aspect extends Item {
  /** The text content of the aspect */
  text?: LiteralString;
  /** Items, possibly in other databases, that are the same as this aspect. */
  sameAs?: string[];
}

export interface AspectsQuery extends CollectionQuery {
  /** What to order the aspects by */
  orderBy?: "id" | "label";
  /** Filter by participants of events the aspect is used in */
  participant?: string;
}

export type Blanks = Record<string, string>;

export type Cache = Record<string, Normalized>;

export type Class = Item;

export interface ClassesQuery extends CollectionQuery {
  /** What to order the classes by */
  orderBy?: "id" | "label";
  /** Filter by parent of all *rdfs:subClassOf* relations the class has */
  ancestor?: string;
}

/** An entity collection */
export interface Collection<T extends Entity> extends Item {
  /** The url to the first page of partial collection results */
  first: undefined | string;
  /** The url to the last page of partial collection results */
  last: undefined | string;
  /** The returned collection members */
  members: T[];
  /** The url to the next page of partial collection results */
  next: undefined | string;
  /** The current page */
  page: number;
  /** The url to the previous page of partial collection results */
  previous: undefined | string;
  /** The total number of results */
  total: number;
}

/** A set of functions to navigate to different parts of the collection */
export interface CollectionNav {
  /** Navigate to the first page in the collection */
  first?: undefined | VoidFunction;
  /** Navigate to the previous page in the collection */
  previous?: undefined | VoidFunction;
  /** Navigate to the next page in the collection */
  next?: undefined | VoidFunction;
  /** Navigate to the last page in the collection */
  last?: undefined | VoidFunction;
}

/** Query parameters to fetch a partial collection */
export interface CollectionQuery extends Record<string, unknown> {
  /** Filter by type */
  type?: string;
  /** Limits the number of returned results to the given number */
  limit?: number;
  /** Starts to return results from the given offset */
  offset?: number;
  /** Returns the given page of results */
  page?: number;
}

/** The internal state of the use-NAMPI context */
export interface ContextState {
  apiUrl: string;
  initialized: boolean;
  inversePropertyMap: InversePropertyMap;
  keycloak: KeycloakInstance;
  propertyMap: PropertyMap;
  searchTimeout: number;
}

/** A data entity */
export interface Entity {
  /** The local part of the id. Example: "12345" of "http://example.com/data/12345" */
  idLocal: string;
  /** The labels of the entity */
  labels?: LiteralString[];
  /** The RDF type iris */
  types: string[];
}

/** An event */
export interface Event extends Item {
  /** The sorting date for the event, to be used when sorting the event as part of a list */
  sort?: Date;
  /** The exact date the event happened */
  exact?: Date;
  /** The earliest possible date the event could have happened */
  earliest?: Date;
  /** The latest possible date the event could have happened */
  latest?: Date;
  /** The main participant of the event */
  mainParticipant: Person;
  /** All participants of the event */
  participants: Person[];
  /** All aspects of the event */
  aspects: Aspect[];
  /** The place where the event took place */
  place?: Place;
}

/** Query parameters to fetch a partial events collection */
export interface EventsQuery extends CollectionQuery {
  /** Filter by aspect used in the event. Can be the iri of any aspect individual */
  aspect?: string;
  /** Filter by the type of aspect used in the event. Can be any subclass of *https://purl.org/nampi/owl/core#aspect* that is part of the connected ontologies */
  aspectType?: string;
  /** Filter by the type of aspect use. Can be any subclass of *https://purl.org/nampi/owl/core#uses_aspect* that is part of the connected ontologies */
  aspectUseType?: string;
  /** Filter events by end date. All events that have dates (exact, earliest, latest, sort), *at* or *before* this date will be included */
  endDate?: Date;
  /** What to order the events by */
  orderBy?: "id" | "label" | "date";
  /** Filter by event participant. Can be the iri of any agent individual */
  participant?: string;
  /** Filter by type of participant. Can by the iri of any subclass of *https://purl.org/nampi/owl/core#agent* that is part of the connected ontologies */
  participantType?: string;
  /** Filter by participation type. Can by any subclass of *https://purl.org/nampi/owl/core#has_participant* that is part of the connected ontologies */
  participationType?: string;
  /** Filter by event place. Can be the iri of any place individual */
  place?: string;
  /** Filter events by start date. All events that have dates (exact, earliest, latest, sort), *at* or *after* this date will be included */
  startDate?: Date;
  /** Filter by text content. Can by any text or regular expression */
  text?: string;
}

export type FetchCollectionHook<T, Q> = <
  ExtendedType extends Record<string, unknown> = Record<string, never>
>(config: {
  paused?: boolean;
  query: Q;
}) => FetchCollectionResult<T & ExtendedType>;

/** The result of an Entity collection fetch query */
export interface FetchCollectionResult<T = Item> extends FetchResult<T[]> {
  /** Navigation to different parts of the collection */
  nav: CollectionNav;
  /** The current page of the collection */
  page: undefined | number;
  /** The total number of results (members) of the collection */
  total: undefined | number;
}
export type FetchHook<T> = <
  ExtendedType extends Record<string, unknown> = Record<string, never>
>(config: {
  idLocal: string;
  paused?: boolean | undefined;
}) => FetchResult<T & ExtendedType>;

/** The result of a single item fetch query */
export interface FetchResult<T = Item> {
  /** Whether or not the API connection is already initialized */
  initialized: boolean;
  /** Whether or not the result is currently being fetched */
  loading: boolean;
  /** The resulting data */
  data: undefined | T;
}

/** An inverted version of a property map where the property iris and short keys are switched to simplify reverse iri lookups */
export interface InversePropertyMap {
  [itemIri: string]: { [shortKey: string]: string };
}

/** An item */
export interface Item extends Entity {
  /** The id (iri) */
  id: string;
}

/** A set of links in the normalized query cache */
export interface Links {
  [property: string]: string | string[];
}

/** A simplified RDF literal */
export interface Literal {
  /** The value */
  value: number | string | Date;
}

/** A simplified XSD DateTime literal */
export interface LiteralDateTime extends Literal {
  value: Date;
}

/** A simplified XSD number literal */
export interface LiteralNumber extends Literal {
  value: number;
}

/** A simplified RDF language string literal */
export interface LiteralString extends Literal {
  value: string;
  /** The language string */
  language?: undefined | string;
}

export type MaybeNodes = undefined | NodeObject[];

export interface Namespace {
  iri: string;
  resource: (localName: string) => RDFResource;
}

export type Namespaces = typeof namespaces;

export interface Normalized extends NormalizeResult {
  links: Links;
}

export type Normalizer = (
  node: NodeObject,
  normalized: Normalized,
  cache: Cache,
  blanks: Blanks,
  propertyMap: PropertyMap
) => void;

export interface NormalizeResult extends Record<string, unknown> {
  id: string;
  idLocal: string;
  labels?: LiteralString[];
  types: string[];
}

/** A person */
export interface Person extends Item {
  bornIn?: Event[];
  diesIn?: Event[];
  sameAs?: string[];
}

/** Query parameters to fetch a partial persons collection */
export interface PersonsQuery extends CollectionQuery {
  /** What to order the persons by */
  orderBy?: "id" | "label";
  /** Filter by text content. Can by any text or regular expression */
  text?: string;
  /** Filter by person type. Can be any subtype of *https://purl.org/nampi/owl/core#person* that is part of the connected ontologies */
  type?: string;
}

/** A place */
export interface Place extends Item {
  /** Items, possibly in other databases, that are the same as this place. */
  sameAs?: string[];
}

/** Query parameters to fetch a partial places collection */
export interface PlacesQuery extends CollectionQuery {
  /** What to order the places by */
  orderBy?: "id" | "label";
  /** Filter by text content. Can by any text or regular expression */
  text?: string;
  /** Filter by place type. Can be any subtype of *https://purl.org/nampi/owl/core#place* that is part of the connected ontologies */
  type?: string;
}

/** A map that gives property keys that should replace the actual item rdf property iris when normalize JSON-LD responses. */
export interface PropertyMap {
  [itemType: string]: { [propertyKey: string]: string };
}

/** The NAMPI Provider configuration */
export interface ProviderConfig {
  /** * The URL of the NAMPI API endpoint * */
  api: string;
  /** * The URL of the NAMPI Keycloak auth endpoint.  */
  auth?: string;
  /** * The name of the Keycloak client to use. If not present in combination with "realm", the login and logout auth functions will throw an error on use.  */
  client?: string;
  /** An optional custom property map to use when normalizing responses */
  propertyMap?: PropertyMap;
  /** * The name of the Keycloak realm. If not present in combination with "client", the login and logout auth functions will throw an error on use.  */
  realm?: string;
  /** * The timeout in ms to bundle search box entries when live searching so the server doesn't get flooded. Defaults to 200ms */
  searchTimeout?: number;
  /** * Whether or not to to keep users logged in over browser restarts */
  sso?: boolean;
  /** * Enables the silent sso check. If enabled, the url to a site on the NAMPI app with special content needs to be provided.  * The content is described in the Keycloak documentation: https://github.com/keycloak/keycloak-documentation/blob/master/securing_apps/topics/oidc/javascript-adapter.adoc */
  silentSsoUri?: string;
}

export interface RDFResource {
  equals: (value: string) => boolean;
  iri: string;
  localName: string;
}

/** A function to sort a partial collection fetch result */
export type SortFunction<T> = (a: T, b: T) => -1 | 0 | 1;

export type Timeout = undefined | ReturnType<typeof setTimeout>;

export interface UseAuth
  extends Pick<KeycloakInstance, "authenticated" | "login" | "logout"> {
  /** Whether or not the authentication connection is initialized */
  initialized: boolean;
}

/** A user */
export interface User extends Entity {
  /** A connected author entity */
  author?: {
    id: string;
    idLocal: string;
  };
  /** The email */
  email: string;
  /** The family name */
  familyName: undefined | string;
  /** The given name */
  givenName: undefined | string;
  /** The NAMPI username */
  username: string;
  /** The user identifier */
  identifier: string;
}
