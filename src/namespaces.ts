const api = "https://purl.org/nampi/owl/api#";
const core = "https://purl.org/nampi/owl/core#";
const hydra = "http://www.w3.org/ns/hydra/core#";
const rdfs = "http://www.w3.org/2000/01/rdf-schema#";
const schemaOrg = "https://schema.org/";

export const namespaces = {
  api: {
    eventOrderByVariable: `${api}eventOrderByVariable`,
    eventParticipantVariable: `${api}eventParticipantVariable`,
    personOrderByVariable: `${api}personOrderByVariable`,
    textVariable: `${api}textVariable`,
    user: `${api}user`,
  },

  core: {
    aspect: `${core}aspect`,
    author: `${core}author`,
    date: `${core}date`,
    diesIn: `${core}dies_in`,
    event: `${core}event`,
    hasDateTime: `${core}has_date_time`,
    hasParticipant: `${core}has_participant`,
    hasSortingDate: `${core}has_sorting_date`,
    hasText: `${core}has_text`,
    isBornIn: `${core}is_born_in`,
    person: `${core}person`,
    sameAs: `${core}same_as`,
    takesPlaceNotEarlierThan: `${core}takes_place_not_earlier_than`,
    takesPlaceNotLaterThan: `${core}takes_place_not_later_than`,
    takesPlaceOn: `${core}takes_place_on`,
    usesAspect: `${core}uses_aspect`,
  },

  hydra: {
    Collection: `${hydra}Collection`,
    member: `${hydra}member`,
    view: `${hydra}view`,
    first: `${hydra}first`,
    previous: `${hydra}previous`,
    next: `${hydra}next`,
    last: `${hydra}last`,
    totalItems: `${hydra}totalItems`,
  },

  rdfs: {
    label: `${rdfs}label`,
  },

  schema: {
    email: `${schemaOrg}email`,
    name: `${schemaOrg}name`,
    givenName: `${schemaOrg}givenName`,
    familyName: `${schemaOrg}familyName`,
    identifier: `${schemaOrg}identifier`,
  },
};
