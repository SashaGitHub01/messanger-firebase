
export const getParthner = (users, me) => {
   return users.filter(u => u !== me)?.[0]
}