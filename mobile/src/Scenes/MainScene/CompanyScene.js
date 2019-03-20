import React, { PureComponent } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { ErrorScene } from '../../components';

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
  }
});

const query = gql`
  query company($id: ID!) {
    company(id: $id) {
      id
      name
      image
      bs
      employees {
        id
        name
      }
      color
    }
  }
`;



export default class CompanyScene extends PureComponent {
  render() {
    // DONE: 2. would be really cool to show the company info here.
    // DONE: 3. would be extra cool to show the employee list and make it navigate to that user on tap.

    const { navigation } = this.props;
    const id = navigation.getParam('id');

    return (
        <Query query={query} variables={{id}}>
          {({ loading, error, data, refresh }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }

           let company = data.company;

            return (
              <ScrollView contentContainerStyle={[styles.scrollView]}>
                <View style={styles.format}>
                <View style={[styles.imageWrapper, { borderColor: 'red' }]}>
                  <Image style={styles.image} source={{ uri: company.image }} />
                </View>
                <Text>{company.name}</Text>
                <Text>{company.bs}</Text>
                <Text>{company.color}</Text>

                {
                  company.employees && company.employees.length > 0 ? <Text style={[styles.paragraph]}>EMPLOYEES</Text>:<Text></Text>
                }
                  {
                    company.employees && company.employees.map((friend, key) => {
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