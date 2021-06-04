const dropDownMenuItems = {
  LOG_OUT: "Log out",
}

const buttonData = [
  {
    id: 0,
    name: "Home",
    float: "left",
    pathName: "/"
  },
  {
    id: 1,
    name: "Balance",
    float: "left",
    pathName: "/balance"
  },
  {
    id: 2,
    name: "Groups",
    float: "left",
    pathName: "/groups"
  },
  {
    id: 3,
    name: "Settings",
    float: "right",
    // menuItems: [
    //   "Get fucked", "Hello", "Testing"
    // ]
  },
  {
    id: 4,
    name: "Account",
    float: "right",
    // Menu items for drop down menu in form of "key": func,
    // where the func is the function to be called when the button is clicked.
    menuItems: [dropDownMenuItems.LOG_OUT]
  }
]

export { buttonData, dropDownMenuItems }