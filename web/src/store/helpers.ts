export function normalizeRelations(data: any, fields: any) {
    return {
        ...data,
        ...fields.reduce((prev: any, field: any) => ({
            ...prev,
            [field]: data[field]
                ? Array.isArray(data[field])
                    ? data[field].map((x: any) => x.id)
                    : data[field].id
                : null,
        }), {}),
    };
}

export function resolveRelations(
    data: any,
    fields: Array<{ prop: string; store: string }>,
    rootGetters: any
) {
    return {
        ...data,
        ...fields.reduce((prev: any, field: any) => ({
            ...prev,
            [field.prop]: Array.isArray(data[field.prop])
                ? data[field.prop].map((x: any) => rootGetters[`${field.store}/get`](x))
                : rootGetters[`${field.store}/get`](data[field.prop]),
        }), {}),
    };
}