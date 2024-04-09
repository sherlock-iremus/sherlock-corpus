export const getIri = (uuid: string) => `http://data-iremus.huma-num.fr/id/${uuid}`

export const getUuid = (iri: string) => iri.split('/').pop()

export const TONALITEAM = '56ed1334-b47a-440a-b78d-04c8d3cfc311'
