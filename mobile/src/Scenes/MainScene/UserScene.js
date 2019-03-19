import React, { PureComponent } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  Image,
  ScrollView,
  Button
} from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

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
    margin: 2,
    fontSize: 15,
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
        email
      }
    }
  }
`;


export default class UserScene extends PureComponent {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    // DONE: 2. would be cool if we actually displayed full user data that is contained in the user data object.

    // todo: 3. would be extra cool to include their company info, and if you tap on it you can go that CompanyScene.
    // if this is done correctly, we should be re-using components from the CompaniesScene.

    // DONE: 4. would be even cooler to see a list of their friends, so I can tap on them an get more info about that user.
    // todo: 5 would be cool to make the user name and ema\il updateable and saved ot the database, so we can let our users change their info.
    return (
        <Query query={query} variables={{id}}>
          {({ loading, error, data }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) { 
              return <ErrorScene message={error.message} />;
            }

           let user = data.user;
            return (
              <ScrollView contentContainerStyle={[styles.scrollView, {backgroundColor: user.color}]}>
                <View style={styles.format}>
                <View style={[styles.imageWrapper, { borderColor: user.color }]}>
                  <Image style={styles.image} source={{ uri: user.image }} />
                </View>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
                <Text style={[styles.paragraph, {marginTop: 10, fontSize: 20}]}>FRIENDS</Text>
                  {
                    user.friends.map((friend, key) => {
                      return <View style={styles.space} key={key}><Button  key={key} onPress={()=>navigation.navigate('UserScene', { id: friend.id })} title={friend.name}></Button></View>
                      
                    })
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
