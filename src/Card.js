// import React from 'react'
// import { Text, Image } from 'react-native'
// import { Card, CardItem, Body } from 'native-base'
// const MyCard = (props) => {
//     const { name, skill } = props
//     return (
//         <Card style={{ borderRadius: 20, width: 160 }}>
//             <CardItem cardBody >
//                 <Image source={require('./assets/user.png')} style={{ height: 170, width: 160, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 5 }} />
//             </CardItem>
//             <CardItem style={{ borderRadius: 50 }}>
//                 <Body>
//                     <Text>Name: {name}</Text>
//                     <Text>Skill: {skill}</Text>
//                 </Body>
//             </CardItem>
//         </Card>
//     )
// }
// export default MyCard

import React, {Component} from 'react'
import { Text, Image } from 'react-native'
import { Card, CardItem, Body } from 'native-base'
export default class myCard extends Component{
    render(){
        console.log(this.props,'ddlllll')
        return (
            <Card style={{ borderRadius: 20, width: 160 }}>
                <CardItem cardBody >
                    <Image source={require('./assets/user.png')} style={{ height: 170, width: 160, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 5 }} />
                </CardItem>
                <CardItem style={{ borderRadius: 50 }}>
                    <Body>
                        <Text>Name: {this.props.name}</Text>
                        <Text>Skill: {this.props.skill}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
    }
}