import {Alert, ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {Avatar, List, Divider} from 'react-native-paper';
import {Entypo} from '@expo/vector-icons';
import Screen from '../../components/Screen/Screen';
import {useHeaderHeight} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../configs/colors.config';
import { Loader, WhiteLoader } from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetProfileQuery } from '@store/profile';
import { IProfileProps, ProfileRouteProp } from './interface';
import { loadData, removeData } from '@utils/Async.utils';
import { useAuth, useLogout } from '@store/auth';

const Profile = () => {
  const {navigate, reset} = useNavigation<any>();
  const route = useRoute<ProfileRouteProp>();
  const headerHeight = useHeaderHeight();
  const safeInsets = useSafeAreaInsets();
  const {data, error, isLoading, refetch} = useGetProfileQuery({ id: 2});
  const logout = useLogout();
  const [name, setName] = useState<string>('');
  const [job, setJob] = useState<string>('');

  
  
  const getProfileData = async () => {
    const storedProfile = await loadData('profile');
    if (storedProfile) {
      const { name, job } = JSON.parse(storedProfile);
      setName(name);
      setJob(job);
    }
     if (route.params) {
      setName(route.params.name);
      setJob(route.params.job);
  }};


 // fetch latest updates
  useEffect(() => {
    if(data || error) {
      refetch();
    }
    getProfileData();
    
  }, [getProfileData]);




  const handleLogout = () => {
     
      Alert.alert('Log Out', 'Are you sure you want to log out?', [
        {text: 'No'},
        {
          text: 'Yes, log out',
          style: 'destructive',
          onPress: () =>  logout(),
        },
      ]);
  };

  const onEditProfile = useCallback(() => {
    navigate('EditProfile');
  }, []);


  if (isLoading) {
    return (
      <View style={styles.container}>
        <Loader size={'large'}/>
      </View>
    );
  }


  return (
    <Screen  style={{backgroundColor: colors.gray50}}>
      <ScrollView
        style={[
          {
            marginTop: headerHeight,
            marginBottom: safeInsets.bottom + 25,
          },
        ]}
        contentContainerStyle={styles.contentContainer}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, marginHorizontal: 16}}>

        <Text style={styles.headerText}>Profile</Text>
        <Entypo name='dots-three-vertical' onPress={() => onEditProfile()} size={24}/>
          </View>
          <View style={styles.header}>
           
            <Image  source={{uri: data?.data?.avatar}} style={[styles.image, {backgroundColor: colors.primary}]} />
          </View>
          <Divider />
          <List.Section style={styles.main}>
            <List.Item
              title={`${data?.data?.first_name} ${data?.data?.last_name} ${name || ''}`} 
              left={() => <List.Icon icon="account-circle" />}
              onPress={() => {}}
            />
            <List.Item
              title={data?.data?.email}
              left={() => <List.Icon icon="email" />}
              onPress={() => {}}
            />
            <List.Item
              title="(234) 905 528 3***"
              left={() => <List.Icon icon="phone" />}
              onPress={() => {}}
            />
            <List.Item
              title={job || "Job Title"}
              left={() => <List.Icon icon="briefcase" />}
              onPress={() => {}}
            />
          </List.Section>
          <Divider />
          <List.Section style={styles.main}>
            <List.Item
              title="Notifications"
              left={() => <List.Icon icon="information" />}
              onPress={() => {}}
            />
            <List.Item
              title="Share the app"
              left={() => <List.Icon icon="share" />}
              onPress={() => {}}
            />
          </List.Section>
          <Button  onPress={() => handleLogout()} disabled={isLoading} style={{marginTop: 10, marginHorizontal: 24}}>
            {isLoading ? <WhiteLoader /> : <Text style={{color: colors.danger}}>Log out</Text>}
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
};
export default Profile;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  image: {
    width: '30%',
    height: 120,
    borderRadius: 80,
  },
  main: {
    marginHorizontal: 24,
  },
  email: {
    color: colors.black,
    fontSize: 16,
    marginVertical: 10,
  },
  language: {
    marginRight: 10,
    alignSelf: 'center',
  },
});
