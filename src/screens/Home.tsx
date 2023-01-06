import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../types/const';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {
  AlbumsView,
  ArtistsView,
  FoldersView,
  SongsView,
  SuggestedView,
} from '../components/home/index';

const Home = ({navigation}: {navigation: any}) => {
  let navLinks = [
    {name: 'Suggested', component: SuggestedView},
    {name: 'Songs', component: SongsView},
    {name: 'Artists', component: ArtistsView},
    {name: 'Albums', component: AlbumsView},
    {name: 'Folders', component: FoldersView},
  ];
  const [index, setIndex] = useState(1);
  let ComponentView = navLinks[index].component;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR.white}}>
      <View
        style={{
          height: 70,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View
          style={{flexDirection: 'row', height: 36, alignItems: 'flex-end'}}>
          <Ionicons
            name={'musical-notes-outline'}
            size={30}
            color={COLOR.primary}
          />
          <Text
            style={{
              color: COLOR.black,
              fontWeight: '700',
              fontSize: 22,
              marginLeft: 8,
            }}>
            Mume
          </Text>
        </View>
        <Ionicons name={'search-outline'} size={30} color={COLOR.black} />
      </View>

      <View>
        <ScrollView
          horizontal={true}
          style={{
            height: 50,
            borderBottomWidth: 2,
            borderBottomColor: '#EEEEEE',
            marginLeft: 20,
          }}>
          {navLinks.map((el, i) => (
            <TouchableOpacity
              onPress={() => setIndex(i)}
              key={i}
              style={[
                {
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 18,
                },
              ]}>
              <Text
                style={[
                  {color: COLOR.gray, fontSize: 16, fontWeight: '600'},
                  i === index
                    ? {
                        color: COLOR.primary,
                      }
                    : {},
                ]}>
                {el.name}
              </Text>
              {i === index && (
                <View
                  style={{
                    height: 4,
                    backgroundColor: COLOR.primary,
                    borderRadius: 4,
                    position: 'absolute',
                    bottom: 2,
                    right: 0,
                    left: 0,
                  }}></View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View>
        <ComponentView navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({});
