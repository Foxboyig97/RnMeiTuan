/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableNativeFeedback, View, ActivityIndicator, RefreshControl, Alert, TextInput} from 'react-native';
import Header from './Header'
import FlatListHeader from './FlatListHeader'

let navigation = null;


export default class TuanGouView extends Component {

    static navigationOptions = {
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon}
                           source={require('../imag/home_s.png')}></Image>
                );
            }
            return (
                <Image style={styles.tabBarIcon}
                       source={require('../imag/home_n.png')}></Image>
            )
        },

        tabBarColor:'#00f9ff',
        headerTitle: '分类',//对页面的配置
        tabBarLabel: '分类',
    };

    constructor(props) {
        super(props);
        this.state = {
            isShowActivityIndicator: true,
            food: null,
            refreshing:false,
        },
            navigation = this.props.navigation
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (this.state.isShowActivityIndicator) {
            return (
                    <ActivityIndicator animating={this.state.isShowActivityIndicator}
                                       size={'large'}
                                       style={styles.container}
                    />
            );
        }else {
            return (
                <View style={{backgroundColor:'#FFFFFF'}}>
                    <Header/>
                    <FlatList
                        keyExtractor={(item, index) => (item.id)}
                        data={this.state.food}
                        renderItem={({item, index}) => this.renderItem(item, index)}
                        ItemSeparatorComponent={ItemDivideComponent}
                        ListHeaderComponent={FlatListHeader}
                        refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                    />

                </View>
            );
        }
    }


    renderItem(item, index) {
        return (
            <TouchableNativeFeedback onPress={this.onPressButton.bind(this, item, index)}>
                <View style={styles.itemView}>
                    <Image source={{uri: item.posters.original}}
                           style={{width: 150, height: 150}}></Image>
                    <View style={styles.itemView2}>

                        <View style={styles.itemView1}>
                            <Text> 电影编号：{item.id} </Text>
                            <Text> 名称：{item.title} </Text>
                        </View>

                        <View style={styles.itemView1}>
                            <Text> 年份：{item.year} </Text>
                            <Text> 时长：{item.runtime} </Text>
                        </View>

                    </View>

                </View>
            </TouchableNativeFeedback>
        );
    }

    onPressButton(item, index) {
        this.props.navigation.navigate('Detialed', {
            index: index,
            name: item.title,
            img:item.posters.origina,
        })
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.fetchData()
    }

    fetchData() {
        fetch("https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json")
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    isShowActivityIndicator: false,
                    food: responseData.movies,
                    refreshing: false,
                });
            });
    }
}
//分割线
class ItemDivideComponent extends Component {
    render() {
        return (
            <View style={{height: 1, backgroundColor: '#4d4d4d'}}/>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    flex: {
        flex: 1,
    },
    itemView: {
        alignItems:'center',
        flexDirection: 'row',
        height: 160
    },
    itemView1: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    itemView2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    },
    view:{
        height:55,
        flexDirection: 'row',
        backgroundColor:'#2e9bbb',
        alignItems:'center',
        justifyContent:'space-around'
    }

});
