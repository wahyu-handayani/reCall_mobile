import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { Card } from 'native-base'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
export default class Engineer extends Component {
  constructor(props) {
    super()
    this.state = {
      users: []
    }
  }
  async componentDidMount() {
    const email = this.props.navigation.getParam('myemail')
    console.log(email, 'kkkkkkkk')
    const token = await AsyncStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    axios.get(`http://192.168.43.132:4000/engineer/${email}`, config)
      .then(result => {
        this.setState({ users: result.data.message })
        console.log(this.state.users, '{{{{{')
      })
      .catch(err => alert(err))
  }
  render() {
    return (
      <View>
        <ScrollView>

          <FlatList
            data={this.state.users}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
              <Card style={{alignSelf: "center",marginTop:15,width:'70%',borderRadius:20,flexDirection:'column'}}>
                <Image style={{ marginTop: 15, height: 120, width: 120, alignSelf: "center" }} source={require("./assets/user.png")} />
                <Text style={{ marginTop: 12, fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>{item.name}</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center", fontStyle: "italic" }}>Engineer</Text>
                <Text style={{ fontSize: 18, alignSelf: "center", marginLeft:15}}>{item.description}</Text>
              </Card>
            }
          />
        </ScrollView>
      </View>
    )
  }
}