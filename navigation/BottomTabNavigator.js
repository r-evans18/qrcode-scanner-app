import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";
import DashboardScreen from '../screens/Dashboard';
import TabBarIcon from "../components/TabBarIcon";

export default function BottomTabNavigator({
  containerRef,
  initialNavigationState,
  onLogout,
}) {
  const BottomTab = createBottomTabNavigator();
  const INITIAL_ROUTE_NAME = 'Dashboard';

    const DashboardStack = createStackNavigator();
    const DashboardScreenRender = () => {
        return <DashboardScreen onLogout={onLogout} />;
    }
    function DashboardStackScreen() {
        return (
            <DashboardStack.Navigator>
                <DashboardStack.Screen
                    name="Dashboard"
                    options={{
                        title: 'Dashboard Test',
                    }}
                    component={DashboardScreenRender}
                />
            </DashboardStack.Navigator>
        );
    }

  return (
    <NavigationContainer
      ref={containerRef}
      initialState={initialNavigationState}>
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
          <BottomTab.Screen
              name="Dashboard"
              component={DashboardStackScreen}
              options={{
                  title: 'Dashboard',
                  tabBarIcon: ({focused}) => (
                      <TabBarIcon focused={focused} name="md-list" />
                  ),
              }}
          />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
