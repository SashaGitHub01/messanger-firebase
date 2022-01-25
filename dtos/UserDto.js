
export class UserDto {
   username;
   photo;
   email;
   lastSeen;
   id;

   constructor(data) {
      this.email = data.email;
      this.id = data.uid;
      this.photo = data.photoURL;
      this.username = data.displayName;
      this.lastSeen = data.lastSeen;
   }
}