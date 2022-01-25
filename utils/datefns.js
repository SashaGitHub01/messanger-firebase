import { format, formatDistance, formatDistanceToNow } from "date-fns";

export const getMessageTime = (date) => {
   return format(date, 'p')
}

export const getLastActivity = (date) => {
   console.log(date);
   return formatDistanceToNow(date, {
      addSuffix: true
   })
}