import React, { Component } from "react";
import { View, Text, Image, Picker, ScrollView } from 'react-native'
import { Item, Input, Button, Container } from 'native-base'
import axios from 'axios'
import { Login,Regis } from "./Redux/Actions/users";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage'
class Screen extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            position: '',
            err: null
        }
    }
    updatePosition = (position) => {
        this.setState({ position: position })
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }
    onSubmit=async()=>{
        const data = {
            email: this.state.email,
            password: this.state.password,
            position: this.state.position
        }
        
        await this.props.dispatch(Regis(data))
            .then(result => {
                // console.log(JSON.stringify(result.action.payload.config.data,null,4), 'llllllllll')
                console.log(result.value.data.message=="data yg kmu masukin salah",'???')
                if(result.value.data.message=="data yg kmu masukin salah")alert("inputan salah")
                else alert('sukses regis')
            })
            .catch(err => {
                alert(err)
            })
    }


    onSubmitLogin = async () => {
        const data = {
            email: this.state.email,
            password: this.state.password,
            position: this.state.position
        }
        // axios
        //     .post('http://192.168.100.158:4000/login', data)
        //     .then(result => {
        //         console.log(JSON.stringify(result,null,4), 'llllllllll')
        //         if(JSON.parse(result.request._response).message=="data yg kmu masukin salah") alert("inputan salah")
        //         else{
        //             const token=JSON.parse(result.request._response).message
        //             AsyncStorage.setItem('token',token)
        //             if(this.state.position=='engineer') this.props.navigation.navigate('Engineer')
        //             else this.props.navigation.navigate('Company')
        //         }
        //     })
        //     .catch(err => alert(err))
        await this.props.dispatch(Login(data))
            .then(result => {
                // console.log(JSON.stringify(result.action.payload.config.data,null,4), 'llllllllll')
                console.log(result.value.data.message,'???')
                if(result.value.data.message=="data yg kmu masukin salah") alert("inputan salah")
                else{
                    const token=result.value.data.message
                    AsyncStorage.setItem('token',token)
                    if(this.state.position=='engineer') this.props.navigation.navigate('Engineer',{myemail:this.state.email})
                    else this.props.navigation.navigate('Company')
                }
            })
            .catch(err => {
                console.log(err,']]')
                alert(err)
            })
    }
    render() {
        return (
            <Container>
                <ScrollView>
                    <Image style={{ height: 350, width: 350, alignSelf: "center" }} source={require("./assets/screen.jpg")} />
                    <Item style={{ marginLeft: 15, marginRight: 15, backgroundColor: 'transparent', marginTop: 15, borderColor: '#01AD9F', borderWidth: 5 }}>
                        <Input
                            placeholder='Email...'
                            placeholderTextColor='black'
                            autoCapitalize='none'
                            style={{ marginLeft: 15, fontSize: 19 }}
                            onChangeText={value => this.onChangeText('email', value)}
                        />
                    </Item>
                    <Item style={{ marginLeft: 15, marginRight: 15, backgroundColor: 'transparent', marginTop: 15, borderColor: '#01AD9F', borderWidth: 2 }}>
                        <Input
                            placeholder='Password...'
                            placeholderTextColor='black'
                            secureTextEntry={true}
                            autoCapitalize='none'
                            style={{ marginLeft: 15, fontSize: 19 }}
                            onChangeText={value => this.onChangeText('password', value)}
                        />
                    </Item>
                    <Item style={{ marginLeft: 15, marginRight: 15, backgroundColor: 'transparent', marginTop: 15, borderColor: '#01AD9F', borderWidth: 2 }}>
                        <Picker
                            selectedValue={this.state.position}
                            onValueChange={this.updatePosition}
                            style={{ width: '97%', color: "black", marginLeft: 15, fontSize: 19 }}>
                            <Picker.Item label="Choose position..." />
                            <Picker.Item label="Company" value="company" />
                            <Picker.Item label="Engineer" value="engineer" />
                        </Picker>
                    </Item>
                    <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: "center" }}>
                        <Button
                            onPress={() => this.onSubmitLogin()}
                            style={{ width: "30%", marginLeft: 15, marginRight: 15, borderRadius: 10, backgroundColor: "#01AD9F" }}>
                            <Text style={{ marginLeft: 15, fontSize: 19 }}>
                                Login
                            </Text>
                        </Button>
                        <Button
                            onPress={() => this.onSubmit()}
                            style={{ width: "30%", marginLeft: 15, borderRadius: 10, backgroundColor: "#01AD9F" }}>
                            <Text style={{ marginLeft: 15, fontSize: 19 }}>
                                Sign up
                            </Text>
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return { loginUser: state.loginUser,regis: state.regisUser }
}

export default connect(mapStateToProps)(Screen);