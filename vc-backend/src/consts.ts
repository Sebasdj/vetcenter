
export const expTimeJWT = 15
export const expTimeUnit = 'm'
export let expTimeStr: string = expTimeJWT.toString() + expTimeUnit
export const dateOfExpTime = () => new Date((new Date).getTime() + expTimeJWT * 60 * 1000).toDateString(); 