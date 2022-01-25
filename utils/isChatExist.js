

export const isChatExist = (chats, candidate) => {
   const res = !!chats?.find(obj => obj.data().users.find(u => u === candidate))
   return res;
}