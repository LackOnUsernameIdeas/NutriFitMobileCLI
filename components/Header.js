import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Image
} from "react-native";
import { Button, Block, NavBar, Text, theme } from "galio-framework";
import { getAuth, signOut } from "firebase/auth";
import Images from "../constants/Images";
import Icon from "./Icon";
import Input from "./Input";
import Tabs from "./Tabs";
import nutriTheme from "../constants/Theme";

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const LogOutButton = ({ isWhite, style, navigation }) => {
  const handleLogOut = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handleLogOut}>
      <Icon
        family="Entypo"
        size={16}
        name="log-out"
        color={nutriTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
      />
    </TouchableOpacity>
  );
};

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderRight = () => {
    const { white, title, navigation } = this.props;

    switch (title) {
      case "MealPlanner":
        return [
          <LogOutButton
            key="basket-home"
            navigation={navigation}
            isWhite={white}
          />
        ];
      default:
        break;
    }
  };
  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={(id) => navigation.setParams({ tabId: id })}
      />
    );
  };
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return <Block center>{tabs ? this.renderTabs() : null} </Block>;
    }
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;

    const headerStyles = [
      styles.shadow,
      transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{
            alignItems: "center",
            marginTop: 60,
            marginLeft: 270
          }}
          leftStyle={{ paddingVertical: 12 }}
          titleStyle={[
            styles.title,
            { color: nutriTheme.COLORS[white ? "WHITE" : "HEADER"] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        <Block flex={0.06} style={styles.logoHeader}>
          <Image styles={styles.logo} source={Images.Logo} />
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: "relative"
  },
  logoHeader: {
    paddingHorizontal: 18,
    paddingBottom: theme.SIZES.BASE * 2,
    justifyContent: "center",
    zIndex: 9999999
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold"
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 2 : theme.SIZES.BASE,
    zIndex: 5
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3
  },
  notify: {
    backgroundColor: nutriTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 9,
    right: 12
  },
  header: {
    backgroundColor: theme.COLORS.WHITE
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: nutriTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "400",
    color: nutriTheme.COLORS.HEADER
  }
});

export default withNavigation(Header);
