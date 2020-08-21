/**
 * @description determines whether or not a user can access a server-side operation
 * @param {string} privilegeLevel - the privilege level of user attempting access
 * @param {string} minimumRoleAllowed - the minimum privilege level rquired for access
 * @returns {bool} - can access or cannot
 */
module.exports = function (privilegeLevel, minimumRoleAllowed) {
  switch (minimumRoleAllowed) {
    case "admin":
      if (privilegeLevel !== "admin") {
        return false;
      } else {
        return true;
      }
    case "manager":
      if (privilegeLevel !== "manager" && privilegeLevel !== "admin") {
        return false;
      } else {
        return true;
      }
    case "guest":
      return true;
    default:
      return false;
  }
};
