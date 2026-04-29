import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { T } from "../../constants/theme";

function TabIcon({ icon, focused, label }: { icon: string; focused: boolean; label: string }) {
  return (
    <View style={styles.tabWrap}>
      <Text style={[styles.icon, focused && { opacity: 1 }]}>{icon}</Text>
      <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
    </View>
  );
}

function CenterFab() {
  return (
    <View style={styles.centerWrap}>
      <LinearGradient
        colors={["#2DBF8C", "#0F6E56"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.centerBtn}
      >
        <Text style={styles.centerIcon}>+</Text>
      </LinearGradient>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: T.bg,
          borderTopColor: T.border,
          borderTopWidth: 0.5,
          height: 82,
          paddingBottom: 20,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="discover"
        options={{ tabBarIcon: ({ focused }) => <TabIcon icon="🗺" label="Discover" focused={focused} /> }}
      />
      <Tabs.Screen
        name="forecast"
        options={{ tabBarIcon: ({ focused }) => <TabIcon icon="📊" label="Forecast" focused={focused} /> }}
      />
      <Tabs.Screen
        name="post"
        options={{ tabBarIcon: () => <CenterFab /> }}
      />
      <Tabs.Screen
        name="friends"
        options={{ tabBarIcon: ({ focused }) => <TabIcon icon="👥" label="Friends" focused={focused} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ tabBarIcon: ({ focused }) => <TabIcon icon="👤" label="You" focused={focused} /> }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabWrap: { alignItems: "center", justifyContent: "center", gap: 4, width: 60 },
  icon: { fontSize: 20, opacity: 0.55 },
  label: { fontSize: 10, color: T.muted, fontFamily: "Inter_500Medium" },
  labelActive: { color: T.greenMid, fontFamily: "Inter_700Bold" },
  centerWrap: { alignItems: "center", justifyContent: "center", marginTop: -22 },
  centerBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: T.green,
    shadowOpacity: 0.7,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  centerIcon: { fontSize: 30, color: "#fff", fontFamily: "Inter_400Regular", lineHeight: 32, marginTop: -2 },
});
