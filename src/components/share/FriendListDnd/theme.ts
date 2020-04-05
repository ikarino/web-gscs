import { createMuiTheme } from "@material-ui/core/styles";

const friendListTheme = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        padding: "0!important",
        margin: "1pt"
      }
    },
    MuiListItemText: {
      root: {
        height: "24px"
      },
      primary: {
        fontSize: "8pt",
        whiteSpace: "nowrap"
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 0
      }
    },
    MuiChip: {
      root: {
        fontSize: "4pt"
      }
    }
  }
});

export default friendListTheme;
