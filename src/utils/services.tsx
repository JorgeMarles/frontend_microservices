export const iota = (start: number, end: number): number[] => {
    return Array.from({ length: end - start }, (_, i) => i + start);
}