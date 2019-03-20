import React, { PureComponent } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  Image,
  ScrollView,
  Button,
  TextInput
} from 'react-native';
import { gql } from 'apollo-boost';
import { ApolloProvider, graphql, Mutation, Query } from 'react-apollo';


const styles = StyleSheet.create({
  imageWrapper: {
    marginRight: 20,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 80,
    height: 80,
    overflow: 'hidden'
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',

  },
  format: {
    alignItems: "center",
    fontSize: 18
  },
  bold: {
    fontWeight: "bold"
  },
  paragraph: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scrollView: {
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 1,
    flex: 1,
  },
  space: {
    margin: 8
  },
  heading: {
    fontWeight: '800',
    fontSize: 20
  }
});

const query = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      color
      name
      email
      image
      friends {
        id
        name
      }
      company {
        id
        name
      }
    }
  }
`;

const updateUser = gql`
  mutation updateUser($id: ID!, $name: String!, $email: String!) {
    updateUser(user: { id: $id, name: $name, email: $email })
  }
`;


export default class UserScene extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      email: "",
      id: "",
      editable: false
    }
  }
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    // DONE: 2. would be cool if we actually displayed full user data that is contained in the user data object.

    // DONE: 3. would be extra cool to include their company info, and if you tap on it you can go that CompanyScene.
    // if this is done correctly, we should be re-using components from the CompaniesScene.

    // DONE: 4. would be even cooler to see a list of their friends, so I can tap on them an get more info about that user.
    // DONE: 5 would be cool to make the user name and ema\il updateable and saved ot the database, so we can let our users change their info.
    return (
        <Query query={query} variables={{id}}>
          {({ loading, error, data, refresh }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) { 
              return <ErrorScene message={error.message} />;
            }

           let user = data.user;
           if(this.state.id != user.id){
             this.setState({email: user.email, name: user.name, id: user.id, editable: false})
           }
            return (
              <ScrollView contentContainerStyle={[styles.scrollView, {backgroundColor: user.color}]}>
                <View style={styles.format}>
                <Text style={styles.heading}>USER DETAILS</Text>
                <View style={[styles.imageWrapper, { borderColor: user.color }]}>
                  <Image style={styles.image} source={{ uri: user.image }} />
                </View>
                <Text>{this.state.name}</Text>
                <Text>{this.state.email}</Text>
                {user.company ? (
                  <Text style={styles.bold} onPress={()=>navigation.navigate('CompanyScene', { id: user.company.id })}>Company: {user.company.name}</Text>
                ): <Text></Text>}
                {
                  user.friends.length === 0 ? <Text></Text> : <Text style={[styles.paragraph]}>FRIENDS</Text>
                }
                
                  {
                    user.friends.map((friend, key) => {
                      return <View style={styles.space} key={key}><Button  key={key} onPress={()=>navigation.navigate('UserScene', { id: friend.id })} title={friend.name}></Button></View>
                      
                    })
                  }

                {
                  !this.state.editable?
                    <View style={{marginTop: 30}}><Button onPress={()=>this.setState({editable: true})} color='red'  title="Edit"></Button></View>
                    :
                    <View>
                      <Text style={[styles.paragraph, {marginTop: 10, fontSize: 15}]}>UPDATE USER DETAIL</Text>
                      <Mutation mutation={updateUser} refetchQueries={[{ query: query }]}>
                      {(sendUpdates, {data}) => (
                      <View>
                          <TextInput
                          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                          onChangeText={(text) => this.setState({name: text})}
                          value={this.state.name}
                          />

                          <TextInput
                          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                          onChangeText={(text) => this.setState({email: text})}
                          value={this.state.email}
                          />  
                          <Button
                            onPress={() => {
                              sendUpdates({
                                variables: {
                                  email: this.state.email,
                                  name: this.state.name,
                                  id: user.id
                                }
                              })
                                .then(res => {
                                  alert("Successfully Updated")
                                  refresh();
                                })
                                .catch();
                            }}
                            title="Save"
                          />
                      </View>
                      )}
                      </Mutation>
                    </View>
                }  
                </View>
            </ScrollView>
            )
        }
      }
      </Query>
    );
  }
}
