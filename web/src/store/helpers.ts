export function normalizeRelations(data: any, fields: any) {
    return {
        ...data,
        ...fields.reduce((prev: any, field: any) => ({
            ...prev,
            [field]: Array.isArray(data[field])
                ? data[field].map((x: any) => x.id)
                : data[field].id,
        }), {}),
    };
}

export function resolveRelations(data: any, fields: any, rootGetters: any) {
    return {
        ...data,
        ...fields.reduce((prev: any, field: any) => ({
            ...prev,
            [field]: Array.isArray(data[field])
                ? data[field].map((x: any) => rootGetters[`${field}/find`](x))
                : rootGetters[`${field}/find`](data[field]),
        }), {}),
    };
}