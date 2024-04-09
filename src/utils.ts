export const getIri = (uuid: string) => `http://data-iremus.huma-num.fr/id/${uuid}`

export const getUuid = (iri: string) => iri.split('/').pop()
