export function TimeConverterMinToHour(time: number): string {
    const hour = Math.floor(time/60)
    const min = time % 60

    return `${hour} hour ${min} min`
}