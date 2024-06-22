import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import React, { useEffect } from 'react';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import Screen from '../../components/Screen/Screen';
import {HomeScreenProps} from './interfaces';
import {useHeaderHeight} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../configs/colors.config';
import { useGetProfileQuery } from '@store/profile';

const HomeScreen: HomeScreenProps = () => {
  const headerHeight = useHeaderHeight();
  const safeInsets = useSafeAreaInsets();
  const {data, error, isLoading, refetch} = useGetProfileQuery({ id: 2});


  useEffect(() => {
    if(data || error){
      refetch();
    }
  }, []);


  return (
    <Screen style={{backgroundColor: colors.gray100}}>
      <ScrollView
        style={[
          {
            marginTop: headerHeight,
            marginBottom: safeInsets.bottom + 25,
          },
        ]}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.main}>
          <Text style={{fontSize: 30, fontWeight: '500'}}>
            Welcome back, {data?.data?.first_name}
          </Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>California, USA</Text>
            <Ionicons
              name={'chevron-down-outline'}
              size={18}
              color={colors.secondary}
              style={{marginLeft: 5, marginTop: 5}}
            />
          </View>
          <View>
              <Image source={{uri: data?.data?.avatar}} style={styles.image} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  main: {
    marginHorizontal: 24,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 10,
    borderRadius:30,
  },
  text: {
    fontSize: 18,
    color: colors.white,
  },
  trackingContainer: {
    marginVertical: 16,
  },
  trackingText: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    overflow: 'hidden',
    borderRadius: 8,
  },
  progressContainer: {
    marginVertical: 16,
  },
  inProgressText: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
  },
  shippingId: {
    fontSize: 14,
    color: '#888',
  },
  shippingNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusText: {
    color: '#FF6F00',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressStep: {
    flex: 1,
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  progressStepInactive: {
    flex: 1,
    height: 8,
    backgroundColor: colors.gray400,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: colors.gray600,
    fontSize: 12,
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
