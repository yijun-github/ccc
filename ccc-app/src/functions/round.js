export function round(x, nDecimal) {
    return (Math.round((x + Number.EPSILON) * (10**nDecimal)) / (10**nDecimal))
}