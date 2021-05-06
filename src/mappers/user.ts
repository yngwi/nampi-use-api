import { namespaces } from "namespaces";
import { FetchMapper, User } from "types";
import { jsonPath } from "../utils/jsonPath";
import { idLocal as mapIdLocal } from "./idLocal";
import { multilangTexts } from "./multilangTexts";

export const user: FetchMapper<User> = (json) => {
  const { rdfs, schema } = namespaces;
  const labels = multilangTexts(jsonPath(json, `$['${rdfs.label}'][0]`));
  const types = jsonPath<string[]>(json, "$.type");
  const email = jsonPath<string>(json, `$['${schema.email}'][0].value`);
  const familyName = jsonPath<undefined | string>(
    json,
    `$['${schema.familyName}'][0].value`
  );
  const givenName = jsonPath<undefined | string>(
    json,
    `$['${schema.givenName}'][0].value`
  );
  const idLocal = jsonPath<string>(json, `$['${schema.identifier}'][0].value`);
  const username = jsonPath<string>(json, `$['${schema.name}'][0].value`);
  const idAuthor = jsonPath<undefined | string>(
    json,
    `$['${namespaces.schema.sameAs}'][0].id`
  );
  const idAuthorLocal = idAuthor ? mapIdLocal(idAuthor) : undefined;
  return {
    email,
    familyName,
    givenName,
    idAuthor,
    idAuthorLocal,
    idLocal,
    labels,
    types,
    username,
  };
};