import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image, TextInput } from 'react-native'
// import { Card, CardItem, Body } from 'native-base'
import axios from 'axios'
import MyCard from './Card'
import AsyncStorage from '@react-native-community/async-storage';
export default class Company extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      search: '',
      searchh: '',
      isFetching: false,
    }
  }
  shouldComponentUpdate(a, b, c) {
    console.log('sdfdaf', a, b, c)
    return true
  }
  onSearchh = (key, val) => {
    this.setState({ [key]: val })
  }
  async componentDidUpdate(_, prevState) {
    const token = await AsyncStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    console.log(this.state.searchh, 'this.state.searchh')
    console.log(prevState, 'prevState')
    if (this.state.searchh !== prevState.search) {
      axios.get(`http://192.168.100.3:4000/search?search=${this.state.searchh}`, config)
        .then(result => {
          if (result.data.data == undefined) {
            this.setState({
              users: ''
            })
          } else {
            this.setState({
              users: result.data.data
            })
          }
        })
        .catch(err => console.log(err))
    } else console.log('SAMA')
  }
  onSearch = async (key, val) => {
    const token = await AsyncStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    this.setState({ [key]: val })
    axios.get(`http://192.168.100.3:4000/search?search=${this.state.search}`, config)
      .then(result => {
        if (result.data.data == undefined) {
          this.setState({
            users: ''
          })
        } else {
          this.setState({
            users: result.data.data
          })
        }
        // console.log(result.data.data == undefined, 'jGGGGGG')
        // console.log(result.data.message, 'kosong')
      })
      .catch(err => console.log(err))
  }
  async UNSAFE_componentWillMount() {
    this.mountAll()
  }
  onRefresh() {
    this.setState({ isFetching: true }, function () { this.mountAll() });
    setTimeout(() => {
      this.setState({ isFetching: false });
    }, 2000);
  }
  mountAll = async () => {
    const token = await AsyncStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get('http://192.168.100.3:4000/engineer', config)
      .then(result => {
        console.log(result.data, ':::::')
        this.setState({
          users: result.data.response
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <View>
        <TextInput
          style={{ borderColor: 'red', height: 70, backgroundColor: 'transparent', width: 360, fontSize: 18 }}
          placeholder='Search...'
          onChangeText={val => this.onSearch('search', val)} />
        <TextInput
          style={{ borderColor: 'red', height: 70, backgroundColor: 'pink', width: 360, fontSize: 18 }}
          placeholder='Search2...'
          onChangeText={val => this.onSearchh('searchh', val)} />
        <FlatList
          data={this.state.users}
          showsVerticalScrollIndicator={false}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          numColumns={2}
          renderItem={({ item }) =>
            <View style={{ padding: 5, marginLeft: 5 }}>
              {console.log(item, 'lll')}
              {/* <Card style={{ borderRadius: 20, width: 160 }}>
                <CardItem cardBody >
                  <Image source={require('./assets/user.png')} style={{ height: 170, width: 160, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 5 }} />
                </CardItem>
                <CardItem style={{ borderRadius: 50 }}>
                  <Body>
                    <Text>Name: {item.name}</Text>
                    <Text>Skill: {item.skill}</Text>
                  </Body>
                </CardItem>
              </Card> */}
              <MyCard name={item.name} skill={item.skill} />
            </View>
          }
          keyExtractor={item => item.email}
        />
      </View>
    )
  }
}