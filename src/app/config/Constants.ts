export class Constants {

  public static roleList = [
    {
      roleId: "Admin",
      roleTitle: "Admin"
    },
    {
      roleId: "Developer",
      roleTitle: "Developer"
    }
  ];

  static defaultUserId = "103";

  static recordStatusRemoved = "REMOVED";
  static recordStatusActive = "ACTIVE";


  static defaultDisplayMessageTime = 2000;
  static recordSavedSuccessMsg = "Record added successfully.";
  static recordUpdatedSuccessMsg = "Record updated successfully.";
  static recordRemovedSuccessMsg = "Record removed successfully.";
  static recordSavedFailureMsg = "Failure : Record does not saved.";
  static dataNotUpdated = "Data has not reloaded."
  static contactAdmin = "Please contact to admin.";
  static PasswordNotSame = "Both Password should match."
  static userAccountAlreadyExist = "User with same email already exist, try using some other email.";
  
}



