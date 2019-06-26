import React from 'react'
import { TouchableHighlight, StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase'
import {NavigationActions} from 'react-navigation'
import ItemComponent from '../components/ItemComponent'
import {Button} from 'react-native-elements'
import { Icon } from 'react-native-elements'






export default class Main extends React.Component {
  state = { currentUser: null , items : [], son: []}


  
yonlendir = () =>{
  
    this.props.navigation.navigate('Addnote');
    /*
    {this.state.items.length > 0 ? (
      <ItemComponent items={this.state.items} />
    ) : (
      <Text>No items</Text>
    )}*/

}


_onPressButton=(itemq, itemk)=>{
  alert(itemq+itemk)
/*this.props.navigation.navigate('Show', { data: itemq });*/
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    const referans = "/Users/"+currentUser.uid;
    firebase.database().ref(referans).limitToFirst(1000).on('value', snapshot => {
      snapshot.forEach((child) => {

        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({ items });

        let key = child.key;
        let son = Object.values(key);
        this.setState({ son });
      })

   
    });
  
}

cik = () =>{
  firebase.auth().signOut();
}

readDataUser = ()=>{
  alert(this.state.son)
}


render() {
    const { currentUser } = this.state
return (
  
      <View style={styles.container}>

<ScrollView  style={styles.ScrollContainer} >
      <View style={styles.itemsList}>
        {this.state.items.map((item, index) => { 
           
          return (
            
            

            <View key={index}>
     <TouchableOpacity  onPress={this._onPressButton.bind(this, item.not, item.refkey)} underlayColor="white">
        
            <Text style={styles.itemtext}>{item.not}</Text>
           
        </TouchableOpacity>
        
            </View>
          );
        
        })}
      </View>
 </ScrollView>


<View style = {styles.footer}>

        <Text style={{color: 'purple', fontSize: 25, fontWeight: 'bold', height: 30,}}>
          MERHABA HOŞGELDİNİZ. 
        </Text>

        <Text style={{color: 'black', fontSize: 15, height: 30,}}>
          Not Eklemeye Başlayabilirsiniz.
        </Text>
        <View style={{ height: 65, marginTop: 0 }}>



        <View style={styles.savecontainer}>
        <Button style={styles.savebutton}
        title="+"
        onPress={this.git}
        />

        </View>

        </View>


        <Button 
        icon={<Icon name="close" size={25} color="white" />}
        containerStyle={{ padding: 8,}}
        title="Çıkış"
        onPress={this.cik}
        />    

       

        
</View>
      

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  footer :
  {
    
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowRadius: 2,
  },


  submit:{
    marginRight:80,
    marginLeft:80,
    paddingLeft:30,
    paddingRight:30,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'blue'
  },

  submitText:{
    fontSize:20,
    color:'white',
    textAlign:'center',
},

  
  ScrollContainer:{
    flex: 1,
    },

  itemsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  itemtext: {
    
    margin: 2,
    width: Dimensions.get('window').width / 2 -6,
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  savecontainer:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    width:80,
    marginLeft: Dimensions.get('window').width / 2-40 ,

  },

  savebutton:{
    borderWidth:2,
    width:80,
    marginRight:90,
    backgroundColor:'#fff',
    paddingVertical:15,
    paddingHorizontal:20,
    marginVertical:18,
    borderRadius:15,
    shadowColor:'black',
    shadowOpacity:.8,
    shadowRadius:3,
    shadowOffset:{width:0, height:2},
    elevation:4
    

  }
})

